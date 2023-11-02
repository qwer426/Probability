<script setup>
import {RouterLink} from 'vue-router'
import Content from '@/components/Content.vue'
</script>

<template>
    <header>
        <section>
            <h1>AAA</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/apple">Apple</RouterLink>
            </nav>
        </section>
    </header>

    <main>
        <Content />
    </main>
</template>

<style lang="scss" scoped>
header{
    width: 100%;
    display: flex;
    section{
        width: 100%;
        display: flex;
        justify-content: center;
        max-width: 1280px;
    }
}
header {
    justify-content: center;
    section{
        flex-direction: column;
        align-items: center;
    }
}
</style>
