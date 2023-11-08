import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useItemAbility = defineStore('ability_list', () => {
        const Ability = ref(['無','無','無'])

        function $reset() {
            for (let item of Ability.value) {
                item = '無'
            }
        }
        return {Ability, $reset}
    },
)
