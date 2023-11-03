const router = require('express').Router();
let Highlight = require('../models/highlight.model');

router.route('/').get((req, res) => {
  Highlight.find()
    .then(highlights => res.json(highlights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const feeling = req.body.feeling;
  const date = Date.parse(req.body.date);

  const newHighlight = new Highlight({
    username,
    description,
    feeling,
    date,
  });

  newHighlight.save()
  .then(() => res.json('Highlight added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Highlight.findById(req.params.id)
    .then(highlight => res.json(highlight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Highlight.findByIdAndDelete(req.params.id)
    .then(() => res.json('Highlight deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Highlight.findById(req.params.id)
    .then(highlight => {
      highlight.username = req.body.username;
      highlight.description = req.body.description;
      highlight.feeling = req.body.feeling;
      highlight.date = Date.parse(req.body.date);

      highlight.save()
        .then(() => res.json('Highlight updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;