import { Utools } from '@/components/context'
import { QUERY_KEY } from '@/constant/index.js'
import { ref, toRaw } from 'vue'

export function useTips({ config, configUpdateSet }) {
	const inputValue = ref('')
	const searchKeyMap = ref({})

	/**
	 * 监听keydown,用于选择tips的引擎打开或者直接使用默认引擎
	 * @param e
	 */
	function onKeyDown(e) {
		// 需要减1
		const num = Number(e.key)
		if (e.ctrlKey && !isNaN(num)) {
			const list = config.value.data?.listGear
			toWebSite(list[num - 1]?.url)
		}
		// 支持直接使用默认引擎
		if (e.key === 'Enter') {
			const { defaultGearId, listGear } = config.value.data
			const item = listGear.find((i) => i.id === defaultGearId)
			toWebSite(item.url)
		}
	}

	function onEnterSearchTip() {
		// 显示
		window.utools?.setSubInput(({ text }) => {
			inputValue.value = text
		}, '输入query的内容,然后选择引擎')

		document.addEventListener('keydown', onKeyDown)
	}

	function clickMoveGear({ index, type }) {
		const isDown = type === 'down'
		// const isUp = type === 'up'
		const listGear = config.value.data.listGear
		const len = listGear.length
		if (isDown) {
			if (index !== len - 1)
				[listGear[index + 1], listGear[index]] = [
					listGear[index],
					listGear[index + 1],
				]
		} else {
			if (index !== 0)
				[listGear[index - 1], listGear[index]] = [
					listGear[index],
					listGear[index - 1],
				]
		}
		configUpdateSet()
	}
	/** 添加跳转tips */
	function onClickTipGear(gear) {
		const gearName = gear.name
		toWebSite(toRaw(searchKeyMap.value)[gearName]?.url)
	}
	/**
	 *
	 * @param url 地址
	 */
	function toWebSite(url) {
		if (!url) return
		const regex = new RegExp(`{${QUERY_KEY}}`, 'g')
		Utools.shellOpenExternal(url.replace(regex, inputValue.value))
		Utools.outPlugin()
	}
	return {
		searchKeyMap,
		onEnterSearchTip,
		clickMoveGear,
		onClickTipGear,
		onKeyDown,
	}
}
