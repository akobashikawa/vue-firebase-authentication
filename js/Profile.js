const Profile = Vue.component('profile', {
    template: `
    <section class="profile mb-3 border p-3 shadow" v-if="user">
        <h2>Profile</h2>
        <dl class="row">
            <dt class="col-sm-3">uid</dt>
            <dd class="col-sm-9">{{ user.uid }}</dd>

            <dt class="col-sm-3">displayName</dt>
            <dd class="col-sm-9">{{ user.displayName || '-'}}</dd>

            <dt class="col-sm-3">provider</dt>
            <dd class="col-sm-9">{{ user.provider || '-'}}</dd>

            <dt class="col-sm-3">email</dt>
            <dd class="col-sm-9">{{ user.email || '-'}}</dd>

            <dt class="col-sm-3">emailVerified</dt>
            <dd class="col-sm-9">{{ user.emailVerified }}</dd>

            <dt class="col-sm-3">isAnonymous</dt>
            <dd class="col-sm-9">{{ user.isAnonymous }}</dd>

            <dt class="col-sm-3">photoURL</dt>
            <dd class="col-sm-9">
                <img :src="user.photoURL" class="profile-photo" alt="Foto" v-if="user.photoURL">
                <span v-else>-</span>
            </dd>
        </dl>
    </section>
    `,
    data() {
        return {
        };
    },
    computed: {
        ...Vuex.mapState(['user', 'status', 'error'])
    },
});

export default Profile;