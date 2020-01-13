
exports.seed = function(knex) {
      return knex('projects').insert([
        {
          "name": "Removing rats from walls\n",
          "project_description": "We must remove the infestation of rats from our office building.",
          "completed": "false"
      },
      {
          "name": "Create database for nasa",
          "project_description": "Nasa has asked us to create a database so that they can store there missle lauches\n",
          "completed": "false"
      },
      {
          "name": "Clean Break Room",
          "project_description": "We must stop the ants from infesting this place",
          "completed": "false"
      },
      {
          "name": "Shred Paper",
          "project_description": "We must get rid of all of the evidence",
          "completed": "false"
      }
      ]);
};
