<script setup>
import {computed, nextTick, onMounted, ref, shallowRef} from "vue";
import HexaCube from "@/components/CubeType/HexaCube.vue";
import UniCube from "@/components/CubeType/UniCube.vue";
import CommonCube from "@/components/CubeType/CommonCube.vue";
import AdditionalCube from "@/components/CubeType/AdditionalCube.vue";

const props = defineProps({
    childItem: {
        type: String,
        default: '帽子'
    },
    cubeType: {
        type: String,
        default: 'apple'
    },

})
const emit = defineEmits(['update:modelValue'])

const cube_arr = ref([
    {
        cube: 'HexaCube',
        cubeCom: HexaCube,
        cubeChin: '閃炫'
    },
    {
        cube: 'UniCube',
        cubeCom: UniCube,
        cubeChin: '結合'
    },
    {
        cube: 'CommonCube',
        cubeCom: CommonCube,
        cubeChin: '恢復'
    },
    {
        cube: 'CommonCube',
        cubeCom: CommonCube,
        cubeChin: '新對等'
    },
    {
        cube: 'CommonCube',
        cubeCom: CommonCube,
        cubeChin: '閃耀鏡射'
    }
])

const additional_cube_arr = ref([
    {
        cube: 'CommonCube',
        cubeCom: AdditionalCube,
        cubeChin: '珍貴附加'
    },
    {
        cube: 'CommonCube',
        cubeCom: AdditionalCube,
        cubeChin: '恢復附加'
    },
])

const cube_item_arr = ref([
    "帽子",
    "上衣,套服",
    "下衣",
    "手套",
    "鞋子",
    "披風,腰帶,肩膀,機器心臟",
    "墜飾,戒指,臉部裝飾,眼睛裝飾,耳環",
    "武器",
    "徽章"
])

const additional_item_cube = ref([
    "帽子",
    "上衣, 下衣, 套服, 披風, 腰帶, 鞋子, 肩膀裝飾, 機器心臟",
    "手套",
    "墜飾,戒指,臉部裝飾,眼睛裝飾,耳環",
    "武器",
    "輔助武器",
    "徽章",
])
const currentArr = computed(() => {
    let arr = []
    if (props.cubeType === 'cube') arr = cube_arr.value
    else if (props.cubeType === 'additional') arr = additional_cube_arr.value
    return arr
})

const currentPathArr = computed(() => {
    let arr = []
    if (props.cubeType === 'cube') arr = cube_item_arr.value
    else if (props.cubeType === 'additional') arr = additional_item_cube.value
    return arr
})
const cube = shallowRef(HexaCube)

const cubeChin = ref('')
const cube_item = ref('帽子')
const idx = ref(0)

const onChange = (e) => {
    cubeChin.value = e.target.value
    idx.value = currentArr.value.findIndex(el => el.cubeChin === cubeChin.value)
    cube.value = currentArr.value[idx.value].cubeCom

}

const itemOnChange = (e) => {
    console.log('update:childItem', e.target.value)
    emit('update:modelValue', e.target.value)
}

onMounted(() => {
    cube.value = currentArr.value[idx.value].cubeCom
    cubeChin.value = currentArr.value[0].cubeChin
})

</script>

<template>
    <section>
        <div class="selectGroup">
            <select name="cube" id="cube_select" @change="onChange">
                <option v-for="el of currentArr">{{ el.cubeChin }}</option>
            </select>
            <select name="cube_item" id="cube_item" v-model="cube_item" @change="itemOnChange">
                <option v-for="el of currentPathArr" :value="el">{{ el }}</option>
            </select>
        </div>
        <KeepAlive>
            <component :is="cube" :cube_name="cubeChin" :cube_item="cube_item"></component>
        </KeepAlive>
    </section>
</template>

<style>
section {
    .selectGroup {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    #cube_select, #cube_item {
        width: 100px;
        padding: 8px 15px 5px;
        font-size: 16px;
    }
}
</style>