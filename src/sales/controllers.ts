import database from "../database";

import { listSalesQueries, createSaleQueries } from "./queries"

import { Request, Response } from "express";


async function listSales(req: Request, res: Response) {

    database.query(listSalesQueries).then(

        (resultado) => {

            const transformedObject = resultado.rows.reduce((acc, item) => {
                acc[item.id] = {
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    pattern: item.pattern,
                    wear: item.wear,
                    float: item.float,
                    price: item.price,
                    category: item.category
                };
                return acc;
            }, {});

            res.status(200).send(transformedObject)

        },

        (erro) => {

            res.status(500).send({ erro: erro })

        }

    )

}

async function createSale(req: Request, res: Response) {

    const values = [req.body.image, req.body.name, req.body.pattern, req.body.wear, req.body.float, req.body.price, req.body.category]

    database.query(createSaleQueries, values).then(

        (resultado) => {

            res.status(200).send({ message: "sucesso" })

        },

        (erro) => {

            res.status(500).send({ erro: erro })

        }


    )

}


export { listSales, createSale }
