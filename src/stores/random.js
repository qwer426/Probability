import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

export const useBoxStore = defineStore('box_list', () => {
        const box_item = ref('') // 單抽獎項
        const box_price = ref([]) // 百抽獎項
        const total = ref(0)
        const big_price = ref(0)

        function $reset() {
            box_item.value = ''
            box_price.value = []
            total.value = 0
            big_price.value = 0
        }

        return {box_item, box_price, total, big_price, $reset}
    },
)
