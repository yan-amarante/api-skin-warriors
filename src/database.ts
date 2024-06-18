import pg, { Client } from "pg"

import dotenv from "dotenv";


dotenv.config();


const database: Client = new pg.Client(process.env.DATABASE_URL);

database.connect()

console.log("Conectado ao ElephantSQL!")

export const disconnectFromDatabase = async () => {

    try {

        await database.end()

        console.log('Disconnected from the database!')

    } catch (error) {

        console.error('Failed to disconnect from the database:', error)

    }

}


export default database