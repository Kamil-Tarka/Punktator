const bookshelf = require('../config/bookshelf');

const Log = bookshelf.Model.extend({
    tableName: 'log',
})

module.exports.getAll = () => {
    return Log.fetchAll();
}

module.exports.getById = (id) => {
    return new Log({ 'id': id }).fetch({ require: false });
}

module.exports.create = (log) => {
    return new Log({
        user_id: log.user_id,
        action_name: log.action_name,
        value: log.value,
        date: log.date
    }).save();
};

module.exports.update = (log) => {
    return new Log({
        id: log.id
    }).save({
        user_id: log.user_id,
        action_name: log.action_name,
        value: log.value,
        date: log.date
    },
        { patch: true }
    );
}
