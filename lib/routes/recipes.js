const { Router } = require('express');
const Recipe = require('../models/Recipe');
const Event = require('../models/Event');

module.exports = Router()
  .post('/', (req, res) => {
    Recipe
      .create(req.body)
      .then(recipe => res.send(recipe));
  })

  .get('/', (req, res) => {
    Recipe
      .find()
      .select({ name: true, __v: true })
      .then(recipes => res.send(recipes));
  })

  .get('/:id', (req, res) => {
    Recipe
      .findById(req.params.id)
      .then(recipe => res.send(recipe));
  })

  .patch('/:id', (req, res) => {
    Promise.all([
      Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }),
      Event.find({ recipeId: req.params.id })
    ])
      .then(([recipe, event]) => {
        res.send({ ...recipe.toJSON(), event });
      });
  })

  .delete('/:id', (req, res) => {
    Recipe
      .findByIdAndDelete(req.params.id)
      .then(recipe => res.send(recipe));
  });
