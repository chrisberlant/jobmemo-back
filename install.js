// File used to create the database using the sequelize models, execute with node install.js

import { Card, Contact, Document, User } from './app/models/';
import sequelize from './app/sequelize-client.js';

async function main() {
    sequelize.sync();
}

main().then(null).catch(console.log);