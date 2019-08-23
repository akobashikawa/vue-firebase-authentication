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
        user() {
            return this.$store.state.user;
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
            this.$store.dispatch('emailPasswordLogin');
            this.$router.push('/');
        },
    },
});

export default Login;