const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '1d12be889655455fabd9c12f42ff3e3a'
});

const apiCall = (req, res) => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.imageUrl)
        .then(response => res.json(response))
        .catch(err => res.status(400).json('Unable to work with API'))
};

const handler = (req, res, db) => {
    const { id }  = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.send(entries[0]))
        .catch(err => res.status(400).json('Unable to get entries'));
};

module.exports = {
    handler,
    apiCall
};