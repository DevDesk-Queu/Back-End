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

function findCommentsById(id) {
    return db('comments').select('id', 'comment', 'user_id', 'created_at')
        .where({ id })
        .first()
}

async function addComment(comment) {
    const [id] = await db('comments').insert(comment)

    return findCommentsById(id)
}

function removeComment() {
    return null
}

function updateComment() {
    return null
}