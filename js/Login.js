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
                <div class="input-group col-sm-12 p-0">
                    <input type="text" class="form-control" v-model="email" placeholder="Email">
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                    <div class="input-group-append">
                        <button class="btn btn-sm btn-outline-primary" @click="passwordLogin">Password</button>
                    </div>
                </div>
            </li>
            <li class="mb-2">
                <div class="input-group col-sm-12 p-0">
                    <input type="text" class="form-control" v-model="email" placeholder="Email">
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                    <div class="input-group-append">
                        <button class="btn btn-sm btn-outline-primary" @click="customLogin">Custom</button>
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
            token: null,
        };
    },
    computed: {
        ...Vuex.mapState(['user', 'status', 'error'])
    },
    watch: {
        status(newValue, oldValue) {
            if (newValue === 'success') {

            }
        },
        error(newValue, oldValue) {
            const error = newValue;
            if (error) {
                Vue.toasted.error(`Error en login ${error.code}: ${error.message}`);
            }
        }
    },
    methods: {
        anonymousLogin: function () {
            this.$store.dispatch('anonymousLogin')
                .then(response => {
                    console.log(response);
                    this.$router.push('/').catch(err => { });
                })
                .catch(error => {
                    console.log('anonymousLogin', error);
                });
        },
        googleLogin: function () {
            this.$store.dispatch('googleLogin');
            this.$router.push('/').catch(err => { });
        },
        passwordLogin: async function () {
            const email = this.email;
            const password = this.password;
            try {
                const resultOK = await this.$store.dispatch('passwordLogin', { email, password });
                console.log('resultOK', resultOK);
                if (resultOK) {
                    this.$router.push('/').catch(err => { });
                }
            } catch (error) {
                console.log('passwordLogin', error);
            }
        },
        customLogin: async function () {
            const email = this.email;
            const password = this.password;
            try {
                const resultOK = await this.$store.dispatch('customLogin', { email, password });
                console.log('resultOK', resultOK);
                if (resultOK) {
                    this.$router.push('/').catch(err => { });
                }
            } catch (resultOK) {
                console.log('resultOK', resultOK);
            }
        },
    },
});

export default Login;