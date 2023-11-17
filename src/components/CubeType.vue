<script setup>
import {computed, onMounted, ref, shallowRef} from "vue";
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

const cubeType = ref([
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

const additional_cubeType = ref([
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

const cubeTypeItem = ref([
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

const additional_cubeTypeItem = ref([
    "帽子",
    "上衣, 下衣, 套服, 披風, 腰帶, 鞋子, 肩膀裝飾, 機器心臟",
    "手套",
    "墜飾,戒指,臉部裝飾,眼睛裝飾,耳環",
    "武器",
    "輔助武器",
    "徽章",
])
// 透過props判斷 顯示目前為主潛還附加潛
const currentArr = computed(() => {
    let arr = []
    if (props.cubeType === 'cube') arr = cubeType.value
    else if (props.cubeType === 'additional') arr = additional_cubeType.value
    return arr
})

// 透過props判斷 顯示目前為主潛還附加潛 的裝備類別
const currentPathArr = computed(() => {
    let arr = []
    if (props.cubeType === 'cube') arr = cubeTypeItem.value
    else if (props.cubeType === 'additional') arr = additional_cubeTypeItem.value
    return arr
})

let cube = shallowRef(HexaCube)

const cubeChin = ref('')
const cubeItem = ref('帽子')
const idx = ref(0)


// 方塊選擇
const onCubeTypeChange = (e) => {
    cubeChin.value = e.target.value
    idx.value = currentArr.value.findIndex(el => el.cubeChin === cubeChin.value)
    cube = shallowRef(currentArr.value[idx.value].cubeCom)
}

// 部位選擇
const onCubeTypeItemChange = (e) => {
    emit('update:modelValue', e.target.value)
}

onMounted(() => {
    cube = shallowRef(currentArr.value[idx.value].cubeCom)
    cubeChin.value = currentArr.value[0].cubeChin
})

</script>

<template>
    <section>
        <div class="selectGroup">
            <select name="cube" id="cube_select" @change="onCubeTypeChange">
                <option v-for="el of currentArr" :key="el.cubeChin">{{ el.cubeChin }}</option>
            </select>
            <select name="cubeItem" id="cubeItem" v-model="cubeItem" @change="onCubeTypeItemChange">
                <option v-for="el of currentPathArr" :value="el">{{ el }}</option>
            </select>
        </div>
        <KeepAlive>
            <component :is="cube" :cubeName="cubeChin" :cubeItem="cubeItem"></component>
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

    #cube_select, #cubeItem {
        width: 100px;
        padding: 8px 15px 5px;
        font-size: 16px;
    }
}
</style>