import {createRouter, createWebHistory} from 'vue-router'
import Task from '../components/task.vue'
import Home from '../components/Home.vue'
import LogIn from "@/components/LogIn.vue";
// import Navigation from "@/components/Navigation.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:
        [
            {
                name: 'Home',
                path: '/',
                component: Home,
                meta:{requiresVisitor: true},
            },
            {
                name: 'Task',
                path: '/task',
                component: Task,
                meta:{requiresVisitor: false},
            },
            {
                name: 'LogIn',
                path: '/login',
                component: LogIn,
                meta:{requiresVisitor: true},
            },
        ]
});

router.beforeEach((to, from, next) => {
    const isLogged = window.localStorage.getItem('username');
    if (isLogged) next()
    else{
        if(to.meta.requiresVisitor) next()
        else next('/')
    }
})

export default router;