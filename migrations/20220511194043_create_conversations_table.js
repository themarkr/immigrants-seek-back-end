/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('conversations', (table) => {
        table.increments('convo_id', { primaryKey: true });
        table.integer("client_id").notNullable();
        table.foreign('client_id').references('user_id').inTable("users");
        table.integer('lawyer_id').notNullable();
        table.foreign('lawyer_id').references('user_id').inTable('users');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("conversations")
};