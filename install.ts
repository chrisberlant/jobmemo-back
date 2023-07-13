// File used to create the database using the sequelize models

import Card from './app/models/card';
import Contact from './app/models/contact';
import Document from './app/models/document';
import User from './app/models/user';

async function main() {
    await Card.sync();
    await Contact.sync();
    await Document.sync();
    await User.sync();
}

main().then(null).catch(console.log);
