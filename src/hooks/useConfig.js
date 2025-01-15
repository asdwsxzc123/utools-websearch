import { Database, Fs } from '@/components/context'

export function useConfig({ config, configUpdateSet, toast }) {
	function importConfig(json) {
		const defaultGearId = json.defaultGearId ?? ''
		const listGear = []
		if (json.listGear[Symbol.iterator])
			for (const { id, name, url } of json.listGear) {
				if (id == null || name == null || url == null) continue
				listGear.push({ id, name, url })
			}
		config.value.data = { defaultGearId, listGear }
		configUpdateSet()
	}
	function clickImportConfig() {
		try {
			const path = Fs.showOpenDialog({
				title: '导入配置',
				defaultPath: Fs.pathDefault,
				filters: [{ name: 'JSON 配置文件', extensions: ['json'] }],
			})
			if (path == null || path.length <= 0 || path[0].trim().length <= 0) return
			const raw = Fs.readFile(path[0], { encoding: 'utf8' })

			const configRaw = JSON.parse(raw)
			importConfig(configRaw)
			toast({ icon: 'check', msg: '读取配置完成', color: 'green' })
		} catch (any) {
			toast({ icon: 'warning', msg: '读取配置错误' + any, color: 'orange' })
		}
	}
	function clickExportConfig() {
		const path = Fs.showSaveDialog({
			title: '导出配置',
			defaultPath: Fs.pathDefault,
			filters: [{ name: 'JSON 配置文件', extensions: ['json'] }],
		})
		if (path == null || path.trim().length <= 0) return
		try {
			if (Fs.existFile(path)) Fs.deleteFile(path)
			const config = Database.getConfig().data
			Fs.writeFile(path, JSON.stringify(config, null, 2), { encoding: 'utf8' })
			toast({ icon: 'check', msg: '导出配置完成', color: 'green' })
		} catch (any) {
			toast({ icon: 'warning', msg: '导出配置错误' + any, color: 'orange' })
		}
	}
	function clickResetConfig() {
		Database.clear()
		Database.init()
		config.value = Database.getConfig()
		toast({ icon: 'check', msg: '重置配置完成', color: 'green' })
	}
	return {
		clickResetConfig,
		clickImportConfig,
		clickExportConfig,
	}
}
