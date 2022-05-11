/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('conversations', (table) => {
        table.increments('convo_id', { primaryKey: true });
        table.integer("person1").notNullable();
        table.foreign('person1').references('user_id').inTable("users");
        table.integer('person2').notNullable();
        table.foreign('person2').references('user_id').inTable('users');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};