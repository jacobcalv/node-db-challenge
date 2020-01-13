
exports.up = function(knex) {
  return(
    knex.schema
    .createTable('projects', tbl => {
        tbl.increments()

        tbl.string('name', 255)
            .notNullable();

        tbl.string('description',255)

        tbl.boolean('completed')
            .notNullable()
            .defaultTo(false)
    })
    .createTable('resources', tbl => {
        tbl.increments()
        
        tbl.string('name', 255)
            .notNullable()
            .unique()

        tbl.string('description',255)
    })
    .createTable('tasks', tbl => {
        tbl.increments()

        tbl.integer('project_id')
            .notNullable()
            .references("projects.id")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        tbl.string('description', 255)
            .notNullable();

        tbl.string('notes',255)

        tbl.boolean('completed')
            .notNullable()
            .defaultTo(false)
    })
    .createTable('projects_resources', tbl => {
        tbl.integer('project_id')
            .notNullable()
            .references('projects.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl.integer('resource_id')
            .notNullable()
            .references('resources.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl.primary(['project_id', 'resource_id']);
    })
    
  )
};

exports.down = function(knex) {
  return(
      knex.schema
        .dropTableIfExists('Projects_Resources')
        .dropTableIfExists('Tasks')
        .dropTableIfExists('Resources')
        .dropTableIfExists('Projects')
  )
};
