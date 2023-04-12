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

export const Database = {
    getDefaultGearId()
    {
        return DatabaseApi?.dbGet(KeyDefaultGearId)?.data ?? null
    },
    getDefaultGear()
    {
        const defaultGearId = DatabaseApi?.getDefaultGearId()
        return DatabaseApi?.selectGear(defaultGearId) ?? null
    },
    setDefaultGearId(gearId)
    {},
    insertGear()
    {
    },
    deleteGear(gearId)
    {
        return DatabaseApi?.dbRemove(gearId) ?? null
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
        return DatabaseApi?.dbGet(gearId)?.data ?? null
    },
    selectGears()
    {
        return DatabaseApi?.dbGetAll(PrefGearId) ?? null
    },
}
