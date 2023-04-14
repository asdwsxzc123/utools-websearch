
<style scoped>
</style>

<template>
	<div class="modal" id="modal-reset-config">
		<h5>重置所有设置</h5>
		<div>将插件配置还原为初始状态</div>
		<div class="deep-orange-text">此操作无法还原</div>
		<nav class="right-align">
			<button class="error"
			        data-ui="#modal-reset-config"
			        @click="configReset()">
				重置!
			</button>
		</nav>
	</div>
</template>

<script setup>

const emits = defineEmits([
	'click-reset-config',
])

function configReset()
{
	emits('click-reset-config')
}
</script>
