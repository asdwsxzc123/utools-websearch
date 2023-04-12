
<style scoped>
</style>

<template>
	<div class="modal large" id="modal-add-gear">
		<h5>{{method === 'edit' ? '编辑搜索引擎' : '添加搜索引擎'}}</h5>

		<div class="field label border">
			<input type="text" v-model="inGearName">
			<label>名称</label>
			<span class="helper">如 "Google"</span>
		</div>
		<div class="field label border">
			<input type="text" v-model="inGearUrl">
			<label>URL 模式</label>
			<span class="helper">如 "https://www.google.com/search?q={KEYWORD}"</span>
		</div>

		<nav class="right-align">
			<button data-ui="#modal-add-gear"
			        @click="confirmClick">确定</button>
		</nav>
	</div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue'
import {isUtoolsContext, AppVersion, Database, Utools, } from "@/components/context";

const props = defineProps({
	method: { type: String, default: 'edit' },
	gearName: { type: String, default: '' },
	gearUrl: { type: String, default: '' },
})
const emits = defineEmits([
		'click-confirm'
])

const inGearName = ref(props.gearName)
const inGearUrl = ref(props.gearUrl)
function confirmClick()
{
	emits('click-confirm')
}

</script>
