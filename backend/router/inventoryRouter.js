const express = require('express');
const router  = express.Router();
const { uuid } = require('uuidv4');
const db = require('../model/db.js');
const Op = db.Sequelize.Op;
const sq = db.sequelize;
const limit = 10
const dayjs = require('dayjs'); 
const today = dayjs().format('YYYY-MM-DD');
const faker = require('faker')

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

  let inventory;
  
  try{
    inventory = await db.inventory.findAndCountAll({
      order: order,
      where, offset, limit: limitRows, 
      raw: true,
      logging: console.log
    });
    inventory.limit = limitRows;
    inventory.offset = offset;
  }catch(e){
    console.error(e);
    return res.status(500).send({status: 'failed', errMsg: 'Failed to get inventory list.'});
  }
  return res.send({status: 'success', data: inventory});
})

router.get('/o/:id', async (req, res) => {
  let id = req.params.id;
  let data;

  try {
    data = await db.inventory.findOne({
      where:{ id: {[Op.eq]: id} },
      raw: true,
      logging: console.log
    });

    if (!data) return res.status(404).send({status: 'failed', errMsg: `Inventory ID-${id} not found.`})
  } catch (e) {
    console.error(e)
    return res.status(500).send({status: 'failed', errMsg: `Failed to get inventory #${id}`})
  }
  return res.send({ status: 'success', data })
})

router.post('/update/:id', async (req, res) => {
  let id = req.params.id;
  let data, transaction;

  let  {desc, type, quantity, status} = req.body;
  if (!desc || !type || !quantity || !status) return res.status(422).send({errMsg: 'Missing payload, please check.'})

  try {
    data = await db.inventory.findOne({
      where:{ id: {[Op.eq]: id} },
      raw: true,
      logging: console.log
    });

    if (!data) return res.status(404).send({status: 'failed', errMsg: `Inventory ID-${id} not found.`})
    
    transaction = await sq.transaction();

    await db.inventory.update({ 
      desc, type, quantity, status,
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
  let { name, desc, type, quantity, status, loggedInUser } = req.body

  if (!name) return res.status(422).send({errMsg: 'Missing name'})
  if (!desc) return res.status(422).send({errMsg: 'Missing desc'})
  if (!type) return res.status(422).send({errMsg: 'Missing type'})

  let transaction, isNameExist;
  let id = uuid();
  
  try {
    isNameExist = await db.inventory.findOne({
      where:{
        name:{ [Op.eq]: name},
      }
    });

    if (isNameExist) return res.status(422).send({errMsg: 'Please choose another name as it already exist.'})

    transaction = await sq.transaction();
    await db.inventory.create({
        id,
        name,
        desc,
        type, 
        quantity: quantity ? quantity : 0,
        status: status ? status : 'active',
        created_by: loggedInUser || 'system_create',
        updated_by: loggedInUser || 'system_create'
    });

    await transaction.commit();
  } catch (err){
    if(transaction) await transaction.rollback();
    console.error(e);
    return res.status(500).send({errMsg: 'Failed to add new inventory'})
  }
  return res.send({ status: 'success',  message: `Succesfully added new inventory (ID: ${id})`})
})

router.get('/delete/:id', async (req, res) => {
    let { id } = req.params
    let transaction;

    try {
      transaction = await sq.transaction();

      isRowExist = await db.inventory.findOne({
        where:{
          id:{[Op.eq]: id},
        }
      })

      if (!isRowExist) return res.status(422).send({errMsg: 'ID provided not exist.'})

      await db.inventory.destroy({
        where:{
          id:{[Op.eq]: id},
        }, transaction
      });

      await transaction.commit();
    } catch (err){
        if(transaction) await transaction.rollback();
        console.error(err)
        return res.status(500).send({errMsg: `Failed to delete inventory (ID-${id})`})
    }

    return res.send({ status: 'success', message: `Delete inventory (ID-${id}) succesfully.`})
})

router.get('/populate', async (req, res) => {
  let transaction;
  try {
      transaction=  await sq.transaction();
      const types = ['food', 'medicine', 'electronic', 'mechanical', 'liquid']; // Limit types to 5 options
      const data = [];

      for (let i = 0; i < 1000; i++) {
          const id = uuid();
          const name = faker.commerce.productName();
          const desc = faker.lorem.sentence();
          const type = types[Math.floor(Math.random() * types.length)]; // Randomly select a type
          const quantity = faker.random.number();

          data.push({
              id,
              name,
              desc,
              type,
              quantity: quantity,
              status: 'active',
              created_by: 'system_populate',
              updated_by:'system_populate'
          });
      }

      await db.inventory.bulkCreate(data, transaction)

      await transaction.commit();

      return res.send({ status: 'success', data,  message: `Successfully populated 100 rows of inventory`});
  } catch (err) {
      console.error(err);
      await transaction.rollback();
      return res.status(500).send({ errMsg: 'Failed to populate 100 rows of inventory' });
  }
});

module.exports = router