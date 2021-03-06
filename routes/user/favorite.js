//route to show favorite recipes
const express = require('express');
const db = require('../../models');
const isLoggedIn = require('../../middleware/isLoggedIn')
const methodOverride=require('method-override');
const flash = require('connect-flash');
const router = express.Router();

router.use(methodOverride('_method'));

router.get('/', isLoggedIn, async (req, res) => {
   try {
      const user = await db.user.findOne({where: {id: req.user.id}, include: [db.recipe]})
      const favoriteRecipeId = await findFavorites(req);
      res.render('user/favorites.ejs', {favoritesList:user.recipes, isFavorite: favoriteRecipeId})    
   } catch (error){
      res.render('main/404.ejs', {error:error})
   }
})


router.post('/:id', isLoggedIn, async (req,res)=> {
   try {
      const user = await db.user.findOne({where: {id: req.user.id}, include: [db.recipe]});
      await user.addRecipe(req.params.id);
      const recipe = await  db.recipe.findOne({where:{id:req.params.id}});
      req.flash('success', `You have added ${recipe.name} to your favorites!`);
      res.redirect('/user/favorites');
   } catch (error){
      res.render('main/404.ejs', {error:error})
   }
})

router.delete('/:id', isLoggedIn, async (req,res)=> {
   try {
      const user = await db.user.findOne({where:{id:req.user.id}, include:[db.recipe]})
      await user.removeRecipe(req.params.id)
      const recipe = await  db.recipe.findOne({where:{id:req.params.id}});
      req.flash('success', `You have removed ${recipe.name} from your favorites!`);
      res.redirect('/user/favorites')
   } catch (error){
      res.render('main/404.ejs', {error:error})
   }
})

// Helper function for route
async function findFavorites(req){
   try {
      const favoriteRecipeId=[];
      if(req.user){
         const favorites = await db.favorites.findAll({where:{userId:req.user.id}})
         for (let item in favorites){
            favoriteRecipeId.push(favorites[item].recipeId)
         }
      } 
      return favoriteRecipeId;
   } catch (error){
      res.render('main/404.ejs', {error:error})
   }
}

module.exports = router;