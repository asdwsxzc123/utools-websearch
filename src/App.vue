<style scoped></style>

<template>
	<div class="transparent" v-if="UtoolsCode === 'search-by-default'"></div>
	<div
		class="fill"
		v-else-if="!isUtoolsContext || UtoolsCode === 'search-config'"
	>
		<ModalAbout
			ModalResetConfig
			@click-reset-config="clickResetConfig()"
			@click-import="clickImportConfig()"
			@click-export="clickExportConfig()"
		/>

		<ModalGearEditor
			:editor-method="editorMethod"
			:gear-id="editorGearId"
			ref="refModalGearEditor"
			@click-confirm="onGearEditorConfirm($event)"
			@click-add="clickAddGear()"
		/>

		<!-- config -->
		<main class="responsive">
			<TableGear
				:list-gear="config.data.listGear"
				:default-gear-id="config.data.defaultGearId"
				@click-edit-gear="clickEditGear($event)"
				@click-mark-default-gear="clickMarkDefaultGear($event)"
				@click-delete-gear="clickDeleteGear($event)"
			/>
		</main>
	</div>
	<!-- tip -->
	<div class="fill" v-else-if="!isUtoolsContext || UtoolsCode === 'search-tip'">
		<main class="responsive">
			<TableGear
				:list-gear="config.data.listGear"
				:is-tip="true"
				:default-gear-id="config.data.defaultGearId"
				@click-edit-gear="clickEditGear($event)"
				@click-mark-default-gear="clickMarkDefaultGear($event)"
				@click-delete-gear="clickDeleteGear($event)"
				@click-tip-gear="onClickTipGear($event)"
				@click-move-gear="clickMoveGear($event)"
			/>
		</main>
	</div>
	<div
		class="toast"
		:class="toastColor + ' ' + (toastActive ? 'active' : '')"
		id="panel-toast"
		@click="toastActive = false"
	>
		<i v-if="toastIcon.length">{{ toastIcon }}</i>
		<span>{{ toastMsg }}</span>
	</div>
</template>

<script setup>
import { Database, isUtoolsContext, Utools } from '@/components/context'
import { QUERY_KEY } from '@/constant/index.js'
import { useConfig } from '@/hooks/useConfig.js'
import { useToast } from '@/hooks/useToast.js'
import { useTools } from '@/hooks/useTools.js'
import { defineAsyncComponent, onMounted, ref, toRaw } from 'vue'
const { toast, toastMsg, toastIcon, toastColor, toastActive } = useToast()
const ModalAbout = defineAsyncComponent(
	() => import('@/components/ModalAbout.vue'),
)
const ModalGearEditor = defineAsyncComponent(
	() => import('@/components/ModalGearEditor.vue'),
)
const TableGear = defineAsyncComponent(
	() => import('@/components/TableGear.vue'),
)
const searchKeyMap = ref({})
const {
	config,
	UtoolsCode,
	inputValue,
	UtoolsPayload,
	configUpdateSet,
	editorGearId,
	editorMethod,
	refModalGearEditor,
	clickEditGear,
	clickAddGear,
	clickDeleteGear,
	clickMarkDefaultGear,
} = useTools(Database)
const { clickResetConfig, clickImportConfig, clickExportConfig } = useConfig({
	config,
	configUpdateSet,
	toast,
})

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
function clickMoveGear({ index, type }) {
	const isDown = type === 'down'
	// const isUp = type === 'up'
	const listGear = config.value.data.listGear
	const len = listGear.length
	if (isDown) {
		if (index !== len - 1)
			[listGear[index + 1], listGear[index]] = [
				listGear[index],
				listGear[index + 1],
			]
	} else {
		if (index !== 0)
			[listGear[index - 1], listGear[index]] = [
				listGear[index],
				listGear[index - 1],
			]
	}
	configUpdateSet()
}
/** 添加跳转tips */
function onClickTipGear(gear) {
	const gearName = gear.name
	toWebSite(toRaw(searchKeyMap.value)[gearName]?.url)
}
/**
 *
 * @param url 地址
 */
function toWebSite(url) {
	if (!url) return
	const regex = new RegExp(`{${QUERY_KEY}}`, 'g')
	Utools.shellOpenExternal(url.replace(regex, inputValue.value))
	Utools.outPlugin()
}

/**
 * 监听keydown,用于选择tips的引擎打开或者直接使用默认引擎
 * @param e
 */
function onKeyDown(e) {
	// 需要减1
	const num = Number(e.key)
	if (e.ctrlKey && !isNaN(num)) {
		const list = getListGear()
		toWebSite(list[num - 1]?.url)
	}
	// 支持直接使用默认引擎
	if (e.key === 'Enter') {
		const { defaultGearId, listGear } = config.value.data
		const item = listGear.find((i) => i.id === defaultGearId)
		toWebSite(item.url)
	}
}

function onEnterSearchTip() {
	// 显示
	utools?.setSubInput(({ text }) => {
		inputValue.value = text
	}, '输入query的内容,然后选择引擎')

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
		const { defaultGearId, listGear } = config.value.data
		const map = listGear.reduce((total, cur, index) => {
			return {
				...total,
				[cur.id]: cur,
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
						Utools.shellOpenExternal(
							item.url.replace(/{KEYWORD}/g, keys.slice(1).join(':').trim()),
						)
					} else {
						Utools.shellOpenExternal(
							defaultSearch.url.replace(/{KEYWORD}/g, payload),
						)
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
				Utools.outPlugin()
				break
		}
	})
	utools.onPluginOut(() => {
		document.removeEventListener('keydown', onKeyDown)
	})
})
</script>
