const router = require('express').Router();
const { Student } = require('../../models');

router.post('/login', async (req, res)=> {
    try {
        const userData = await Student.findOne({ where: { email :req.body.email } })

        if(!userData) {
            res.status(400).json({ message: 'user does not exists' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Email/password is incorrect' });
            return;
        }

        req.session.save(() => {
            req.session.class =  userData.class
            req.session.class =  userData.section
            req.session.first_Name =  userData.first_Name
            req.session.last_Name =  userData.last_Name
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in'})
        });
    } catch (err) {
        res.status(400).json(err);
    }
});