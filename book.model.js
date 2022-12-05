const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    'sequelize-study',
    'root',
    '',
    {
        host:'localhost',
        dialect:'mysql'
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been estabilished successfully!');
}).catch((error) => {
    console.error('Unable to connect to database', error);
})

const Book = sequelize.define("Books", {
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    },
    release_date:{
        type:DataTypes.DATEONLY,
    },
    subject:{
        type:DataTypes.INTEGER,
    }
})

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
})