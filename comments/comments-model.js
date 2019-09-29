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
    return db('comments').insert(comment, '*')
    // const [id] = await db('comments').insert(comment)

    // return findCommentsById(id)
}

function removeComment(id) {
    return db('comments')
        .where({ id })
        .del()
}

function updateComment(id, changes) {
    return db('comments')
        .where({ id })
        .update(changes)
}