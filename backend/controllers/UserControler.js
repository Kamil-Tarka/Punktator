const User = require('../models/user');
const _ = require('underscore');

exports.getAll = (req, res) => {
    User.getAll().then(
        function (allUser) {
            console.log(allUser);
            res.json(allUser);
        }
    );
};

exports.getById = (req, res) => {
    User.getById(req.params.id).then(
        function (user) {
            res.json(user);
        }
    );
};

exports.deleteById = (req, res) => {
    User.getById(req.params.id).then(
        function (user) {
            user.destroy({ require: true }).then(
                res.json({
                    'status': 'deleted',
                    'product': user,
                })
            )
        }
    );
};

exports.store = (req, res) => {
    let errorMessage = validateReqBody(req.body)

    if (errorMessage != '') {
        return res.status(400).json({ errorCode: 400, error: errorMessage });
    }
    else {
        const newUser = User.create({
            'username': req.body.username,
            'password': req.body.password
        }).then(function (user) {
            res.json({
                'status': 'saved!',
                'user': user,
            });
        });
    }
};

exports.updateById = (req, res) => {

    let errorMessage = validateReqBody(req.body)

    if (errorMessage != '') {
        return res.status(400).json({ errorCode: 400, error: errorMessage });
    }
    else {
        req.body.id = req.params.id
        User.getById(req.params.id).then(
            function (user) {
                if (!user) {
                    return res.status(404).json({ errorCode: 404, error: 'Nie ma takiego użytkownika' });
                }
                else {
                    User.update(req.body).then(function (user) {
                        res.json({
                            'status': 'saved!',
                            'user': user,
                        });
                    });
                }
            }
        )
    }
};

function validateReqBody(json) {
    let errorMessage = ''

    if (json.username == '') {
        errorMessage += 'Pusta nazwa użytkownika, '
    }
    if (json.password == '') {
        errorMessage += 'Puste hasło, '
    }

    return errorMessage
}