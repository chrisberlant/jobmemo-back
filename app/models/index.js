import Card from "./card.js";
import Contact from "./contact.js";
import Document from "./document.js";
import User from "./user.js";

// Relations between a user and its cards
User.hasMany(Card, {
    as: 'cards',
    foreignKey: 'user_id'
});

Card.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// Relations between a user and its contacts
User.hasMany(Contact, {
    as: 'contacts',
    foreignKey: 'user_id'
});

Contact.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// Relations between a user and its documents
User.hasMany(Document, {
    as: 'documents',
    foreignKey: 'user_id'
});

Document.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// Junction table between cards and documents (many to many)
Card.belongsToMany(Document, {
    as: 'documents',
    through: 'card_has_document',
    foreignKey: 'card_id',
    otherKey: 'document_id',
});

Document.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_document',
    foreignKey: 'document_id',
    otherKey: 'card_id',
});

// Junction table between cards and contacts (many to many)
Card.belongsToMany(Contact, {
    as : 'contacts',
    through: 'card_has_contact',
    foreignKey: 'card_id',
    otherKey: 'contact_id',
});

Contact.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_contact',
    foreignKey: 'contact_id',
    otherKey: 'card_id',
});

export { User, Card, Contact, Document };