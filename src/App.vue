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
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </section>
    </header>

    <main>
        <div class="list"></div>
        <section>
            <Content />
        </section>
    </main>
</template>

<style lang="scss" scoped>
header, main{
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
main{
    .list {
        width: 30%;
        max-width: 300px;
        border: 1px solid #333;
    }
}
</style>
