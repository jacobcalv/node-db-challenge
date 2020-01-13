
exports.seed = function(knex) {
      return knex('tasks').insert([
        {
          "project_id": 1,
          "description": "We will first track the rats to their nest and then catch them all and release them at our competitions building",
          "notes": "Make the interns do it"
        }
      ]);
};
