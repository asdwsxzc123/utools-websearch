
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
				<button class="circle transparent medium-margin no-wave " v-if="gear.isDefault">
					<i class="green-text">done_all</i>
					<span class="tooltip fade tiny-gap">默认搜索引擎</span>
				</button>

				<button class="circle transparent medium-margin" v-else>
					<i>check</i>
					<span class="tooltip fade tiny-gap">设为默认</span>
				</button>

				<button class="circle transparent medium-margin">
					<i class="blue-grey-text">edit</i>
					<span class="tooltip fade tiny-gap">编辑</span>
				</button>

				<button class="circle transparent medium-margin">
					<i class=" red-text">delete</i>
					<span class="tooltip fade tiny-gap">删除</span>
				</button>
			</td>
		</tr>
		</tbody>
	</table>
</template>

<script setup>

import {ref} from "vue";

const listGear = ref([
	{
		id: 'google',
		name: 'Google',
		pattern: 'https://www.google.com/search?q={keyword}',
		isDefault: true,
	},
	{
		id: 'baidu',
		name: 'Baidu',
		pattern: 'https://www.baidu.com/search?q={keyword}',
		isDefault: false,
	},
])


</script>