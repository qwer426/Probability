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
                    "墜飾,戒指,臉部裝飾,眼睛裝飾,耳環": ['無', '無', '無'],
                    "武器": ['無', '無', '無'],
                    "徽章": ['無', '無', '無']
            }
        )

        const cubeNumObj = ref({
            "閃炫": 0,
            "結合": 0,
            "恢復": 0,
            "新對等": 0,
            "閃耀鏡射": 0,
        })

        const additionalAbility = ref(
            {
                "帽子": ['無', '無', '無'],
                "上衣, 下衣, 套服, 披風, 腰帶, 鞋子, 肩膀裝飾, 機器心臟,套服": ['無', '無', '無'],
                "手套": ['無', '無', '無'],
                "墜飾,戒指,臉部裝飾,眼睛裝飾,耳環": ['無', '無', '無'],
                "武器": ['無', '無', '無'],
                "輔助武器": ['無', '無', '無'],
                "徽章": ['無', '無', '無']
            }
        )

        const additionalCubeNumObj = ref({
            "珍貴附加": 0,
            "恢復附加": 0,
        })

        const resetCubeNum = (cubeName) => {
            cubeNumObj.value[cubeName] = 0
        }
        const resetAdditionalCubeNum = (cubeName) => {
            additionalCubeNumObj.value[cubeName] = 0
        }

        return {Ability, cubeNumObj, additionalAbility, additionalCubeNumObj, resetCubeNum, resetAdditionalCubeNum}
    },
)
