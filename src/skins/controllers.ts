import database from "../database";

import { listSkinsQueries } from "./queries"

import { Request, Response } from "express";


const listSkins = (req: Request, res: Response) => {

    database.query(listSkinsQueries).then(

        (resultado) => {

            res.status(200).send({ skins: resultado.rows })

        },

        (erro) => {

            res.status(500).send({ erro: erro })

        }

    )

}


export { listSkins, }
