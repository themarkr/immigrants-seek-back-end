/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('lawyerStates').del()
    await knex('lawyerStates').insert([
        { user_id: 10, state_id: 32 },
        { user_id: 10, state_id: 9 },
        { user_id: 11, state_id: 32 },
        { user_id: 11, state_id: 5 },
        { user_id: 12, state_id: 32 },
        { user_id: 12, state_id: 7 },
        { user_id: 13, state_id: 32 },
        { user_id: 14, state_id: 32 },
        { user_id: 14, state_id: 5 },
        { user_id: 15, state_id: 32 },
        { user_id: 16, state_id: 32 },
        { user_id: 17, state_id: 32 },
        { user_id: 18, state_id: 32 },
        { user_id: 18, state_id: 43 },
    ]);
};