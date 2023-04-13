
<style scoped>
#panel-operation
{
	position: absolute;
	bottom: 16px;
	left: 0;
	width: 100%;
}
</style>

<template>
	<div id="panel-operation" class="center-align">
		<button class="extend square black-text bold"
		        data-ui="#modal-about"
		        @click="emit('click-about')"
		        style="background-color: #18b1d2">
			<Icon :size="42"/>
			<span>𫟼齿轮</span>
		</button>

		<button class="extend square bold indigo"
		        data-ui="#modal-gear-editor"
		        @click="emit('click-add-gear')">
			<i>add</i>
			<span>添加搜索引擎</span>
		</button>
	</div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
const emits = defineEmits([
	'click-about',
	'click-add-gear',
	'click-reset-config',
])
function emit(event) { emits(event) }
</script>
