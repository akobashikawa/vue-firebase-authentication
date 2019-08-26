const store = new Vuex.Store({
    state: {
        user: null,
        status: null,
        error: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        removeUser(state) {
            state.user = null;
        },
        setStatus(state, status) {
            state.status = status;
        },
        setError(state, error) {
            console.log('setError', error);
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
                        provider: user.providerData.length > 0 ? user.providerData[0].providerId : 'anonymous',
                        isAnonymous: user.isAnonymous,
                        displayName: user.isAnonymous ? 'Anónimo' : user.displayName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        photoURL: user.photoURL,
                    };
                    if (!_user.displayName) {
                        _user.displayName = user.email;
                    }
                    commit('setUser', _user);
                } else {
                    console.log('Logout');
                }
            });
        },
        anonymousLogin({ commit }) {
            firebase.auth().signInAnonymously().catch(function (error) {
                commit('setError', `[${error.code}] ${error.message}`);
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
                    commit('setUser', user);
                })
                .catch(function (error) {
                    commit('setError', `[${error.code}] ${error.message}`);
                });
        },
        emailPasswordLogin({ commit }, payload) {
            const email = payload.email;
            const password = payload.password;

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(x => {
                    console.log('then in store', x);
                    commit('setStatus', 'success');
                    return Promise.reject(x);
                })
                .catch(function (error) {
                    commit('setStatus', 'error');
                    commit('setError', `[${error.code}] ${error.message}`);
                });
        },
        logout({ commit }) {
            firebase.auth().signOut().then(function () {
                console.log('Logout');
                commit('removeUser');
            }).catch(function (error) {
                commit('setError', `[${error.code}] ${error.message}`);
            });
        }

    }
});

export default store;