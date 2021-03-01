//route for recipes

//route for recipes
const express = require('express')
const db = require('../models')
const router = express.Router()
//GET all recipes 

router.get('/', async (req,res) => {
    try{
        let allRecipes = await db.recipe.findAll()
        const favoriteRecipeId = await findFavorites(req)
        const allRecipeNames=getNames(allRecipes);
        const recipeFilter=req.query.searchInput;
        if(recipeFilter){
            allRecipes = allRecipes.filter(function(recipe){
                return recipe.name.toLowerCase() ===recipeFilter.toLowerCase();
            })
        }
        res.render('recipe/explore', {recipes:allRecipes, isFavorite:favoriteRecipeId, allRecipeNames:allRecipeNames})
    } catch(error){
        res.status(404).render('main/404', {error:error})
    }
})

router.get('/details/:id', async (req,res) => {
    const recipe = await db.recipe.findOne({where:{id:req.params.id}, include:[db.user]})
    const ingredients = await db.ingredient.findAll({where:{recipeId:recipe.id}})
    const instructions = await db.instruction.findAll({where:{recipeId:recipe.id}})
    const favoriteRecipeId = await findFavorites(req);
    res.render('recipe/details.ejs', {recipe:recipe, isFavorite:favoriteRecipeId, instructions:instructions, ingredients:ingredients})
})


// this is a working route for searching the database by ingredient that links to the search bar 
router.get('/searchByIngredient', (req, res) => {
    db.ingredient.findAll({
        where: {
            name: req.query.ingredientSearch
        }, include: [db.recipe]
    }).then(results => { 
        for (let i = 0; i < results.length; i++) {
        db.recipe.findOne({
            where: {
                id: results[0].dataValues.recipeId
            }
        }).then(foundRecipe => {
            res.render('recipe/searchResults', {recipe:foundRecipe, isFavorite: null})
        })
    }   
    }) 
});

router.get('/searchByName', (req, res) => {
db.ingredient.findAll({
    where: {
        name: req.query.nameSearch
    }, include: [db.recipe]
}).then(results => { 
    res.render('recipe/searchResults', {recipe: results, isFavorite: null})
}) 
});


// Helper functions for route

// Finds recipe ids of users and stores them in an array
async function findFavorites(req){
    const favoriteRecipeId=[];
    if(req.user){
        const favorites = await db.favorites.findAll({where:{userId:req.user.id}})
        for (let item in favorites){
            favoriteRecipeId.push(favorites[item].recipeId)
        }
    } 
    return favoriteRecipeId;
}

// Get names of recipes
function getNames(recipeArray){
    const nameArray=[];
    for(let item in recipeArray){
        nameArray.push(recipeArray[item].dataValues.name)
    }
    return nameArray;
}



module.exports = router;
