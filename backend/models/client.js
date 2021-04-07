const bookshelf = require('../config/bookshelf');

const Client = bookshelf.Model.extend({
    tableName: 'clients',
})

module.exports.getAll = () => {
    return Client.fetchAll();
}

module.exports.getById = (id) => {
    return new Client({ 'id': id }).fetch({ require: false });
}

module.exports.create = (client) => {
    return new Client({
        name: client.name,
        surname: client.surname,
        postal_code: client.postal_code,
        city: client.city,
        street: client.street,
        street_number: client.street_number,
        phone_number: client.phone_number,
        card_number: client.card_number,
        points: client.points
    }).save();
};

module.exports.update = (client) => {
    return new Client({
        id: client.id
    }).save({
        name: client.name,
        surname: client.surname,
        postal_code: client.postal_code,
        city: client.city,
        street: client.street,
        street_number: client.street_number,
        phone_number: client.phone_number,
        card_number: client.card_number,
        points: client.points
    },
        { patch: true }
    );
}
