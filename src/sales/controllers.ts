import database from "../database";

import { listSalesQueries, listSalesCount, listSalesPageQueries, createSaleQueries } from "./queries"

import { Request, Response } from "express";

import { QueryResult } from "pg";

interface Sales {
    id: number,
    image: string,
    name: string,
    pattern: string,
    wear: string,
    price: number,
    category: string,
    numberOfPages: number
}
type CreateSaleParams = [string, string, string, string, number, string]


function transformToObject(array: any[]) {
    const object: Sales = array.reduce((acc: any, item: Sales) => {
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

async function countNumberOfPages(query: string, value: (string | number)[] | null = null) {

    let resultCount: QueryResult<any>

    if (value === null) resultCount = await database.query(query)

    else resultCount = await database.query(query, value)

    const totalItems: number = resultCount.rows[0].count

    const limit: number = 14

    const numberOfPages: number = Math.ceil(totalItems / limit)

    if (numberOfPages === 0) return 1

    else return numberOfPages

}

async function listSales(req: Request, res: Response): Promise<void> {

    try {

        const pageParams = req.query.page as string

        const nameParam = req.query.name as string

        const wearParam = req.query.wear as string


        let filterQuery: string = 'SELECT count(*) FROM sales'

        let values: (string | number)[] = []

        let resultQuery: string = 'SELECT * FROM sales'

        let filterParams: string[] = []


        if (nameParam !== undefined && wearParam !== undefined) {

            filterQuery = 'SELECT count(*) FROM sales WHERE name=$1 AND wear=$2'

            resultQuery = 'SELECT * FROM sales WHERE name=$2 AND wear=$3'

            filterParams = [nameParam, wearParam]

            values = [(Number(pageParams) - 1) * 14, nameParam, wearParam]

        } else if (nameParam !== undefined) {

            filterQuery = 'SELECT count(*) FROM sales WHERE name=$1'

            resultQuery = 'SELECT * FROM sales WHERE name=$2'

            filterParams = [nameParam]

            values = [(Number(pageParams) - 1) * 14, nameParam]

        } else if (wearParam !== undefined) {

            filterQuery = 'SELECT count(*) FROM sales WHERE wear=$1'

            resultQuery = 'SELECT * FROM sales WHERE wear=$2'

            filterParams = [wearParam]

            values = [(Number(pageParams) - 1) * 14, wearParam]

        } else {

            filterQuery = 'SELECT count(*) FROM sales'

            values = [(Number(pageParams) - 1) * 14]

        }

        resultQuery += " OFFSET $1 LIMIT 14"

        const rowsNumber: number = await countNumberOfPages(filterQuery, filterParams)

        const result: QueryResult<any> = await database.query(resultQuery, values)

        const transformedObject: Sales = transformToObject(result.rows)

        transformedObject.numberOfPages = rowsNumber


        res.status(200).send(transformedObject)

    } catch (error) {

        res.status(500).send({ erro: error })

    }

}

async function createSale(req: Request, res: Response) {

    try {

        const values: CreateSaleParams = [req.body.image, req.body.name, req.body.pattern, req.body.wear, req.body.price, req.body.category]

        await database.query(createSaleQueries, values)


        res.status(200).send({ message: "sucesso" })

    } catch (error) {

        res.status(500).send({ erro: error })

    }

}

async function closeSale(req: Request, res: Response) {

    try {

        const values: [string] = [req.params.id]

        await database.query("DELETE FROM sales WHERE id=$1", values)

        res.status(200).send({ message: "sucesso" })

    }

    catch (erro) {

        res.status(500).send({ erro: erro })

    }

}


export { listSales, createSale, closeSale }
