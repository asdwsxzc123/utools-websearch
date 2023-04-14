
const dbGet = utools?.db?.get
const dbGetAll = utools?.db?.allDocs
const dbPut = utools?.db?.put
const dbRemove = utools?.db?.remove

const outPlugin = utools?.outPlugin
const onPluginEnter = utools?.onPluginEnter
const shellOpenExternal = utools?.shellOpenExternal

const showSaveDialog = utools?.showSaveDialog
const showOpenDialog = utools?.showOpenDialog
const pathDefault = utools?.getPath('desktop')

const fs = require('fs')

window.WindowDatabaseApi = { dbGet, dbGetAll, dbPut, dbRemove, }
window.WindowUtoolsApi = { outPlugin, onPluginEnter, shellOpenExternal, }
window.WindowFsApi = {
    pathDefault, showSaveDialog, showOpenDialog,
    fsRead: fs.readFileSync,
    fsWrite: fs.writeFileSync,
    fsExist: fs.existsSync,
    fsDelete: fs.rmSync,
}
