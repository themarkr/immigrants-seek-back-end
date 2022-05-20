/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', (table) => {
        table.increments('message_id', { primaryKey: true });
        table.integer('convo_id').notNullable();
        table.foreign('convo_id').references('convo_id').inTable('conversations').onDelete('CASCADE')
        table.string('message_body').notNullable();
        table.string('TIME_STAMP').notNullable();
        table.boolean('is_sender_lawyer').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};