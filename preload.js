
const dbGet = utools?.db?.get
const dbGetAll = utools?.db?.allDocs
const dbPut = utools?.db?.put
const dbRemove = utools?.db?.remove

const outPlugin = utools?.outPlugin
const onPluginEnter = utools?.onPluginEnter
const shellOpenExternal = utools?.shellOpenExternal

window.WindowDatabaseApi = { dbGet, dbGetAll, dbPut, dbRemove, }
window.WindowUtoolsApi = { outPlugin, onPluginEnter, shellOpenExternal, }

