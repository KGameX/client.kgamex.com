import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('@/views/Logout.vue')
    },
    {
        path: '/questions',
        name: 'Questions',
        component: () => import('@/views/Questions.vue')
    },
    {
        path: '/questions/ask',
        name: 'AskQuestion',
        component: () => import('@/views/AskQuestion.vue')
    },
    {
        path: '/questions/:id',
        name: 'Question',
        component: () => import('@/views/Question.vue')
    },
    {
        path: '/questions/:id/reply',
        name: 'ReplyQuestion',
        component: () => import('@/views/ReplyQuestion.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router