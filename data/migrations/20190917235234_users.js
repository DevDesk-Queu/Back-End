
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users
        .increments();
      users
        .string('fullName', 128)
        .notNullable()
        .unique()
      users
        .string('password')
        .notNullable()
      users
        .string('email', 256)
        .notNullable()
        .unique()
      users
        .string('role')
        .notNullable()
  })
    .createTable('tickets', tickets => {
        tickets
            .increments()
        tickets
            .string('title', 128)
            .notNullable()
        tickets
            .string('description', 2000)
            .notNullable()
        tickets
            .string('category')
            .notNullable()
        tickets
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
        tickets
            .timestamps(true, true)
        // user id will be a foreign key
    })
    .createTable('comments', comments => {
        comments
            .increments()
        comments
            .string('comment', 2000)
            .notNullable()
        comments
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
        comments
            .integer('ticket_id')
            .unsigned()
            .references('id')
            .inTable('tickets')
        comments
        .timestamps(true, true)

        // user id and ticket id will both be foreign keys
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments').dropTableIfExists('tickets').dropTableIfExists('users')
};
