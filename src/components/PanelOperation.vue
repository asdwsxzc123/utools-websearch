
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
		<button class="square bold indigo small-elevate"
		        data-ui="#modal-gear-editor"
		        @click="emit('click-add-gear')">
			<i>add</i>
		</button>
	</div>
</template>

<script setup>
const emits = defineEmits([
	'click-about',
	'click-add-gear',
	'click-reset-config',
])
function emit(event) { emits(event) }
</script>
