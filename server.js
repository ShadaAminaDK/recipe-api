const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');   
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.post('/recipes', (req, res) => {
        const {title, ingredients, instructions, cookTime} = req.body;
    if(!title || !ingredients || !instructions || !cookTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'recipes.json')));
    const newRecipe = {
        id: Date.now().toString(),
        title,
        ingredients,
        instructions,
        cookTime,
        difficulty: difficulty || 'Medium'
    };
    recipes.push(newRecipe);
    fs.writeFileSync(path.join(__dirname, 'data', 'recipes.json'), JSON.stringify(recipes, null, 2));
    res.status(201).json(newRecipe);
});

app.get('/recipes', (req, res) => {
    const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'recipes.json')));
    res.json(recipes);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Kalvium Recipe API');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});