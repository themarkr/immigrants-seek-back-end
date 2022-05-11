/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('user_id', { primaryKey: true });
        table.string('first_name', 20);
        table.string('last_name', 20);
        table.string('email').unique().notNullable();
        table.string('password', 32);
        table.string('profile_pic_link', 600);
        table.boolean('is_lawyer');
        table.string('firm').nullable();
        table.string('bio', 500).nullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};