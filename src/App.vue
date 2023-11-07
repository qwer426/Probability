<script setup>
import {RouterLink} from 'vue-router'
import { useBoxStore } from "@/stores/random";
const store = useBoxStore()

const reset = () => {
    store.$reset()
}
</script>

<template>
    <header>
        <section>
            <h1><RouterLink to="/">Home</RouterLink></h1>
            <nav>
                <RouterLink to="/lottery" @click="reset">Lottery</RouterLink>
            </nav>
        </section>
    </header>

    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
header{
    width: 100%;
    display: flex;
    justify-content: center;
    section{
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        max-width: 1280px;
    }
}
</style>

<style>
button {
    cursor: pointer;
    &:hover{
        background: rgba(0,0,0, .2);
    }
}
</style>
