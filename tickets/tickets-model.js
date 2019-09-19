const db = require('../data/dbConfig.js')

module.exports = {
    findTickets,
    findTickectsById,
    findCommentsByTicketId,
    addTicket,
    removeTicket,
    updateTicket
}

function findTickets() {
    return db('tickets').select( 'title', 'description', 'category', 'user_id', 'created_at', 'updated_at')
}

function findTickectsById(id) {
    return db('tickets').select('id', 'description', 'user_id')
        .where({ id })
        .first()
}
function findCommentsByTicketId(ticketId) {
    return db('comments as c')
        .join('tickets as t', 'c.ticket_id', 't.id')
        .select('t.id', 'c.comment', 'c.user_id')
        .where({ ticket_id: ticketId})
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