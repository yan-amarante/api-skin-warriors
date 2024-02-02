const listSalesQueries: string = 'SELECT * FROM sales'

const listSalesPageQueries: string = 'SELECT * FROM sales OFFSET $1 LIMIT 14'

const createSaleQueries: string = 'INSERT INTO sales (image, name, pattern, wear, price, category) VALUES ($1, $2, $3, $4, $5, $6);'

export { listSalesQueries, listSalesPageQueries, createSaleQueries }