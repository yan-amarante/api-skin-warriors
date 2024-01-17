const listSalesQueries: string = 'SELECT * FROM sales'

const createSaleQueries: string = 'INSERT INTO sales (image, name, pattern, wear, price) VALUES ($1, $2, $3, $4, $5);'

export { listSalesQueries, createSaleQueries }