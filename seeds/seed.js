const sequelize = require('../config/connection');
const {Admin, Student, Teacher} = require('../models');
const studentData = require('./JSON/student.json');
const adminData = require('./JSON/admin.json');
const teacherData = require('./JSON/teacher.json');

const seedsDatabase = async () => {
    await sequelize.sync({ force: true });

    await Admin.bulkCreate(adminData, {
        individualHooks: true,
        returning: true
    });

    await Student.bulkCreate(studentData, {
        individualHooks: true,
        returning: true
    });

    await Teacher.bulkCreate(teacherData, {
        individualHooks: true,
        returning: true
    });

    process.exit(0);
}

seedsDatabase();