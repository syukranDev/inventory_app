const express = require('express');
const router  = express.Router();
const { uuid } = require('uuidv4');
const db = require('../model/db.js');
const Op = db.Sequelize.Op;
const sq = db.sequelize;
const limit = 10
const dayjs = require('dayjs'); 
const today = dayjs().format('YYYY-MM-DD');

router.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password

  if (!username || !password) return res.status(422).send({errMsg: 'Missing username/password'})

  let data, transaction;

  try {
    data = await db.users.findOne({
      where:{ 
        id: {[Op.eq]: username},
        password: {[Op.eq]: password},
     },
      raw: true,
      logging: console.log
    });

    if (!data) return res.status(422).send({status: 'failed', errMsg: `Username or Password is wrong.`})
    if (data.status !== 'active') return res.status(422).send({status: 'failed', errMsg: `Username not active. Please contact administrator.`})

    transaction = await sq.transaction();

    await db.users.update({ 
      isUserLoggedIn: true,
      updated_by: 'system_update'
    },
      {
        where: {
          id: { [Op.eq]: username }
        },  
        raw: true, logging: console.log, 
        transaction
      }
    );

    data.isUserLoggedIn = true

    await transaction.commit();
  } catch (e) { 
    if(transaction) await transaction.rollback();
    console.error(e);
    return res.status(500).send({status: 'failed', errMsg: `Failed to login`})
  }
  return res.send({ status: 'success', data })
})

router.post('/logout', async (req, res) => {
  let username = req.body.username;
  if (!username) return res.status(422).send({errMsg: 'Missing username'})
  let data, transaction;

  try {
    data = await db.users.findOne({
      where:{ id: {[Op.eq]: username} },
      raw: true,
      logging: console.log
    });

    if (!data) return res.status(404).send({status: 'failed', errMsg: `Username not found`})
    
    transaction = await sq.transaction();

    await db.users.update({ 
      isUserLoggedIn: false,
      updated_by: 'system_update'
    },
      {
        where: {
          id: { [Op.eq]: username }
        },  
        raw: true, logging: console.log, 
        transaction
      }
    );

    await transaction.commit();

    data = await db.users.findOne({
      where:{ id: {[Op.eq]: username} },
      raw: true,
      logging: console.log
    });

  } catch (e) { 
    if(transaction) await transaction.rollback();
    console.error(e);
    return res.status(500).send({status: 'failed', errMsg: `Failed to logout`})
  }
  return res.send({ status: 'success', data})
})


module.exports = router