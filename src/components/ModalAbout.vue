
<style scoped>
</style>

<template>
	<div class="modal large center-align"
	     style="height: 280px; min-height: 280px;" id="modal-about">
		<h5>𫟼齿轮</h5>
		<div class="space"></div>
		<div class="large-text">插件配置</div>
		<div class="small-space"></div>
		<div>
			<button class="small no-margin secondary" @click="configExport()">
				<i>upload</i>
				导出
			</button>
			<button class="small secondary" @click="configImport()">
				<i>download</i>
				导入
			</button>
			<button class="small no-margin tertiary"
			        data-ui="#modal-reset-config">
				<i>settings_backup_restore</i>
				重置
			</button>
		</div>
		<div class="space"></div>
		<div class="divider"></div>
		<div class="space"></div>
		<div style="display: flex" class="center-align">
			<Icon size="48" style="margin: 0 16px"/>
			<div class="left-align">
				<div>
					Darmstadtium Gear
				</div>
				<div>
					v {{ AppVersion }}
				</div>
				<div>
					by Firok
				</div>
			</div>
		</div>
		<div class="tiny-space"></div>
		<div>
			<a :href="AppHomepage"
			   @click.prevent="goGithub()"
			   class="link">
				open source on GitHub&ensp;<i class="tiny">open_in_new</i>
			</a>
		</div>
	</div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import {isUtoolsContext, AppVersion, AppHomepage, Utools, } from "@/components/context";

const emits = defineEmits([
	'click-import',
	'click-export',
])

function configImport()
{
	emits('click-import')
}
function configExport()
{
	emits('click-export')
}

function goGithub()
{
	Utools.shellOpenExternal(AppHomepage)
}
</script>
