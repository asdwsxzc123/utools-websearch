
<style scoped>
</style>

<template>
	<div class="modal large" id="modal-gear-editor">
		<h5>{{editorMethod === 'edit' ? '编辑搜索引擎' : '添加搜索引擎'}}</h5>

		<div class="field label border" :class="isNameInvalid ? 'invalid' : ''">
			<input type="text" v-model="gearName">
			<label>名称</label>
			<span class="helper" v-if="!isNameInvalid">名称可用</span>
			<span class="error" v-else>{{ isNameInvalid }}</span>
		</div>
		<div class="field label border" :class="isUrlInvalid ? 'invalid' : ''">
			<input type="text" v-model="gearUrl">
			<label>URL 模式</label>
			<span class="helper" v-if="!isUrlInvalid">URL 模式可用</span>
			<span class="error" v-else>{{ isUrlInvalid }}</span>
		</div>

		<nav class="right-align">
			<button class="tertiary small-elevate" @click="fillExample()">
				填充示例
			</button>
			<button data-ui="#modal-gear-editor"
			        class="small-elevate"
			        :disabled="isNameInvalid || isUrlInvalid"
			        @click="confirmClick">确定</button>
		</nav>
	</div>
</template>

<script setup>
import {defineProps, defineEmits, ref, computed} from 'vue'

const props = defineProps({
	editorMethod: { type: String, default: 'edit' },
	gearId: { type: String, required: false },
})
const emits = defineEmits([
		'click-confirm'
])

const gearName = ref('')
const gearUrl = ref('')

function fillExample()
{
	gearName.value = 'Google'
	gearUrl.value = 'https://www.google.com/search?q={KEYWORD}'
}

const isNameInvalid = computed(() => {
	const name = gearName.value.trim()
	if(name.length <= 0) return '名称不可为空'
	if(name.length >= 32) return '名称过长'
	return null
})
const isUrlInvalid = computed(() => {
	const url = gearUrl.value
	try
	{
		new URL(url)
		if(url.indexOf('{KEYWORD}') < 0)
			return 'URL 模式未包含 "{KEYWORD}"'
		return null
	}
	catch (any)
	{
		return '输入内容不是 URL'
	}
})

function confirmClick()
{
	if(isUrlInvalid.value || isNameInvalid.value) return
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
