import Card from "./card";
import Contact from "./contact";
import Document from "./document";
import User from "./user";

// Relations between a user and its cards
export const userCardAssociation = User.hasMany(Card, {
    as: 'cards',
    foreignKey: 'user_id'
});

export const cardUserAssociation = Card.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// Relations between a user and its contacts
export const userContactAssociation = User.hasMany(Contact, {
    as: 'contacts',
    foreignKey: 'user_id'
});

export const contactUserAssociation = Contact.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// Relations between a user and its documents
export const userDocumentAssociation = User.hasMany(Document, {
    as: 'documents',
    foreignKey: 'user_id'
});

export const documentUserAssociation = Document.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// Junction table between cards and documents
export const cardDocumentAssociation = Card.belongsToMany(Document, {
    as: 'documents',
    through: 'card_has_document',
    foreignKey: 'card_id',
    otherKey: 'document_id',
    timestamps: false
});

export const documentCardAssociation = Document.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_document',
    foreignKey: 'document_id',
    otherKey: 'card_id',
    timestamps: false
});

// Junction table between cards and contacts
export const cardContactAssociation = Card.belongsToMany(Contact, {
    as : 'contacts',
    through: 'card_has_contact',
    foreignKey: 'card_id',
    otherKey: 'contact_id',
    timestamps: false
});

export const contactCardAssociation = Contact.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_contact',
    foreignKey: 'contact_id',
    otherKey: 'card_id',
    timestamps: false
});