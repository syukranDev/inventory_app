const express = require('express');
const router  = express.Router();
const { uuid } = require('uuidv4');
const db = require('../model/db.js');
const Op = db.Sequelize.Op;
const sq = db.sequelize;
const limit = 10
const dayjs = require('dayjs'); 
const today = dayjs().format('YYYY-MM-DD');

router.get('/list', async (req, res) => {
  let page = req.query.page;
  let {date}  = req.query;
  let sortColumn = req.query.sort_column;
  let sortBy = req.query.sort_by || 'desc';
  let order = [['createdAt','DESC']];
  let limitRows = req.query.limit_rows
  let where = {};

  page = (!page || isNaN(page) || parseInt(page) < 0)? 0 : parseInt(page) - 1;
  limitRows = (isNaN(limitRows) || !limitRows) ? limit : limitRows
  let offset = page * limitRows;

  if(date){
    let d = date.split(',');
    if(d.length == 1){
      if(!dayjs(d[0], df).isValid()) return res.status(422).send({errMsg: 'Date format is invalid.'});
      where.date = {[Op.eq]: d[0]};
    } else{
      if(!dayjs(d[0], df).isValid() || !dayjs(d[1], df).isValid()) return res.status(422).send({errMsg: 'Date format is invalid.'});
      where.date = { [Op.between]:[ 
        dayjs(d[0]).startOf('day').toDate(), 
        dayjs(d[1]).endOf('day').toDate() 
      ]}
    }
  }

  if (sortColumn != null && sortColumn.trim() != '' && sortBy != null && sortBy.trim() != '') {
    order = [[sortColumn, sortBy]];
  }

  let users;
  
  try{
    users = await db.users.findAndCountAll({
      order: order,
      where, offset, limit: limitRows, 
      raw: true,
      logging: console.log
    });

    users.limit = limitRows;
    users.offset = offset;
  }catch(e){
    console.error(e);
    return res.status(500).send({status: 'failed', errMsg: 'Failed to get users list.'});
  }
  return res.send({status: 'success', data: users});
})

router.get('/o/:id', async (req, res) => {
  let id = req.params.id;
  let data;

  try {
    data = await db.users.findOne({
      where:{ id: {[Op.eq]: id} },
      raw: true,
      logging: console.log
    });

    if (!data) return res.status(404).send({status: 'failed', errMsg: `User ID-${id} not found.`})
  } catch (e) {
    console.error(e)
    return res.status(500).send({status: 'failed', errMsg: `Failed to get User #${id}`})
  }
  return res.send({ status: 'success', data })
})

router.post('/update/:id', async (req, res) => {
  let id = req.params.id;
  let data, transaction;

  let  {password, permission_create, permission_view, permission_update, permission_delete} = req.body;
  if (!password || !permission_create || !permission_view || !permission_update || !permission_delete ) return res.status(422).send({errMsg: 'Missing payload, please check.'})

  try {
    data = await db.users.findOne({
      where:{ id: {[Op.eq]: id} },
      raw: true,
      logging: console.log
    });

    if (!data) return res.status(404).send({status: 'failed', errMsg: `Inventory ID-${id} not found.`})
    
    transaction = await sq.transaction();

    await db.users.update({ 
      password, permission_create, permission_view, permission_update, permission_delete,
      updated_by: 'system_update'
    },
      {
        where: {
          id: { [Op.eq]: id }
        },  
        raw: true, logging: console.log, 
        transaction
      }
    );

    await transaction.commit();

  } catch (err){
    if(transaction) await transaction.rollback();
    console.error(err);
    return res.status(500).send({status: 'failed', errMsg: `Failed to get inventory #${id}`})
  }
  return res.send({ status: 'success', message: `Update successfully for ID-${id}` })
})

router.post('/add', async (req, res) => {
  let { username, password, role, loggedInUser} = req.body

  if (!username) return res.status(422).send({errMsg: 'Missing username'})
  if (!password) return res.status(422).send({errMsg: 'Missing password'})
  if (!role) return res.status(422).send({errMsg: 'Missing role'})

  let transaction, isUserExist;
  
  try {
    isUserExist = await db.users.findOne({
      where:{
        id:{ [Op.eq]: username},
      }
    });

    if (isUserExist) return res.status(422).send({errMsg: 'Please choose another username as it already exist.'})

    transaction = await sq.transaction();
    await db.users.create({
        id: username,
        name: username,
        password,
        role, 
        permission_create: 'false',
        permission_view: 'false',
        permission_update: 'false',
        permission_delete: 'false',
        isUserLoggedIn: false,
        status: 'active',
        created_by: loggedInUser || 'system_create',
        updated_by: loggedInUser || 'system_create'
    });

    await transaction.commit();
  } catch (err){
    if(transaction) await transaction.rollback();
    console.error(err);
    return res.status(500).send({errMsg: 'Failed to add new user'})
  }
  return res.send({ status: 'success',  message: `Succesfully added new user (username: ${username})`})
})

router.get('/delete/:id', async (req, res) => {
    let { id } = req.params
    let transaction;

    try {
      transaction = await sq.transaction();

      isRowExist = await db.users.findOne({
        where:{
          id:{[Op.eq]: id},
        }
      })

      if (!isRowExist) return res.status(422).send({errMsg: 'ID provided not exist.'})

      await db.users.destroy({
        where:{
          id:{[Op.eq]: id},
        }, transaction
      });

      await transaction.commit();
    } catch (err){
        if(transaction) await transaction.rollback();
        console.error(err)
        return res.status(500).send({errMsg: `Failed to delete user (ID-${id})`})
    }

    return res.send({ status: 'success', message: `Delete user (ID-${id}) succesfully.`})
})


module.exports = router