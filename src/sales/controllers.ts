import database from "../database";

import { listSalesQueries, listSalesPageQueries, createSaleQueries } from "./queries"

import { Request, Response } from "express";


async function listSales(req: Request, res: Response) {

    const queryParams:any = req.query.page

    let values = [(queryParams - 1) * 14] 

    if (queryParams === undefined) {

        database.query(listSalesQueries).then(

            (resultado) => {

                const transformedObject = resultado.rows.reduce((acc, item) => {
                    acc[item.id] = {
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        pattern: item.pattern,
                        wear: item.wear,
                        price: item.price,
                        category: item.category
                    };
                    return acc;
                }, {})

                res.status(200).send(transformedObject)

            },

            (erro) => {

                res.status(500).send({ erro: erro })

            }

        )

    } else if (queryParams !== undefined) {
        
        const result = await database.query(listSalesPageQueries, values)

        const transformedObject = result.rows.reduce((acc, item) => {
            acc[item.id] = {
                id: item.id,
                image: item.image,
                name: item.name,
                pattern: item.pattern,
                wear: item.wear,
                price: item.price,
                category: item.category
            };
            return acc;
        }, {})

        res.status(200).send(transformedObject)

    }

}

async function createSale(req: Request, res: Response) {

    const values = [req.body.image, req.body.name, req.body.pattern, req.body.wear, req.body.price, req.body.category]

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
