import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

export const useAppleStore = defineStore('apple_list', () => {
        const big_price = ref(0) // 大獎
        const total = ref(0) // 總量
        const box_total = ref(0) // 金箱總量

        function $reset() {
            big_price.value = 0
            total.value = 0
            box_total.value = 0
        }
        return {big_price, total, box_total, $reset}
    },
)
