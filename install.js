// File used to create the database using the sequelize models, execute with node install.js

import { Card, Contact, Document, User } from './app/models/index.js';

async function main() {
    await User.sync();
    await Card.sync();
    await Contact.sync();
    await Document.sync();
}

main().then(null).catch(console.log);