const buscarGridSkinsQueries :string = 'SELECT * FROM skins ORDER BY random() LIMIT 6'
const consultarTamanhoTabelaQueries: string = 'SELECT count(*) FROM skins'



export { buscarGridSkinsQueries, consultarTamanhoTabelaQueries }