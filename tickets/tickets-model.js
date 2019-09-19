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

function findTickectsById() {
    return null
}

function addTicket() {
    return null
}

function removeTicket() {
    return null
}

function updateTicket() {
    return null
}