# Project 2 (Meal Hack)

## Link to deployed project
http://mealhack.herokuapp.com/user/calendar

## Project Description
Our application will allow users to plan their meals for the next 7 days. With working from home on the rise and restrictions on dining at restaurants, cooking at home has become a routine in many people’s lives. Oftentimes it is hard to plan your grocery haul and what to eat for the next day, but this application will help users find recipes, favorite those that they like and plan the meals out!  
We used the following API to load our databases with delicious food: https://rapidapi.com/spoonacular/api/recipe-food-nutrition/endpoints

## List of the Technologies Used
* HTML
* CSS
* Javascript
* Bootstrap
* Express
* EJS
* EJS-Layouts
* Express-Passport
* Node.js
* Axios
* SQL
* Sequelize
* PostgresSQL

## Installation Instructions
#### 1. Install NPM dependencies

- `npm install`

#### 2. Create database and seed it
- `createdb mealplan`

- `sequelize db:migrate`

- `sequelize db:seed:all`

## User Stories

* AAU I’d want to be able to sign up for an account on the website.
* AAU I'd want to be able to sign into my account to view recipes.
* AAU I’d want to be able to view all the recipes on one page.
* AAU I'd want to be able to favorite recipes and refer back to the list.

## Screenshots

![Landing Page Screenshot](/public/img/landing.png)
![Explore Page Screenshot](/public/img/explore.png)
![Dashboard Page Screenshot](/public/img/dashboard.png)
![Calendar Page Screenshot](/public/img/calendar.png)
 
## Wireframes

![Wireframe Dashboard](/public/img/wireframeDashboard.png)
![Wireframe Database](/public/img/wireframeDatabase.png)
![Wireframe User Flow](/public/img/wireframeUserFlow.png)


## Unsolved problems/Major Hurdles

There were many major hurdles that we experienced while working on this project, one of them being the set up for our database. We were having issues with the database because the join table, "favorites", was not having its own primary key; and to fix this we went into the migration file and added that as an attribute. Along with that we were also not able to access repeating days in the table, so raw SQL was written into the code to retrieve the information.

Another hurdle we had was having the application layout be the way that we planned it to be. The recipe card, navigation bar, and dashboard had a lot fo trial and error with CSS to have it be designed we had envisioned for it. 

A current unsolved problem that we have is to make the application more responsive to different screen sizes. 

## Future Development

We want the application to have additional features that allow users to have a more seamless planning process for their meals. We want to add the ability to compile a shopping list consisting of all the ingredients in their weekly planned meals. We also want to add a community component to the application that allows users to communicate and share recipes as well and comment and rate them. Additionally, we want to be able to fetch data directly from the API instead of relying on the seeded information in the database.
