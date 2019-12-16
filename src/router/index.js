import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import Project from '../pages/Project';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/project/:id',
            component: Project
        }
    ]
});

export default router;
