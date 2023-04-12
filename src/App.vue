
<style scoped>


</style>

<template>
	<div class="fill">
		<PanelOperation/>

		<ModalAbout/>
		<ModalGearEditor/>
		<ModalResetConfig/>

		<main class="responsive">
			<TableGear/>
		</main>
	</div>

	<div>
		<div v-if="true">
			<div>
				code {{ UtoolsCode }}
			</div>
			<div>
				payload {{ UtoolsPayload }}
			</div>
			<div>
				isutools {{ isUtoolsContext }}
			</div>
		</div>
	</div>
</template>

<script setup>

import {onMounted, ref, markRaw} from 'vue'
import {isUtoolsContext, AppVersion, Database, Utools, } from "@/components/context";
const { outPlugin, onPluginEnter, shellOpenExternal, } = Utools
import PanelOperation from "@/components/PanelOperation.vue";
import ModalAbout from "@/components/ModalAbout.vue";
import ModalGearEditor from "@/components/ModalGearEditor.vue";
import ModalResetConfig from "@/components/ModalResetConfig.vue";
import TableGear from "@/components/TableGear.vue";


const UtoolsCode = ref('')
const UtoolsPayload = ref('')

onMounted(() => {

	Utools?.onPluginEnter(({code, payload}) => {
		UtoolsCode.value = code
		UtoolsPayload.value = payload

		switch (code)
		{
			case 'search-by-default':
				const url = 'https://www.google.com/search?q=' + payload
				Utools.shellOpenExternal(url)
				Utools.outPlugin()
				break

			case 'search-by-select':
				// 显示
				break

			case 'config':
				break

			default:
				outPlugin()
				break
		}
	})
})

</script>

