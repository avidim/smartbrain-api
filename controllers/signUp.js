const handler = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    db.transaction(trx => {
        trx('login').insert({
            email: email,
            hash: hash
        })
            .catch(err => res.status(400).json(err))
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date
                    })
                    .then(response => res.status(200).send('success'))
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json(err))
};

module.exports = {
    handler
};