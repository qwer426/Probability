import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Lottery from '../views/Content.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/lottery',
            name: 'lottery',
            component: Lottery,
            children:[
                {
                    path: 'apple',
                    name: 'apple',
                    component: () => import('../components/Apple.vue'),
                },
                {
                    path: 'pet',
                    name: 'pet',
                    component: () => import('../components/Random.vue'),
                },
                {
                    path: 'hair',
                    name: 'hair',
                    component: () => import('../components/Random.vue'),
                }
            ]
        },
    ]
})

export default router
