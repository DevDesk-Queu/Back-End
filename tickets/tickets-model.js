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
    return db('tickets').select('id', 'title', 'description', 'category', 'user_id', 'created_at', 'updated_at', 'helper_id')
}

function findTickectsById(id) {
    return db('tickets').select('id', 'description', 'user_id', 'helper_id')
        .where({ id })
        .first()
}
function findCommentsByTicketId(ticketId) {
    return db('comments as c')
        .join('tickets as t', 'c.ticket_id', 't.id')
        .select('c.comment', 'c.user_id')
        .where({ ticket_id: ticketId})
}
async function addTicket(ticket) {
    const [id] = await db('tickets').insert(ticket)

    return findTickectsById(id)
}

function removeTicket(id) {
    return db('tickets')
        .where({ id })
        .del()
}

function updateTicket(id, changes) {
    return db('tickets')
        .where({ id })
        .update(changes)
}