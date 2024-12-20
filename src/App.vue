<style scoped></style>

<template>
	<div class="transparent" v-if="UtoolsCode === 'search-by-default'"></div>
	<div class="fill" v-else-if="!isUtoolsContext || UtoolsCode === 'search-config'">
		<PanelOperation @click-add-gear="clickAddGear()" />

		<ModalAbout @click-import="clickImportConfig()" @click-export="clickExportConfig()" />

		<ModalGearEditor :editor-method="editorMethod" :gear-id="editorGearId" ref="refModalGearEditor"
			@click-confirm="onGearEditorConfirm($event)" />
		<ModalResetConfig @click-reset-config="clickResetConfig()" />

		<main class="responsive">
			<TableGear :list-gear="config.data.listGear" :default-gear-id="config.data.defaultGearId"
				@click-edit-gear="clickEditGear($event)" @click-mark-default-gear="clickMarkDefaultGear($event)"
				@click-delete-gear="clickDeleteGear($event)" />
		</main>
	</div>
	<!-- <div class="fill"> -->
	<div class="fill" v-else-if="!isUtoolsContext || UtoolsCode === 'search-tip'">
		<main class="responsive">
			<TableGear :list-gear="config.data.listGear" :is-tip="true" :default-gear-id="config.data.defaultGearId"
				@click-edit-gear="clickEditGear($event)" @click-mark-default-gear="clickMarkDefaultGear($event)"
				@click-delete-gear="clickDeleteGear($event)" @click-tip-gear="onClickTipGear($event)" />
		</main>
	</div>
	<div class="toast" :class="toastColor + ' ' + (toastActive ? 'active' : '')" id="panel-toast"
		@click="toastActive = false">
		<i v-if="toastIcon.length">{{ toastIcon }}</i>
		<span>{{ toastMsg }}</span>
	</div>
</template>

<script setup>

import { onMounted, ref, markRaw, toRaw, defineAsyncComponent } from 'vue'
import { isUtoolsContext, AppVersion, EnableDebug, Database, Utools, Fs } from "@/components/context";
const { outPlugin, onPluginEnter, shellOpenExternal, } = Utools
const PanelOperation = defineAsyncComponent(() => import("@/components/PanelOperation.vue"))
const ModalAbout = defineAsyncComponent(() => import("@/components/ModalAbout.vue"))
const ModalGearEditor = defineAsyncComponent(() => import("@/components/ModalGearEditor.vue"))
const ModalResetConfig = defineAsyncComponent(() => import("@/components/ModalResetConfig.vue"))
const TableGear = defineAsyncComponent(() => import("@/components/TableGear.vue"))

Database.init()
const config = ref(Database.getConfig())

const UtoolsCode = ref('')
const inputValue = ref('')
const UtoolsPayload = ref('')
const searchKeyMap = ref({})

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
function onClickTipGear(gear) {
	const gearName = gear.name
	toWebSite(toRaw(searchKeyMap.value)[gearName]?.url, gearName)
}
function clickMarkDefaultGear(gear) {
	config.value.data.defaultGearId = gear.id
	configUpdateSet()
}

const editorGearId = ref('')
const refModalGearEditor = ref()
function clickEditGear(gear) {
	editorMethod.value = 'edit'
	editorGearId.value = gear.id
	refModalGearEditor.value.gearName = gear.name
	refModalGearEditor.value.gearUrl = gear.url
}
const editorMethod = ref('')
function clickAddGear() {
	editorMethod.value = 'add'
	editorGearId.value = ''
	refModalGearEditor.value.gearName = ''
	refModalGearEditor.value.gearUrl = ''
}
function onGearEditorConfirm(param) {
	const { method, id, name, url } = param
	const listGear = config.value.data.listGear
	const hasName = listGear.find(i => i.name === name)
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

const toastMsg = ref('')
const toastIcon = ref('')
const toastColor = ref('')
const toastActive = ref(false)
function toast({ icon = '', msg = '', color = '', timeout = 6000 }) {
	toastIcon.value = icon
	toastMsg.value = msg
	toastColor.value = color
	toastActive.value = true
	setTimeout(() => {
		toastActive.value = false
	}, timeout)
}

function importConfig(json) {
	const defaultGearId = json.defaultGearId ?? ''
	const listGear = []
	if (json.listGear[Symbol.iterator]) for (const { id, name, url } of json.listGear) {
		if (id == null || name == null || url == null) continue
		listGear.push({ id, name, url, })
	}
	config.value.data = { defaultGearId, listGear, }
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
	}
	catch (any) {
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
	}
	catch (any) {
		toast({ icon: 'warning', msg: '导出配置错误' + any, color: 'orange' })
	}
}
function clickResetConfig() {
	Database.clear()
	Database.init()
	config.value = Database.getConfig()
	toast({ icon: 'check', msg: '重置配置完成', color: 'green' })
}
function getSubInputValue() {
	return utools?.getSubInputValue?.()
}
/**
 *
 * @param url 地址
 * @param payload 值
 */
function toWebSite(url, payload) {
	if (!url) return
	Utools.shellOpenExternal(url.replace(/{KEYWORD}/g, payload))
	Utools.outPlugin()
}

function onKeyDown(e) {
	// 需要减1
	const num = Number(e.key)
	if (e.ctrlKey && !isNaN(num)) {
		const value = getSubInputValue()
		const list = getListGear()
		toWebSite(list[num - 1]?.url, inputValue.value)
	}
}
function onEnterSearchTip() {
	// 显示
	utools?.setSubInput(({ text }) => {
		inputValue.value = text
	}, '输入KEYWORD,然后选择引擎');

	document.addEventListener('keydown', onKeyDown)

}
function getListGear() {
	return [...config.value.data?.listGear]
}
onMounted(() => {
	onEnterSearchTip()
	Utools?.onPluginEnter(({ code, payload }) => {
		UtoolsCode.value = code
		UtoolsPayload.value = payload
		const { defaultGearId, listGear, } = config.value.data
		const map = listGear.reduce((total, cur, index) => {
			return {
				...total,
				[cur.id]: cur
			}
		}, {})
		searchKeyMap.value = map
		switch (code) {
			case 'search-by-default':
				if (defaultGearId !== '') {
					const defaultSearch = map[defaultGearId]
					const keys = payload.split(':')
					const key = keys[0]
					const item = map[key]
					if (item) {
						Utools.shellOpenExternal(item.url.replace(/{KEYWORD}/g, keys.slice(1).join(':').trim()))
					} else {
						Utools.shellOpenExternal(defaultSearch.url.replace(/{KEYWORD}/g, payload))
					}
				}
				Utools.outPlugin()
				break

			case 'search-tip':
				onEnterSearchTip()
				break

			case 'search-config':
				break

			default:
				console.log('未知启动模式, 尝试关闭窗口')
				outPlugin()
				break
		}
	})
	utools.onPluginOut(() => {
		document.removeEventListener('keydown', onKeyDown)
	})
})

</script>
