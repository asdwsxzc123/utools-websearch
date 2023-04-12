
const dbGet = utools.db.get
const dbGetAll = utools.db.allDocs
const dbPut = utools.db.put
const dbRemove = utools.db.remove

const Database = {
    dbGet, dbGetAll, dbPut, dbRemove,
}

window.DatabaseApi = Database

