import CardSqliteModel from '../models/cardSqliteModel.js'

// Get all cards by user_id
export const getCardsService = async (id) => {
    return await CardSqliteModel.findAll({ where: { user_id: id } });
}

// Add a card
export const addCardService = async (cardData) => {
    return await CardSqliteModel.create(cardData);
}

// Update a card
export const updateCardService = async (id, cardData) => {
    return await CardSqliteModel.update(cardData, { where: { id } });
}

// Delete a card
export const deleteCardService = async (id) => {
    return await CardSqliteModel.destroy({ where: { id } });
}