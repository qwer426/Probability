import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

export const useBoxStore = defineStore('box_list', () => {
        const box_item = ref('') // 單抽獎項
        const box_price = ref([]) // 百抽獎項

        function $reset() {
            box_item.value = ''
            box_price.value = []
        }
        return {box_item, box_price, $reset}
    },
)
