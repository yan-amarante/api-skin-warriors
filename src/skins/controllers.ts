import database from "../database.js";
import { buscarSkinsQueries } from "./queries.js"
import { Request, Response } from "express";

const buscarSkins = (req:Request, res:Response) => {
    database.query(buscarSkinsQueries).then(
        (resultado:any) => {
            res.status(200).send({ tarefas: resultado.rows })
        },
        (erro:any) => {
            res.status(500).send({ erro: erro })
        }
    )
    }

export { buscarSkins }
