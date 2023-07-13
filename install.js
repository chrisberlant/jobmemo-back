// File used to create the database using the sequelize models

import { Card, Contact, Document, User } from './app/models/index.js';


async function main() {
    await Card.sync();
    await Contact.sync();
    await Document.sync();
    await User.sync();
}

main().then(null).catch(console.log);
