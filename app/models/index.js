import Card from "./card.js";
import Contact from "./contact.js";
import Document from "./document.js";
import User from "./user.js";

// Relations between a user and its cards
User.hasMany(Card, {
    as: 'cards',
    foreignKey: 'userId'
});

Card.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId'
});

// Relations between a user and its contacts
User.hasMany(Contact, {
    as: 'contacts',
    foreignKey: 'userId'
});

Contact.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId'
});

// Relations between a user and its documents
User.hasMany(Document, {
    as: 'documents',
    foreignKey: 'userId'
});

Document.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId'
});

// Junction table between cards and documents (many to many)
Card.belongsToMany(Document, {
    as: 'documents',
    through: 'card_has_document',
    foreignKey: 'cardId',
    otherKey: 'documentId',
});

Document.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_document',
    foreignKey: 'documentId',
    otherKey: 'cardId',
});

// Junction table between cards and contacts (many to many)
Card.belongsToMany(Contact, {
    as : 'contacts',
    through: 'card_has_contact',
    foreignKey: 'cardId',
    otherKey: 'contactId',
});

Contact.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_contact',
    foreignKey: 'contactId',
    otherKey: 'cardId',
});

export { User, Card, Contact, Document };