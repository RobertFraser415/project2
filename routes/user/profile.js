//route that shows user profile
const express = require('express');
const db = require('../../models');
const methodOverride = require('method-override');
const isLoggedIn = require('../../middleware/isLoggedIn');
const router = express.Router();

router.use(methodOverride('_method'));

// Routes
router.get('/', isLoggedIn, async (req, res) => {
    try {
        res.render('user/profile');
    } catch (error){
        res.render('/main/404.ejs', error)
    }
});

router.get('/edit', isLoggedIn, async (req, res) => {
    try {
        res.render('user/profileEdit.ejs')
    } catch (error){
        res.render('/main/404.ejs', error)
    }
})

router.put('/edit/:id', isLoggedIn, async (req, res) => {
    try {
        const userUpdate = await db.user.update({name:req.body.name.toLowerCase(), email:req.body.email, password:req.body.password},{where:{id:req.user.id}})
        res.redirect('/user/profile');
    } catch (error){
        res.render('/main/404.ejs', error)
    }
    
})


module.exports = router;