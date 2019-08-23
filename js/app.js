import store from './store.js';
import Navbar from './Navbar.js';
import router from './router.js';

Vue.use(Toasted, {
    position: 'top-center',
    duration: 2000,
    keepOnHover: true,
});

const app = new Vue({
    router,
    store,
    data() {
        return {
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        this.$store.dispatch('observeLogin');
    },
    methods: {
    }
}).$mount('#app');