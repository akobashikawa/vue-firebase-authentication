const store = new Vuex.Store({
    state: {
        user: null,
        error: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        removeUser(state) {
            state.user = null;
        },
        setError(state, error) {
            state.error = error;
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user);
        },
        observeLogin({ commit }) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    console.log(user);
                    const _user = {
                        uid: user.uid,
                        provider: user.providerData.length > 0 ? user.providerData[0].providerId : '',
                        isAnonymous: user.isAnonymous,
                        displayName: user.isAnonymous ? 'anonymous' : user.displayName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        photoURL: user.photoURL,
                        lastLogin: new Date()
                    };
                    if (!_user.displayName) {
                        _user.displayName = user.email;
                    }
                    commit('setUser', _user);

                    // update profile
                    db.collection("boards")
                        .doc(_user.uid)
                        .set(_user)
                        .then(docRef => {
                            console.log('profile guardado:', _user.uid);
                        })
                        .catch(error => {
                            console.log('Error guardando profile', error);
                        });
                } else {
                    commit('removeUser');
                }
            });
        },
        anonymousLogin({ commit }) {
            firebase.auth().signInAnonymously().catch(function (error) {
                commit('setError', error);
                return Promise.reject(false);
            });
        },
        googleLogin({ commit }) {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("email, profile");

            firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (result) {
                    // console.log({ result });
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const token = result.credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    return Promise.resolve(true);// para ayudar a controlar flujo
                })
                .catch(function (error) {
                    commit('setError', error);
                    return Promise.reject(false);
                });
        },
        async passwordLogin({ commit }, payload) {
            const email = payload.email;
            const password = payload.password;

            try {
                const methods = await firebase
                    .auth()
                    .fetchSignInMethodsForEmail(email);
                console.log(methods);
                if (methods.length == 0) {
                    const user = await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password);
                    console.log('user', user);
                }
                if (methods.includes('password')) {
                    const user = await firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password);
                    console.log('user', user);
                    return Promise.resolve(true); // para ayudar a controlar flujo
                } else if (methods.includes('google.com')) {
                    this.dispatch('googleLogin');
                }
            } catch (error) {
                commit('setError', error);
                return Promise.reject(false);
            }

        },
        async customLogin({ commit }, payload) {
            const email = payload.email;
            const password = payload.password;

            try {
                const url = 'http://localhost:4000/login-firebase';
                const method = 'POST';
                const data = { email, password };
                const result = await axios({ url, method, data });
                const resultUser = result.data;
                console.log(resultUser);
                const token = resultUser.firebaseToken;

                const user = await firebase
                    .auth()
                    .signInWithCustomToken(token);
                console.log('user', user);
                return Promise.resolve(true); // para ayudar a controlar flujo
            } catch (error) {
                commit('setError', error);
                return Promise.reject(false);
            }

        },
        logout({ commit }) {
            firebase.auth().signOut().then(function () {
                console.log('Logout');
            }).catch(function (error) {
                commit('setError', error);
            });
        }

    }
});

export default store;