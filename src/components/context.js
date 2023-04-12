
export const isUtoolsContext = typeof WindowDatabaseApi !== 'undefined' && typeof WindowUtoolsApi !== 'undefined'

export const AppVersion = window.AppVersion

const EmptyFunction = () => {
    console.log('没有运行在 utools 环境, 空方法被调用')
    console.trace()
}

/*
数据库结构

conf-default-gear-id :string
conf-params :object
    {key} :{value}
gear-{id} :object
    id :string
    icon :string
    name :string
    pattern :string
*/

const dbGet = isUtoolsContext ? WindowDatabaseApi.dbGet : EmptyFunction
const dbGetAll = isUtoolsContext ? WindowDatabaseApi.dbGetAll : EmptyFunction
const dbPut = isUtoolsContext ? WindowDatabaseApi.dbPut : EmptyFunction
const dbRemove = isUtoolsContext ? WindowDatabaseApi.dbRemove : EmptyFunction

const KeyDefaultGearId = 'conf-default-gear-id'
const KeyParams = 'conf-params'
const PrefGearId = 'gear-'

export const Database = {
    getDefaultGearId()
    {
        return dbGet(KeyDefaultGearId)?.data ?? null
    },
    getDefaultGear()
    {
        const defaultGearId = Database?.getDefaultGearId()
        return Database?.selectGear(defaultGearId) ?? null
    },
    setDefaultGearId(gearId)
    {},
    insertGear()
    {
    },
    deleteGear(gearId)
    {
        return dbRemove(gearId) ?? null
    },
    updateGear(gearId, {icon, name, pattern})
    {
        return dbPut({
            _id: gearId,
            _rev: "1-05c9b92e6f24287dc1f4ec79d9a34fa8",
            data: {
                id: gearId,
                icon,
                name,
                pattern,
            },
        })
    },
    selectGear(gearId)
    {
        return dbGet(gearId)?.data ?? null
    },
    selectGears()
    {
        return dbGetAll(PrefGearId) ?? null
    },
}

const outPlugin = isUtoolsContext ? WindowUtoolsApi.outPlugin : EmptyFunction
const onPluginEnter = isUtoolsContext ? WindowUtoolsApi.onPluginEnter : EmptyFunction
const shellOpenExternal = isUtoolsContext ? WindowUtoolsApi.shellOpenExternal : url => window.open(url, '_blank')

export const Utools = { outPlugin, onPluginEnter, shellOpenExternal, }

