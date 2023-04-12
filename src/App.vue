
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
	<div class="fill">

		<div id="panel-operation" class="center-align">

			<button class="extend square black-text bold"
			        data-ui="#modal-about"
			        style="background-color: #18b1d2">
				<Icon :size="42"/>
				<span>𫟼齿轮</span>
			</button>

			<button class="extend square bold indigo"
			        data-ui="#modal-add-gear">
				<i>add</i>
				<span>添加搜索引擎</span>
			</button>

			<button class="extend square bold tertiary"
			        data-ui="#modal-reset-config">
				<i>settings_backup_restore</i>
				<span>重置设置</span>
			</button>
		</div>

		<div class="modal active" id="modal-about">
			<h5>𫟼齿轮</h5>
			<div class="space"></div>
			<div>
				<button class="small secondary">
					<i>upload</i>
					导出配置
				</button>
				<button class="small secondary">
					<i>download</i>
					导入配置
				</button>
			</div>
			<div class="space"></div>
			<div class="divider"></div>
			<div class="space"></div>
			<div class="center-align">
				<div class="row">
					<div class="min right-align" style="width: 96px">
						<Icon size="48"/>
					</div>
					<div class="max left-align">
						<div>
							Darmstadtium Gear
						</div>
						<div>
							v 1.0.0
						</div>
						<div>
							by Firok
						</div>
					</div>
				</div>
				<div class="tiny-space"></div>
				<div>
					<a href="https://github.com/FirokOtaku/DarmstadtiumGear"
					   @click.prevent="void(0)"
					   class="link">
						open source on GitHub&ensp;<i class="tiny">open_in_new</i>
					</a>
				</div>
			</div>
		</div>

		<div class="modal" id="modal-add-gear">
			<h5>添加搜索引擎</h5>

			<div class="field label border">
				<input type="text">
				<label>名称</label>
				<span class="helper">如 "Google"</span>
			</div>
			<div class="field label border">
				<input type="text">
				<label>URL 模式</label>
				<span class="helper">如 "https://www.google.com/search?q={KEYWORD}"</span>
			</div>

			<nav class="right-align">
				<button data-ui="#modal-add-gear">确定</button>
			</nav>
		</div>

		<div class="modal" id="modal-reset-config">
			<h5>重置所有设置</h5>
			<div>此操作无法还原</div>
			<nav class="right-align">
				<button class="error">重置!</button>
			</nav>
		</div>

		<main class="responsive">

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

		</main>


		<div v-if="true">
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

import {onMounted, ref, markRaw} from 'vue'
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

// const utools = null ?? {
// 	onPluginEnter() {},
// 	shellOpenExternal() {},
// 	outPlugin() {},
// }

onMounted(() => {

	try
	{
		utools?.onPluginEnter(({code, payload}) => {
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
	}
	catch (any)
	{
		console.error('没有运行在 utools 环境', any)
	}
})

</script>

