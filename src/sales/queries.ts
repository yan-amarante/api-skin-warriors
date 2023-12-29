const listSalesQueries: string = 'SELECT * FROM sales'

const createSaleQueries: string = 'INSERT INTO sales (image, name, pattern, wear, float, price) VALUES ($1, $2, $3, $4, $5, $6);'

export { listSalesQueries, createSaleQueries }