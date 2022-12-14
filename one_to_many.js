const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    'student_db',
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

const Student = sequelize.define("students", {
    student_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

const Grade = sequelize.define("grades", {
    grade:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
})

const grade_data = [{grade:9},{grade:10},{grade:11}]

const student_data = [
    {name:"Erisa Arestia", gradeId:2},
    {name:"Ryu Argenta", gradeId:1},
    {name:"Viona Ashira", gradeId:3},
    {name:"Arsa Gatra", gradeId:2},
    {name:"Esa Neveliz", gradeId:3}
]

Grade.hasMany(Student)

sequelize.sync({ force:true }).then(() => {
    Grade.bulkCreate(grade_data, { validate:true }).then(() => {
        Student.bulkCreate(student_data, { validate:true }).then(() => {
            Grade.findAll({
                where:{
                    grade:10
                },
                include:[{
                    model:Student
                }]
            }).then((res) => {
                console.dir(res, {depth:5})
            }).catch(err => {
                console.err("Failed to retrieve data: ", err)
            })
        }).catch(err => {
            console.err(err)
        })
    }).catch(err => {
        console.err(er)
    })
}).catch(error => {
    console.error(error)
})