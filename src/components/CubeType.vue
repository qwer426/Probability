<script setup>
import {nextTick, ref, shallowRef} from "vue";
import HexaCube from "@/components/CubeType/HexaCube.vue";
import UniCube from "@/components/CubeType/UniCube.vue";
import CommonCube from "@/components/CubeType/CommonCube.vue";

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
const cube = shallowRef(HexaCube)
const cubeChin = ref('閃炫')
const cube_item = ref('帽子')
const idx = ref(0)

const onChange = (e) => {
    cubeChin.value = e.target.value
    idx.value = cube_arr.value.findIndex(el => el.cubeChin === cubeChin.value)
    cube.value = cube_arr.value[idx.value].cubeCom

}


</script>

<template>
    <section>
        <select name="cube" id="cube_select" @change="onChange">
            <option v-for="el of cube_arr" >{{ el.cubeChin }}</option>
        </select>
        <select name="cube_item" id="cube_item" v-model="cube_item">
            <option v-for="el of cube_item_arr" :value="el">{{ el }}</option>
        </select>
        <KeepAlive>
            <component :is="cube" :cube_name="cubeChin" :cube_item="cube_item"></component>
        </KeepAlive>
    </section>
</template>

<style>
section {
    #cube_select, #cube_item {
        width: 100px;
        padding: 10px 5px;
        font-size: 18px;
    }
}
</style>