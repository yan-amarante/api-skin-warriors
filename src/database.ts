import pg, { Client } from "pg"

import dotenv from "dotenv";


dotenv.config();


const database: Client = new pg.Client(process.env.DATABASE_URL);


export const connectDatabase = async () => {

    try {

        await database.connect()

        console.log("Conectado ao ElephantSQL!")

    } catch (error) {

        console.log("Não foi possivel conectar com o ElephantSQL", error)

    }

}

export const disconnectFromDatabase = async () => {

    try {

        await database.end()

        console.log('Disconnected from the database!')

    } catch (error) {

        console.error('Failed to disconnect from the database:', error)

    }

}


export default database