<style scoped></style>

<template>
	<div class="modal large center-align" id="modal-about">
		<!-- <h5>web search</h5> -->
		<div class="small-space"></div>
		<h4 class="large-text">插件配置</h4>
		<div class="small-space"></div>
		<div>
			<button class="small no-margin secondary small-elevate" @click="configExport()">
				<i>upload</i>
				导出
			</button>
			<button class="small secondary small-elevate" @click="configImport()">
				<i>download</i>
				导入
			</button>
			<button class="small no-margin tertiary small-elevate" data-ui="#modal-reset-config"  @click="configReset()">
				<i>settings_backup_restore</i>
				重置
			</button>
		</div>
		<div class="space"></div>
		<!-- <div class="tiny-margin">
			<a :href="AppHomepage" @click.prevent="goGithub()" class="link">
				view or submit issues on GitHub&ensp;<i class="tiny">open_in_new</i>
			</a>
		</div> -->
	</div>
</template>

<script setup>
import { AppHomepage, Utools } from "@/components/context";

const emits = defineEmits([
	'click-import',
	'click-export',
	'click-reset-config',
])

function configImport() {
	emits('click-import')
}
function configExport() {
	emits('click-export')
}
function configReset() {
	emits('click-reset-config')
}
function goGithub() {
	Utools.shellOpenExternal(AppHomepage)
}
</script>
