/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('lawyerStates').del()
    await knex('lawyerStates').insert([
        { user_id: 1, state_id: 32 },
        { user_id: 1, state_id: 9 },
        { user_id: 2, state_id: 32 },
        { user_id: 2, state_id: 5 },
        { user_id: 3, state_id: 32 },
        { user_id: 3, state_id: 7 },
        { user_id: 4, state_id: 32 },
        { user_id: 5, state_id: 32 },
        { user_id: 5, state_id: 5 },
        { user_id: 6, state_id: 32 },
        { user_id: 7, state_id: 32 },
        { user_id: 8, state_id: 32 },
        { user_id: 9, state_id: 32 },
        { user_id: 9, state_id: 43 },
    ]);
};