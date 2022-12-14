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

const Course = sequelize.define("courses", {
    course_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

const StudentCourse = sequelize.define("student_courses", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    }
})

const course_data = [
    {course_name:"Science"},
    {course_name:"Math"},
    {course_name:"History"}
]

const student_data = [
    {name:"Erisa Arestia", courseId:2},
    {name:"Ryu Argenta", courseId:1},
    {name:"Viona Ashira", courseId:3},
    {name:"Arsa Gatra", courseId:2},
    {name:"Esa Neveliz", courseId:1}
]

// const student_data = [
//     {name:"Erisa Arestia"},
//     {name:"Ryu Argenta"},
//     {name:"Viona Ashira"},
//     {name:"Arsa Gatra"},
//     {name:"Esa Neveliz"}
// ]

const student_course_data = [
    {student_id:1, courseId:1},
    {student_id:2, courseId:1},
    {student_id:2, courseId:3},
    {student_id:3, courseId:2},
    {student_id:1, courseId:2},
]

Course.belongsToMany(Student, {through:"student_courses"})
Student.belongsToMany(Course, {through:"student_courses"})

sequelize.sync({force:true}).then(() => {
    Course.bulkCreate(course_data, {validate:true}).then(() => {
        Student.bulkCreate(student_data, {validate:true}).then(() => {
            StudentCourse.bulkCreate(student_course_data, {validate:true}).then(() => {
                Course.findAll({
                    include:{
                        model:Student
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.err("Failed to retrieve data: ", err)
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}).catch(err => {
    console.err("Failed to create table: ", err)
})