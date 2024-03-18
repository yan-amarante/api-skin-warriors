import database, {connectDatabase} from "../database";

import { listSalesQueries, listSalesCount, listSalesPageQueries, createSaleQueries } from "./queries"

import { Request, Response } from "express";

connectDatabase()

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

    try {

        const pageParams: any = req.query.page

        const nameParam: any = req.query.name

        const wearParam: any = req.query.wear


        let filterQuery = 'SELECT count(*) FROM sales'

        let values: any[] = []

        let resultQuery = 'SELECT * FROM sales'

        let filterParams: any[] = []


        if (nameParam !== undefined && wearParam !== undefined) {

            filterQuery = 'SELECT count(*) FROM sales WHERE name=$1 AND wear=$2'

            resultQuery = 'SELECT * FROM sales WHERE name=$2 AND wear=$3'

            filterParams = [nameParam, wearParam]

            values = [(pageParams - 1) * 14, nameParam, wearParam]

        } else if (nameParam !== undefined) {

            filterQuery = 'SELECT count(*) FROM sales WHERE name=$1'

            resultQuery = 'SELECT * FROM sales WHERE name=$2'

            filterParams = [nameParam]

            values = [(pageParams - 1) * 14, nameParam]

        } else if (wearParam !== undefined) {

            filterQuery = 'SELECT count(*) FROM sales WHERE wear=$1'

            resultQuery = 'SELECT * FROM sales WHERE wear=$2'

            filterParams = [wearParam]

            values = [(pageParams - 1) * 14, wearParam]

        }else {

            filterQuery = 'SELECT count(*) FROM sales'

            values = [(pageParams - 1) * 14]

        }


        const rowsNumber = await countNumberOfPages(filterQuery, filterParams)

        const result = await database.query(resultQuery + ' OFFSET $1 LIMIT 14', values)

        const transformedObject = transformToObject(result.rows)

        transformedObject.numberOfPages = rowsNumber


        res.status(200).send(transformedObject)

    } catch (error) {

        res.status(500).send({ erro: error })

    }

}

async function createSale(req: Request, res: Response) {

    try {

        const values = [req.body.image, req.body.name, req.body.pattern, req.body.wear, req.body.price, req.body.category]

        const result = await database.query(createSaleQueries, values)


        res.status(200).send({ message: "sucesso" })

    } catch (error) {

        res.status(500).send({ erro: error })

    }

}

async function closeSale(req: Request, res: Response) {

    try {

        const values = [req.params.id]

        let result: any = await database.query("DELETE FROM sales WHERE id=$1", values)

        res.status(200).send({ message: "sucesso" })

    }

    catch (erro) {

        res.status(500).send({ erro: erro })

    }

}


export { listSales, createSale, closeSale }
