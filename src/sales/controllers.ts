import database from "../database";

import { listSalesQueries, listSalesCount, listSalesPageQueries, createSaleQueries } from "./queries"

import { Request, Response } from "express";


function transformToObject(array: any) {

    const object = array.reduce((acc: any, item: any) => {
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

    return object

}


async function listAllSales(req: Request, res: Response) {


    try {

        let result: any = await database.query(listSalesQueries)

        const transformedObject = transformToObject(result.rows)

        res.status(200).send(transformedObject)

    }

    catch (erro) {

        res.status(500).send({ erro: erro })

    }

}

async function countNumberOfPages(query: string, value: any = null) {


    let resultCount: any

    if (value === null) resultCount = await database.query(query)

    else resultCount = await database.query(query, value)

    const totalItems = resultCount.rows[0].count

    const limit = 14

    const numberOfPages = Math.ceil(totalItems / limit)
    
    if (numberOfPages === 0) return 1

    else return numberOfPages

}

async function listSales(req: Request, res: Response) {

    const pageParams: any = req.query.page

    const filterParams = [req.query.name, req.query.wear]

    const nameParams: any = [req.query.name]

    const wearParams: any = [req.query.wear]


    if (pageParams === undefined) {

        listAllSales(req, res)

    } else if (pageParams !== undefined) {

        const limit = 14

        const values = [(pageParams - 1) * limit]

        let rowsNumber

        let result: any


        if (nameParams[0] && wearParams[0] !== undefined) rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales WHERE name=$1 AND wear=$2", filterParams)

        else if (nameParams[0] !== undefined && wearParams[0] === undefined) rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales WHERE name=$1", nameParams)

        else if (nameParams[0] === undefined && wearParams[0] !== undefined) rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales WHERE wear=$1", wearParams)

        else if (nameParams[0] && wearParams[0] === undefined) rowsNumber = await countNumberOfPages("SELECT count(*) FROM sales")

        if (nameParams[0] && wearParams[0] !== undefined) {

            values.push(nameParams[0], wearParams[0])

            result = await database.query('SELECT * FROM sales WHERE name=$2 AND wear=$3 OFFSET $1 LIMIT 14', values)

        }
        else if (nameParams[0] !== undefined && wearParams[0] === undefined) {

            values.push(nameParams[0])

            result = await database.query('SELECT * FROM sales WHERE name=$2 OFFSET $1 LIMIT 14', values)

        }

        else if (nameParams[0] === undefined && wearParams[0] !== undefined) {

            values.push(wearParams[0])

            result = await database.query('SELECT * FROM sales WHERE wear=$2 OFFSET $1 LIMIT 14', values)

        }

        else {

            result = await database.query('SELECT * FROM sales OFFSET $1 LIMIT 14', values)

        }


        const transformedObject = transformToObject(result.rows)

        transformedObject.numberOfPages = rowsNumber


        res.status(200).send(transformedObject)

    }

}
//rowsNumber by filter // search by query params
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
