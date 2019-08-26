const Login = Vue.component('login', {
    template: `
    <section class="login mb-3 border p-3 shadow" v-if="!user">
        <h2>Login</h2>

        <ul class="list-inline">
            <li class="list-inline-item">
                <button class="btn btn-sm btn-outline-primary" @click="anonymousLogin">Anónimo</button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-sm btn-outline-primary" @click="googleLogin">Google</button>
            </li>
            <li class="list-inline-item">
                <button class="btn btn-sm btn-outline-primary" @click="emailPasswordLogin">Email/Password</button>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
        };
    },
    computed: {
        ...Vuex.mapState(['user', 'status', 'error'])
    },
    watch: {
        error(newValue, oldValue) {
            console.log('watch error', newValue, oldValue);
            const error = newValue;
            if (error) {
            }
        }
    },
    methods: {
        anonymousLogin: function () {
            this.$store.dispatch('anonymousLogin');
            this.$router.push('/');
        },
        googleLogin: function () {
            this.$store.dispatch('googleLogin');
            this.$router.push('/');
        },
        emailPasswordLogin: function () {
            this.$store.dispatch('emailPasswordLogin', { email: 'akobashikawa+01@gmail.com', password: '12345678' })
                .then(result => {

                })
                .catch(error => {
                    console.log('error by component', error);
                });
            this.$router.push('/');
        },
    },
});

export default Login;