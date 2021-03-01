//route for showing calendar and allows user to add and edit recipes 
const express = require('express');
const db = require('../../models');
const router = express.Router();
const isLoggedIn = require('../../middleware/isLoggedIn')

router.get('/', isLoggedIn, async (req, res) => {
    try{
        const recipes = await db.sequelize.query(
            `SELECT * FROM favorites f,recipes r WHERE f."userId" = ${req.user.id} AND f."recipeId" = r.id ORDER BY day`
        )
        const recipesList = [];
        for (let i = 0; i <recipes[0].length; i++) {
            if (recipes[0][i].day) {
                    recipesList.push({
                        day: recipes[0][i].day,
                        id: recipes[0][i].recipeId,
                        name: recipes[0][i].name,
                        picture: recipes[0][i].picture,
                        servings: recipes[0][i].servings,
                        preptime: recipes[0][i].preptime,
                    })
                }
            }
        const favoriteRecipeId = await findFavorites(req);
        res.render('user/calendar', {
            isFavorite: favoriteRecipeId,
            recipesList: recipesList
        })
    } catch (error){
        res.render('/main/404.ejs', error)
    }
})

router.get('/add/:id', isLoggedIn, async (req, res) => {
    try{
        const toRecipe = await db.recipe.findOne({where: {id: req.params.id}})
        res.render('user/addCalendar', {recipe:toRecipe})
    }catch (error){
        res.render('/main/404.ejs', error)
    }
})

router.post('/add/:id', isLoggedIn, async (req,res) => {
    try{
        const toFavorites = await db.favorites.findOrCreate({
            where: {
                userId:req.user.id,
                recipeId: req.params.id,
                day: parseInt(req.body.day)
            }
        })
        res.redirect('/user/calendar')
    }catch (error){
        res.render('/main/404.ejs', error)
    }
})


// Helper functions
async function findFavorites(req){
    try{
        const favoriteRecipeId=[];
        if(req.user) {
            const favorites = await db.favorites.findAll({where:{userId:req.user.id}})
            for (let item in favorites){
                favoriteRecipeId.push(favorites[item].recipeId)
            }
        } 
        return favoriteRecipeId;
    } catch (error) {
        res.render('/main/404.ejs', error)
    }
}

module.exports = router;