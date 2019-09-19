const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
    update
}

function find() {
    return db('users').select('id', 'fullName', 'email', 'role')
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

function remove() {
    return null
}

function update() {
    return null
}

