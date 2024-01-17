const listSkinsQueries: string = 'SELECT * FROM skins'

const searchCategoriesQueries: string = 'SELECT "category.name", "weapon.name" FROM skins'

const searchPatternInfosQueries: string = 'SELECT "weapon.name", "category.name", "pattern.name", "wears", "image" FROM skins WHERE "category.name"=$1'

export { listSkinsQueries, searchCategoriesQueries, searchPatternInfosQueries }