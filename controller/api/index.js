const router = require('express').Router();
const adminRoutes = require('./adminRoutes');
const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/admin', adminRoutes);
router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);

module.exports = router;