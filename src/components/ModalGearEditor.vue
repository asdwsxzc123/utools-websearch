<style scoped></style>

<template>
	<div class="modal large" id="modal-gear-editor" style="padding: 10px;">
		<h5>{{ editorMethod === 'edit' ? '编辑' : '添加' }}</h5>

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
		<!-- <div class="field label border">
			<input type="text" v-model="remark">
			<label>备注</label>
		</div> -->
		<nav class="right-align">
			<button class="tertiary small-elevate" @click="clickAddGear()">
				新增
			</button>
			<button class="tertiary small-elevate" @click="fillExample()">
				填充示例
			</button>
			<button data-ui="#modal-gear-editor" class="small-elevate" :disabled="isNameInvalid || isUrlInvalid"
				@click="confirmClick">保存</button>
		</nav>
	</div>
</template>

<script setup>
import { QUERY_KEY } from '@/constant/index.js'
import { computed, defineEmits, defineProps, ref } from 'vue'
const props = defineProps({
	editorMethod: { type: String, default: 'edit' },
	gearId: { type: String, required: false },
})
const emits = defineEmits([
	'click-confirm',
	'click-add'
])

const gearName = ref('')
const gearUrl = ref('')

function fillExample() {
	gearName.value = 'google'
	gearUrl.value = `https://www.google.com/search?q={${QUERY_KEY}}`
}

const isNameInvalid = computed(() => {
	const name = gearName.value.trim()
	if (name.length <= 0) return '名称不可为空'
	if (name.length >= 32) return '名称过长'
	return null
})
const isUrlInvalid = computed(() => {
	const url = gearUrl.value
	const tipKey=  `{${QUERY_KEY}}`
	try {
		new URL(url)
		if (url.indexOf(tipKey) < 0)
			return `URL 模式未包含 ${tipKey}`
		return null
	}
	catch (any) {
		return '输入内容不是 URL'
	}
})

const clickAddGear = () => {
	emits('click-add')
}

function confirmClick() {
	if (isUrlInvalid.value || isNameInvalid.value) return
	const method = props.editorMethod
	const param = {
		method,
		id: method === 'edit' ? props.gearId : '',
		name: gearName.value,
		url: gearUrl.value,
	}
	emits('click-confirm', param)
}

defineExpose({ gearName, gearUrl })

</script>
