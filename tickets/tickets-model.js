const db = require('../data/dbConfig.js')

module.exports = {
    findTickets,
    findTickectsById,
    addTicket,
    removeTicket,
    updateTicket
}

function findTickets() {
    return db('tickets').select( 'title', 'description', 'category', 'user_id', 'created_at', 'updated_at')
}

function findTickectsById(id) {
    return db('tickets')
        .where({ id })
        .first()
}

async function addTicket(ticket) {
    const [id] = await db('tickets').insert(ticket)

    return findTickectsById(id)
}

function removeTicket() {
    return null
}

function updateTicket() {
    return null
}