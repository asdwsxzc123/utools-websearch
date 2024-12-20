<style scoped></style>

<template>
	<table class="border">
		<tbody>
			<tr v-for="gear, index in listGear" :key="gear.id" @click="isTip ? clickTipGear(gear) : null">
				<td>
					{{ index + 1 }}: {{ gear.name }}
				</td>
				<td class="right-align" v-if="!isTip">
					<button class="circle transparent  no-wave" v-if="gear.id === defaultGearId">
						<i class="green-text">done_all</i>
						<span class="tooltip fade tiny-gap">默认搜索引擎</span>
					</button>

					<button class="circle transparent " v-else @click="clickMarkDefaultGear(gear)">
						<i>check</i>
						<span class="tooltip fade tiny-gap">设为默认</span>
					</button>

					<button class="circle transparent " data-ui="#modal-gear-editor" @click="clickEditGear(gear)">
						<i class="blue-grey-text">edit</i>
						<span class="tooltip fade tiny-gap">编辑</span>
					</button>

					<button class="circle transparent " @click="clickDeleteGear(gear)">
						<i class=" red-text">delete</i>
						<span class="tooltip fade tiny-gap">删除</span>
					</button>
				</td>
				<td class="right-align" v-if="isTip">
					<button class="circle transparent " @click.stop="clickMoveGear({ gear, index, type: 'up' })">
						<i class=" blue-grey-text">^</i>
						<span class="tooltip fade tiny-gap">上移</span>
					</button>
					<button class="circle transparent " @click.stop="clickMoveGear({ gear, index, type: 'down' })">
						<i class=" blue-grey-text" style="transform: rotate(180deg);">^</i>
						<span class="tooltip fade tiny-gap">下移</span>
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
	isTip: { type: Boolean, default: false }
})

const emits = defineEmits([
	'click-edit-gear',
	'click-tip-gear',
	'click-delete-gear',
	'click-mark-default-gear',
])
function clickEditGear(gear) { emits('click-edit-gear', gear) }
function clickDeleteGear(gear) { emits('click-delete-gear', gear) }
function clickMoveGear(obj) { emits('click-move-gear', obj) }
function clickTipGear(gear) {
	emits('click-tip-gear', gear)
}
function clickMarkDefaultGear(gear) {
	emits('click-mark-default-gear', gear)
}

</script>
