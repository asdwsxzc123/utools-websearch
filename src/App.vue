
<style scoped>

</style>

<template>
	<div class="fill">


		<main class="responsive">
			<header class="blur ">
				<nav>
					<span class="circle transparent">
						<Icon :size="42"/>
					</span>

					<h5 class="max">𫟼齿轮</h5>

					<button class="circle transparent">
						<i>add</i>
						<span class="tooltip left">添加搜索引擎</span>
					</button>
				</nav>
			</header>

			<table class="border">
				<tbody>
				<tr v-for="gear in listGear">
					<td>
						{{ gear.name }}
					</td>
					<td class="right-align">
						<button class="circle transparent medium-margin no-wave " v-if="gear.isDefault">
							<i class="green-text">done_all</i>
							<span class="tooltip top">默认搜索引擎</span>
						</button>

						<button class="circle transparent medium-margin" v-else>
							<i>check</i>
							<span class="tooltip top">设为默认</span>
						</button>

						<button class="circle transparent medium-margin">
							<i>delete</i>
							<span class="tooltip top">删除</span>
						</button>
					</td>
				</tr>
				</tbody>
			</table>

		</main>


		<div v-if="false">
			<div>
				code {{ UtoolsCode }}
			</div>
			<div>
				payload {{ UtoolsPayload }}
			</div>
		</div>
	</div>
</template>

<script setup>

import {onMounted, ref} from 'vue'
import Icon from "@/components/Icon.vue";

const UtoolsCode = ref('')
const UtoolsPayload = ref('')

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

onMounted(() => {

	utools.onPluginEnter(({code, payload}) => {
		UtoolsCode.value = code
		UtoolsPayload.value = payload

		switch (code)
		{
			case 'search-by-default':
				const url = 'https://www.google.com/search?q=' + payload
				utools.shellOpenExternal(url)
				utools.outPlugin()
				break

			case 'search-by-select':
				// 显示
				break

			default:
				console.log('错误的类型, 忽略')
				break
		}
	})
})

</script>

