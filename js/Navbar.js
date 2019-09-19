const Navbar = Vue.component('navbar', {
    template: `
    <nav class="navbar navbar-dark bg-dark navbar-expand-md">
        <a href="index.html" class="navbar-brand">Firebase Authentication</a>

        <div class="navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Inicio</router-link>
                </li>
                <li class="nav-item dropdown" v-if="user">
                    <a class="nav-link dropdown-toggle" href="#" @click="showLoginMenu = !showLoginMenu">
                        <img :src="user.photoURL" alt="" class="login-photo bg-light" v-if="user.photoURL">
                        <img :src="defaultLoginPhotoURL" alt="" class="login-photo bg-light" v-else>
                        {{ user.displayName }}
                    </a>
                    <div class="dropdown-menu" :class="{show: showLoginMenu}">
                        <a class="dropdown-item" href="#" @click="profile">Profile</a>
                        <a class="dropdown-item" href="#" @click="logout">Logout</a>
                    </div>
                </li>
                <li class="nav-link" v-if="!user">
                    <router-link to="/login" class="btn btn-sm btn-outline-light">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
    `,
    data() {
        return {
            defaultLoginPhotoURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABp0lEQVR4AdTVJZRVURiA0Y27uzS8LwruFvGO9Yh2puBOw3vDteEk3KHg7j+Tzpo56zxhTWJ/7em995j/SGcLHHPVE9988dQ1RyzU0T/pZ58votAX+/RTl7bW+iSq9MlabdXQyyVRR5f0UsUID0WdPTRCmb6eiTynbG7sVOGdZwYo6OSKyHptOoDpXousm7qQaxDylmhqqZC3UWaIr4X/y90UWV8N1cw+IW8fan9qP5L2xem3V25vcYq2l8wThW7J3RKF5kl2i2KLNbVYFNsjOSsKFYe/0FnJHVGxE7Y2dkpU7I7ks2hBnyQfRQv6KLkrWtBdyfni/DholfG6gC4mWOVgcb6drzz8Ly3XWUkPO/0uDH9xQj7URzUTvKk0Ids3G7c5aplXWCKFVTRbLbMrL+0Bvqa33hujmtHeS9uI/tU2tmfGqmSsZyLVQK6TGyL1y3pdCmO2wS+RuqKTgoGeCinv7TDZcF0NNNsaZ/zKNv++yox0v+XHEX8HqSBPEGXMKdwVJCJNVaNlBMzMUw1URRQQx9eIAMqSBDiRmjXfoc2aYGCzZsgAAJ59akNQuc64AAAAAElFTkSuQmCC',
            showLoginMenu: false,
        };
    },
    computed: {
        ...Vuex.mapState(['user', 'status', 'error'])
    },
    methods: {
        profile() {
            this.showLoginMenu = false;
            this.$router.push('/profile').catch(err => { });
        },
        logout() {
            this.showLoginMenu = false;
            this.$store.dispatch('logout')
                .then(response => {
                    this.$router.push('/').catch(err => { });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
});

export default Navbar;