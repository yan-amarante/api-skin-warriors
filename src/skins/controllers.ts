import database from "../database";
import { buscarGridSkinsQueries, consultarTamanhoTabelaQueries } from "./queries"
import { Request, Response } from "express";

const buscarGridSkins = (req:Request, res:Response) => {
    database.query(buscarGridSkinsQueries).then(
        (resultado) => {
            res.status(200).send({ skins: resultado.rows })
        },
        (erro) => {
            res.status(500).send({ erro: erro })
        }
    )
    }

    const consultarTamanhoTabela = (req:Request, res:Response) => {
        database.query(consultarTamanhoTabelaQueries).then(
            (resultado) => {
                res.status(200).send({ tamanho: resultado.rows })
            },
            (erro) => {
                res.status(500).send({ erro: erro })
            }
        )
        }

export { buscarGridSkins, consultarTamanhoTabela }
