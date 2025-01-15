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
import { useTips } from '@/hooks/useTips.js'
import { useToast } from '@/hooks/useToast.js'
import { useTools } from '@/hooks/useTools.js'
import { defineAsyncComponent, onMounted } from 'vue'
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
const {
	config,
	UtoolsCode,
	UtoolsPayload,
	configUpdateSet,
	editorGearId,
	editorMethod,
	refModalGearEditor,
	clickEditGear,
	clickAddGear,
	clickDeleteGear,
	clickMarkDefaultGear,
	onGearEditorConfirm,
} = useTools(Database)
const { clickResetConfig, clickImportConfig, clickExportConfig } = useConfig({
	config,
	configUpdateSet,
	toast,
})
const {
	searchKeyMap,
	onEnterSearchTip,
	clickMoveGear,
	onClickTipGear,
	onKeyDown,
} = useTips({ config, configUpdateSet })

onMounted(() => {
	onEnterSearchTip()
	Utools?.onPluginEnter(({ code, payload }) => {
		UtoolsCode.value = code
		UtoolsPayload.value = payload
		const { defaultGearId, listGear } = config.value.data
		const map = listGear.reduce((total, cur) => {
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
					const regex = new RegExp(`{${QUERY_KEY}}`, 'g')
					// TODO: 使用冒号分割的方式不好用,基本废弃
					const keys = payload.split(':')
					const key = keys[0]
					const item = map[key]
					if (item) {
						Utools.shellOpenExternal(
							item.url.replace(regex, keys.slice(1).join(':').trim()),
						)
					} else {
						Utools.shellOpenExternal(defaultSearch.url.replace(regex, payload))
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
	window.utools.onPluginOut(() => {
		document.removeEventListener('keydown', onKeyDown)
	})
})
</script>
