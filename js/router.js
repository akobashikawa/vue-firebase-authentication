import Notes from './Notes.js';
import Login from './Login.js';
import Profile from './Profile.js';

const routes = [
    { path: '/', component: Notes },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
];

const router = new VueRouter({
    routes
});

export default router;