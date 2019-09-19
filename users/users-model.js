const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
    update,
    findTicketsByUser
}

function find() {
    return db('users').select('id', 'fullName', 'email', 'role')
}

function findBy(info) {
    return db('users').where(info)
}

function findById(id) {
    return db('users').select( 'id', 'fullName', 'email', 'role')
        .where({ id })
        .first()
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}

function remove(id) {
    return db('users')
        .where({ id })
        .del()
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes)
}

function findTicketsByUser(userId) {
    return db('tickets as t')
        .join('users as u', 't.user_id', 'u.id')
        .select('t.id', 't.description', 't.title', 't.category', 'u.id as userId')
        .where({ user_id: userId })
}