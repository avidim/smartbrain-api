const handler = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db('login').select('email', 'hash')
        .where('email', '=', email)
        .then(user => {
            if (bcrypt.compareSync(password, user[0].hash))
                return db('users')
                    .select('*').where('email', '=', email)
                    .then(user => res.status(200).json(user[0]))
                    .catch(err => res.status(404).send('404'));
            else
                return res.status(404).send('404');
        })
        .catch(err => res.status(404).send('404'))
};

module.exports = {
    handler
};