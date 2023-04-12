
<style scoped>
</style>

<template>
	<div class="modal large active center-align" id="modal-about">
		<h5>𫟼齿轮</h5>
		<div class="space"></div>
		<div>
			<button class="small secondary" @click="configExport()">
				<i>upload</i>
				导出配置
			</button>
			<button class="small secondary" @click="configImport()">
				<i>download</i>
				导入配置
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
			<a href="https://github.com/FirokOtaku/DarmstadtiumGear"
			   @click.prevent="goGithub()"
			   class="link">
				open source on GitHub&ensp;<i class="tiny">open_in_new</i>
			</a>
		</div>
	</div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import {isUtoolsContext, AppVersion, Database, Utools, } from "@/components/context";

function configImport()
{}
function configExport()
{}

function goGithub()
{
	Utools.shellOpenExternal('https://github.com/FirokOtaku/DarmstadtiumGear')
}
</script>
