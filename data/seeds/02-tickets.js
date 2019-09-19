
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').del()
    .then(function () {
      // Inserts seed entries
      return knex('tickets').insert([
        { id: 1, title: 'HELP', description: 'need help with some JS', category: 'JS', user_id: 1 },
        { id: 2, title: 'HELP', description: 'need help with some HTML', category: 'HTML', user_id: 2 },
        { id: 3, title: 'HELP', description: 'need help with some React', category: 'JS', user_id: 3 },
        { id: 4, title: 'HELP', description: 'not able to upload post', category: 'Forms', user_id: 4 },
        { id: 5, title: 'HELP', description: 'can not login', category: 'Website', user_id: 2 },
        { id: 6, title: 'HELP', description: 'unable make a get request', category: 'Code', user_id: 1 },
        { id: 7, title: 'HELP', description: 'full metal alchemist', category: 'Homunculi', user_id: 4 },
        { id: 8, title: 'HELP', description: 'need help with the post request', category: 'Code', user_id: 3 },
        { id: 9, title: 'HELP', description: 'theres alot of open tickets', category: 'JS', user_id: 2 },
        { id: 10, title: 'HELP', description: 'close a ticket at some point', category: 'JS', user_id: 2 },
        { id: 11, title: 'HELP', description: 'someone at least take a ticket for me', category: 'JS', user_id: 3 },
        { id: 12, title: 'HELP', description: 'please help?', category: 'JS', user_id: 3 },
        { id: 13, title: 'HELP', description: 'okay im done now ', category: 'JS', user_id: 4 }
      ]);
    });
};
