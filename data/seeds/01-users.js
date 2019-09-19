
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, fullName: 'Johnny Appleseed', email: 'ja@test.com', role: 'admin', password: 'test' },
        { id: 2, fullName: 'Light Yagami', email: 'ly@test.com', role: 'admin', password: 'test' },
        { id: 3, fullName: 'Anthony Stark', email: 'as@test.com', role: 'admin', password: 'test' },
        { id: 4, fullName: 'Bruce Banner', email: 'bb@test.com', role: 'admin', password: 'test' }
      ]);
    });
};
