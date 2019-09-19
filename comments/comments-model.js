const db = require('../data/dbConfig.js')

module.exports = {
    findComments,
    findCommentsById,
    addComment,
    removeComment,
    updateComment
}

function findComments() {
    return db('comments').select( 'comment', 'user_id', 'ticket_id', 'created_at')
}

function findCommentsById() {
    return null
}

function addComment() {
    return null
}

function removeComment() {
    return null
}

function updateComment() {
    return null
}