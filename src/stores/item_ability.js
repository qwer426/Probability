import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useItemAbility = defineStore('ability_list', () => {
        const Ability = ref(
            {
                    "帽子": ['無', '無', '無'],
                    "上衣,套服": ['無', '無', '無'],
                    "下衣": ['無', '無', '無'],
                    "手套": ['無', '無', '無'],
                    "鞋子": ['無', '無', '無'],
                    "披風,腰帶,肩膀,機器心臟": ['無', '無', '無'],
                    "徽章": ['無', '無', '無']
            }
        )

        const cubeNumObj = {
            "閃炫": 0,
            "結合": 0,
            "恢復": 0,
            "新對等": 0,
            "閃耀鏡射": 0,
        }

        function $reset() {
            for (let item of Ability.value) {
                item = '無'
            }
        }

        return {Ability, cubeNumObj, $reset}
    },
)
