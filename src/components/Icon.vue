<style scoped>

</style>

<template>
	<img class="ds-icon"
	     src="/logo.svg"
	     style="animation: glowing 4s infinite, rotate 28s infinite linear;"
	     alt="icon" :style="styleIcon">
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
	size: { type: [Number, String], default: 48 }
})
const styleIcon = computed(() => {
	return {
		width: props.size + 'px',
		height: props.size + 'px',
	}
})

</script>
