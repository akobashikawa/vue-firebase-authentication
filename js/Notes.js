import NotesUser from './NotesUser.js';

const Notes = Vue.component('notes', {
    components: {
        NotesUser
    },
    template: `
    <div class="notes-user">
        <NotesUser />
        <NotesUser init-board="anonymous" />
    </div>
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
            const error = newValue;
            if (error) {
                Vue.toasted.error(`Error en login ${error.code}: ${error.message}`);
            }
        }
    },
    mounted() {
    },
    methods: {
    },
});

export default Notes;