const handler = (req, res, db) => {
    const { id }  = req.params;
    db('users').select('*').where({id})
        .then(user => {
            if (user.length)
                res.json(user);
            else
                res.status(400).send('Not found');
        })
        .catch(err => res.status(400).send(err));
};

module.exports = {
    handler
};