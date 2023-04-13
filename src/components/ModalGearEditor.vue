
<style scoped>
</style>

<template>
	<div class="modal large" id="modal-gear-editor">
		<h5>{{editorMethod === 'edit' ? '编辑搜索引擎' : '添加搜索引擎'}}</h5>

		<div class="field label border">
			<input type="text" v-model="gearName">
			<label>名称</label>
			<span class="helper">如 "Google"</span>
		</div>
		<div class="field label border">
			<input type="text" v-model="gearUrl">
			<label>URL 模式</label>
			<span class="helper">如 "https://www.google.com/search?q={KEYWORD}"</span>
		</div>

		<nav class="right-align">
			<button data-ui="#modal-gear-editor"
			        @click="confirmClick">确定</button>
		</nav>
	</div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue'

const props = defineProps({
	editorMethod: { type: String, default: 'edit' },
	gearId: { type: String, required: false },
})
const emits = defineEmits([
		'click-confirm'
])

const gearName = ref('')
const gearUrl = ref('')
function confirmClick()
{
	const method = props.editorMethod
	const param = {
		method,
		id: method === 'edit' ? props.gearId : '',
		name: gearName.value,
		url: gearUrl.value,
	}
	emits('click-confirm', param)
}

defineExpose({ gearName, gearUrl, })

</script>
