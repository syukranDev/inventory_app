module.exports = (sequelize, Sequelize) => {
    var Model = sequelize.define('users', {
      id: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      role:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      isUserLoggedIn:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      }, 
      permission_create:{
        type: Sequelize.TEXT,
        allowNull: false
      }, 
      permission_view:{
        type: Sequelize.TEXT,
        allowNull: false
      }, 
      permission_update:{
        type: Sequelize.TEXT,
        allowNull: false
      }, 
      permission_delete:{
        type: Sequelize.TEXT,
        allowNull: false
      }, 
      status:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_by:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      updated_by:{
        type: Sequelize.TEXT,
        allowNull: true
      }
    },{
      timestamps: true,
      // underscored: true,
      freezeTableName: true
    });
    return Model;
  }