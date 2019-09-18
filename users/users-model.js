const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('users').where('id', 'username')
}

function findBy(info) {
    return db('users').where(info)
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}