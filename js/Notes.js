import NotesUser from './NotesUser.js';
import NotesAnonymous from './NotesAnonymous.js';

const Notes = Vue.component('notes', {
    components: {
        NotesUser, NotesAnonymous
    },
    template: `
    <div class="notes-user">
        <NotesUser />
        <NotesAnonymous />
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