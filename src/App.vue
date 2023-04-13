
<style scoped>


</style>

<template>
	<div class="transparent" v-if="UtoolsCode === 'search-by-default'"></div>
	<div class="fill" v-else-if="!isUtoolsContext || UtoolsCode === 'search-config'">
		<PanelOperation @click-add-gear="clickAddGear()"/>

		<ModalAbout @click-import="clickImportConfig()"
		            @click-export="clickExportConfig()"/>

		<ModalGearEditor :editor-method="editorMethod"
		                 :gear-id="editorGearId"
		                 ref="refModalGearEditor"
		                 @click-confirm="onGearEditorConfirm($event)"/>
		<ModalResetConfig @click-reset-config="clickResetConfig()"/>

		<main class="responsive">
			<TableGear :list-gear="config.data.listGear"
			           :default-gear-id="config.data.defaultGearId"
			           @click-edit-gear="clickEditGear($event)"
			           @click-mark-default-gear="clickMarkDefaultGear($event)"
			           @click-delete-gear="clickDeleteGear($event)"/>
		</main>

		<div v-if="EnableDebug">
			<div class="bold">
				debug panel
			</div>
			<div>
				code {{ UtoolsCode }}
			</div>
			<div>
				payload {{ UtoolsPayload }}
			</div>
			<div>
				isutools {{ isUtoolsContext }}
			</div>
		</div>
	</div>
</template>

<script setup>

import {onMounted, ref, markRaw, toRaw} from 'vue'
import {isUtoolsContext, AppVersion, EnableDebug, Database, Utools, Fs } from "@/components/context";
const { outPlugin, onPluginEnter, shellOpenExternal, } = Utools
import PanelOperation from "@/components/PanelOperation.vue";
import ModalAbout from "@/components/ModalAbout.vue";
import ModalGearEditor from "@/components/ModalGearEditor.vue";
import ModalResetConfig from "@/components/ModalResetConfig.vue";
import TableGear from "@/components/TableGear.vue";

Database.init()
const config = ref(Database.getConfig())

const UtoolsCode = ref('')
const UtoolsPayload = ref('')

function clickDeleteGear(gear)
{
	const defaultGearId = config.value.data.defaultGearId
	const listGear = config.value.data.listGear
	const gearId = gear.id
	for(let step = 0; step < listGear.length; step++)
	{
		if(listGear[step].id === gearId)
		{
			listGear.splice(step, 1)
			break
		}
	}
	if(gearId === defaultGearId)
		config.value.data.defaultGearId = listGear.length > 0 ? listGear[0].id : ''
	const temp = toRaw(config.value)
	Database.setConfig(toRaw(config.value))
}
function clickMarkDefaultGear(gear)
{
	const gearId = gear.id
	config.value.data.defaultGearId = gearId
	Database.setConfig(toRaw(config.value))
}

const editorGearId = ref('')
const refModalGearEditor = ref()
function clickEditGear(gear)
{
	editorMethod.value = 'edit'
	editorGearId.value = gear.id
	refModalGearEditor.value.gearName = gear.name
	refModalGearEditor.value.gearUrl = gear.url
}
const editorMethod = ref('')
function clickAddGear()
{
	editorMethod.value = 'add'
	editorGearId.value = ''
	refModalGearEditor.value.gearName = ''
	refModalGearEditor.value.gearUrl = ''
}
function onGearEditorConfirm(param)
{
	const { method, id, name, url } = param
	const listGear = config.value.data.listGear
	switch(method)
	{
		case 'add':
			listGear.push({
				id: 'ugc-' + Math.random() + '-' + new Date().getTime(),
				name,
				url,
			})
			break
		case 'edit':
			for(let gear of listGear)
			{
				if(gear.id === id)
				{
					gear.name = name
					gear.url = url
				}
			}
			Database.setConfig(toRaw(config.value))
			break
	}
}

function clickImportConfig()
{
	const path = Fs.showOpenDialog({
		title: '导入配置',
		defaultPath: Fs.pathDefault,
		filters: [ { name: 'JSON 配置文件', extensions: ['json'] } ],
	})
	if(path == null || path.trim().length <= 0) return
	const raw = Fs.readFile(path, { encoding: 'utf8' })
	try
	{
		const configRaw = JSON.parse(raw)
		const defaultGearId = configRaw.defaultGearId ?? ''
		const listGear = []
		if(configRaw.listGear[Symbol.iterator]) for(const { id, name, url } of configRaw.listGear)
		{
			if(id == null || name == null || url == null) continue
			listGear.push({ id, name, url, })
		}
		config.value.defaultGearId = defaultGearId
		config.value.listGear = listGear
		Database.setConfig(toRaw(config.value))
	}
	catch (any)
	{
		console.error('读取配置错误', any)
	}
}
function clickExportConfig()
{
	const path = Fs.showSaveDialog({
		title: '导出配置',
		defaultPath: Fs.pathDefault,
		filters: [ { name: 'JSON 配置文件', extensions: ['json'] } ],
	})
	if(path == null || path.trim().length <= 0) return
	const config = Database.getConfig()
	Fs.writeFile(path, JSON.stringify(config, null, 2), { encoding: 'utf8' })
}
function clickResetConfig()
{
	Database.clear()
	Database.init()
	config.value = Database.getConfig()
}

onMounted(() => {

	Utools?.onPluginEnter(({code, payload}) => {
		UtoolsCode.value = code
		UtoolsPayload.value = payload

		switch (code)
		{
			case 'search-by-default':
				const { defaultGearId, listGear, } = config.value.data
				if(defaultGearId !== '')
				{
					for(const { id, url, } of listGear)
					{
						if(id === defaultGearId)
						{
							Utools.shellOpenExternal(url.replace(/{KEYWORD}/g, payload))
							break
						}
					}
				}
				Utools.outPlugin()
				break

			// case 'search-by-select':
			// 	// 显示
			// 	break

			case 'search-config':
				break

			default:
				console.log('未知启动模式, 尝试关闭窗口')
				outPlugin()
				break
		}
	})
})

</script>

