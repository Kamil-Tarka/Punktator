const Log = require('../models/log');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Log.getAll().then(
        function (allActions) {
            console.log(allActions);
            res.json(allActions);
        }
    );
};

exports.store = (req, res) => {
    let errorMessage = validateReqBody(req.body)

    if (errorMessage != '') {
        return res.status(400).json({ errorCode: 400, error: errorMessage });
    }
    else {
        const newLog = Log.create({
            'user_id': req.body.user_id,
            'action_name': req.body.action_name,
            'value': req.body.value,
            'date': req.body.date
        }).then(function (log) {
            res.json({
                'status': 'saved!',
                'user': log,
            });
        });
    }
};

function validateReqBody(json) {
    let errorMessage = ''

    if (json.user_id == '') {
        errorMessage += 'Puste id użytkownika, '
    }
    if (json.action_name == '') {
        errorMessage += 'Pusta akcja, '
    }
    if (json.value == '') {
        errorMessage += 'Puste dane, '
    }
    if (json.date == '') {
        errorMessage += 'Brak daty, '
    }

    return errorMessage
}