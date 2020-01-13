
exports.seed = function(knex) {
      return knex('resources').insert([
      {
          "name": "Mop",
          "description": "A trusty tool to clean the floor"
      },
      {
          "name": "Stapler",
          "description": "A way to bind papers together neatly"
      }
      ]);
};
