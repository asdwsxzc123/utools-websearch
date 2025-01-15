import { ref } from 'vue'

export function useToast() {
	const toastMsg = ref('')
	const toastIcon = ref('')
	const toastColor = ref('')
	const toastActive = ref(false)
	function toast({ icon = '', msg = '', color = '', timeout = 6000 }) {
		toastIcon.value = icon
		toastMsg.value = msg
		toastColor.value = color
		toastActive.value = true
		setTimeout(() => {
			toastActive.value = false
		}, timeout)
	}

	return {
		toast,
		toastMsg,
		toastIcon,
		toastColor,
		toastActive,
	}
}
