import { ref, toRaw } from 'vue'

/**
 * config增删改查
 * @param {*} Database
 * @returns
 */
export function useTools(Database) {
	Database.init()
	const config = ref(Database.getConfig())
	const UtoolsCode = ref('')
	const UtoolsPayload = ref('')
	const editorGearId = ref('')
	const editorMethod = ref('')
	const refModalGearEditor = ref()
	function clickEditGear(gear) {
		editorMethod.value = 'edit'
		editorGearId.value = gear.id
		refModalGearEditor.value.gearName = gear.name
		refModalGearEditor.value.gearUrl = gear.url
	}
	function clickAddGear() {
		editorMethod.value = 'add'
		editorGearId.value = ''
		refModalGearEditor.value.gearName = ''
		refModalGearEditor.value.gearUrl = ''
	}
	function configUpdateSet() {
		Database.setConfig(toRaw(config.value))
		config.value = Database.getConfig()
	}

	function clickDeleteGear(gear) {
		const defaultGearId = config.value.data.defaultGearId
		const listGear = config.value.data.listGear
		const gearId = gear.id
		for (let step = 0; step < listGear.length; step++) {
			if (listGear[step].id === gearId) {
				listGear.splice(step, 1)
				break
			}
		}
		if (gearId === defaultGearId)
			config.value.data.defaultGearId = listGear.length > 0 ? listGear[0].id : ''
		configUpdateSet()
	}

	function clickMarkDefaultGear(gear) {
		config.value.data.defaultGearId = gear.id
		configUpdateSet()
	}
	function onGearEditorConfirm(param) {
		const { method, id, name, url } = param
		const listGear = config.value.data.listGear
		const hasName = listGear.find((i) => i.name === name)
		if (hasName) return
		switch (method) {
			case 'add':
				listGear.push({
					id: name,
					name,
					url,
				})
				break
			case 'edit':
				for (let gear of listGear) {
					if (gear.id === id) {
						gear.name = name
						gear.url = url
					}
				}
				break
			default:
				listGear.push({
					id: name,
					name,
					url,
				})
				break
		}
		configUpdateSet()
	}
	return {
		config,
		UtoolsCode,
		UtoolsPayload,
		editorGearId,
		editorMethod,
		refModalGearEditor,
		configUpdateSet,
		clickEditGear,
		clickAddGear,
		clickDeleteGear,
		clickMarkDefaultGear,
		onGearEditorConfirm,
	}
}
