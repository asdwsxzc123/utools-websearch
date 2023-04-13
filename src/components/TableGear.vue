
<style scoped>

</style>

<template>
	<table class="border">
		<tbody>
		<tr v-for="gear in listGear">
			<td>
				{{ gear.name }}
			</td>
			<td class="right-align">
				<button class="circle transparent medium-margin no-wave " v-if="gear.id === defaultGearId">
					<i class="green-text">done_all</i>
					<span class="tooltip fade tiny-gap">默认搜索引擎</span>
				</button>

				<button class="circle transparent medium-margin"
				        v-else
				        @click="clickMarkDefaultGear(gear)">
					<i>check</i>
					<span class="tooltip fade tiny-gap">设为默认</span>
				</button>

				<button class="circle transparent medium-margin"
				        data-ui="#modal-gear-editor"
				        @click="clickEditGear(gear)">
					<i class="blue-grey-text">edit</i>
					<span class="tooltip fade tiny-gap">编辑</span>
				</button>

				<button class="circle transparent medium-margin"
				        @click="clickDeleteGear(gear)">
					<i class=" red-text">delete</i>
					<span class="tooltip fade tiny-gap">删除</span>
				</button>
			</td>
		</tr>
		</tbody>
	</table>
</template>

<script setup>

const props = defineProps({
	listGear: { type: Array, default: () => [] },
	defaultGearId: { type: String, default: '' },
})

const emits = defineEmits([
	'click-edit-gear',
	'click-delete-gear',
	'click-mark-default-gear',
])
function clickEditGear(gear) { emits('click-edit-gear', gear) }
function clickDeleteGear(gear) { emits('click-delete-gear', gear) }
function clickMarkDefaultGear(gear) { emits('click-mark-default-gear', gear) }

</script>
