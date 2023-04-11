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

const KeyDefaultGearId = 'conf-default-gear-id'
const KeyParams = 'conf-params'
const PrefGearId = 'gear-'

const dbGet = utools.db.get
const dbGetAll = utools.db.allDocs
const dbPut = utools.db.put
const dbRemove = utools.db.remove

const Database = {
    getDefaultGearId()
    {
        return dbGet(KeyDefaultGearId).data
    },
    getDefaultGear()
    {
        const defaultGearId = Database.getDefaultGearId()
    },
    setDefaultGearId(gearId)
    {},
    insertGear()
    {
    },
    deleteGear(gearId)
    {
        return dbRemove(gearId)
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
        return dbGet(gearId).data
    },
    selectGears()
    {
        return dbGetAll(PrefGearId)
    },
}

window.Database = Database

