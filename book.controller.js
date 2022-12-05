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

    // Book.create({
    //     title:"Penance: The Astral Journey of a Sinfull Human",
    //     author:"Dewa A",
    //     release_date:"2022-06-13",
    //     subject:1
    // }).then(() => {
    //     console.log('success')
    // }).catch(error => {
    //     console.error(error)
    // })

    // Book.findAll().then(res => {
    //     console.log(res)
    // }).catch(error => {
    //     console.error(error)
    // })
    
    Book.findOne({
        where:{
            id:5
        }
    }).then(res => {
        console.log(res)
    }).catch(error => {
        console.error(error)
    })

    // Book.destroy({
    //     where:{
    //         id:3
    //     }
    // }).then(res => {
    //     console.log(res)
    // }).catch(error => {
    //     console.error(error)
    // })

}).catch((error) => {
    console.error('Unable to create table : ', error);
})