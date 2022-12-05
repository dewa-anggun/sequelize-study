const Sequelize = require('sequelize')
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