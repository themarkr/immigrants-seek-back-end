/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reviews', (table) => {
        table.increments('review_id', { primaryKey: true });
        table.string('review_body').notNullable();
        table.integer('lawyer_id').notNullable();
        table.foreign('lawyer_id').references('user_id').inTable('users')
        table.integer('client_id').notNullable();
        table.foreign("client_id").references('user_id').inTable('users')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
};