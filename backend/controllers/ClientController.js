const Client = require('../models/client');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Client.getAll().then(
        function (allClient) {
            console.log(allClient);
            res.json(allClient);
        }
    );
};

exports.getById = (req, res) => {
    Client.getById(req.params.id).then(
        function (client) {
            res.json(client);
        }
    );
};

exports.deleteById = (req, res) => {
    Client.getById(req.params.id).then(
        function (client) {
            client.destroy({ require: true }).then(
                res.json({
                    'status': 'deleted',
                    'product': client,
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
        const newClient = Client.create({
            'name': req.body.name,
            'surname': req.body.surname,
            'postal_code': req.body.postal_code,
            'city': req.body.city,
            'street': req.body.street,
            'street_number': req.body.street_number,
            'phone_number': req.body.phone_number,
            'card_number': req.body.card_number,
            'points': req.body.points
        }).then(function (client) {
            res.json({
                'status': 'saved!',
                'client': client,
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
        Client.getById(req.params.id).then(
            function (client) {
                if (!client) {
                    return res.status(404).json({ errorCode: 404, error: 'Nie ma takiego klienta' });
                }
                else {
                    Client.update(req.body).then(function (client) {
                        res.json({
                            'status': 'saved!',
                            'client': client,
                        });
                    });
                }
            }
        )
    }
};

function validateReqBody(json) {
    let errorMessage = "";
    if (json.card_number == "") {
        errorMessage += "Nie podano kodu karty\n";
    }
    if (json.name == "") {
        errorMessage += "Nie podoano imienia\n";
    }
    if (json.surname == "") {
        errorMessage += "Nie podano nazwiska";
    }
    if (json.postal_code != "") {
        const regexPostal = new RegExp("^[0-9]{2}-[0-9]{3}$");
        if (!regexPostal.test(json.postal_code)) {
            errorMessage += "Błędny kod pocztowy";
        }
    }
    if (json.city != "") {
        if (json.city.length < 1) {
            errorMessage += "Podano niepoprawną nazwę miasta";
        }
    }
    if (json.street != "") {
        if (json.street.length < 1) {
            errorMessage += "Podano niepoprawną nazwę ulicy";
        }
    }
    if (json.street_number != "") {
        if (json.street_number.length < 1) {
            errorMessage += "Podano niepoprawny nr. budynku";
        }
    }
    if (json.phone_number != "") {
        if (json.phone_number.length <= 1) {
            errorMessage += "Podano niepoprawny nr. telefonu";
        }
    }

    return errorMessage
}