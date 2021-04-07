const bookshelf = require('../config/bookshelf');

const User = bookshelf.Model.extend({
    tableName: 'users',
})

module.exports.getAll = () => {
    return User.fetchAll();
}

module.exports.getById = (id) => {
    return new User({ 'id': id }).fetch({ require: false });
}

module.exports.create = (user) => {
    return new User({
        username: user.username,
        password: user.password,
    }).save();
};

module.exports.update = (user) => {
    return new User({
        id: user.id
    }).save({
        username: user.username,
        password: user.password
    },
        { patch: true }
    );
}
