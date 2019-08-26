const Login = Vue.component('login', {
    template: `
    <section class="login mb-3 border p-3 shadow" v-if="!user">
        <h2>Login</h2>

        <ul class="">
            <li class="mb-2">
                <button class="btn btn-sm btn-outline-primary" @click="anonymousLogin">Anónimo</button>
            </li>
            <li class="mb-2">
                <button class="btn btn-sm btn-outline-primary" @click="googleLogin">Google</button>
            </li>
            <li class="mb-2">
                <div class="input-group col-sm-4 p-0">
                    <input type="text" class="form-control" v-model="email" placeholder="Email">
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                    <div class="input-group-append">
                        <button class="btn btn-sm btn-outline-primary" @click="emailPasswordLogin">Email/Password</button>
                    </div>
                </div>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            email: null,
            password: null,
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
            const email = this.email;
            const password = this.password;
            this.$store.dispatch('emailPasswordLogin', { email, password })
                .then(result => {
                    console.log('success by component');
                })
                .catch(error => {
                    console.log('error by component', error);
                });
            this.$router.push('/');
        },
    },
});

export default Login;