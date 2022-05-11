/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("lawyerStates", function(table) {
        table.integer("user_id").notNullable();
        table.foreign('user_id').references('user_id').inTable("users");
        table.integer("state_id").notNullable();
        table.foreign('state_id').references('state_id').inTable('states');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('lawyerStates')
};