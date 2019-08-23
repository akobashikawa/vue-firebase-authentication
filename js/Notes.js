const Notes = Vue.component('notes', {
    template: `
    <div class="notes mb-3 p-3 shadow">
        <section class="notes-list">
            <h2>Notas en {{ board }}</h2>

            <div class="notes-list" v-if="notes.length">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Nota</th>
                            <th>Acción</th>
                        </tr>
                        <tr v-for="note of notes" :key="note.id">
                            <td>{{ note.data.text }}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-danger m-0 py-0" @click="deleteNote(note.id)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                Ninguna nota
            </div>
            <button type="button" class="btn btn-sm btn-outline-info mt-2" @click="getNotes">Refrescar</button>
        </section>

        <section class="notes-add mt-2" v-if="user && user.uid">
            <div class="input-group">
                <input ref="newNoteInput" type="text" class="form-control" v-model="newNote" placeholder="Nueva nota" @keyup.enter="addNote">
                <div class="input-group-append">
                    <button type="button" class="btn btn-primary" @click="addNote">Agregar</button>
                </div>
            </div>
        </section>
    </div>
    `,
    data() {
        return {
            newNote: '',
            notes: [],
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        board() {
            return (this.$store.state.user && this.$store.state.user.email) || 'anonymous';
        },
    },
    mounted() {
        this.observeNotes();
    },
    methods: {
        addNote: function () {
            console.log('addNote');
            const self = this;
            const newNote = {
                text: this.newNote,
                createdAt: new Date()
            };
            const boardRef = db.collection("board").doc(this.board);
            boardRef
                .collection('notes')
                .add(newNote)
                .then(docRef => {
                    console.log('nota agregada:', docRef.id);
                    self.newNote = '';
                    self.$refs['newNoteInput'].focus();
                })
                .catch(error => {
                    console.log('error agregando nota', error);
                    self.$refs['newNoteInput'].focus();
                    Vue.toasted.error("Error agregando nota: " + error);
                });
        },
        getNotes: function () {
            console.log('getNotes');
            const boardRef = db.collection("board").doc(this.board);
            boardRef
                .collection('notes')
                .orderBy("createdAt")
                .get()
                .then((querySnapshot) => {
                    const result = [];
                    querySnapshot.forEach((doc) => {
                        const item = {
                            id: doc.id,
                            data: doc.data()
                        };
                        result.push(item);
                    });
                    this.notes = result;
                });
        },
        observeNotes: function () {
            const self = this;
            const boardRef = db.collection("board").doc(this.board);
            boardRef
                .collection('notes')
                .orderBy("createdAt")
                .onSnapshot((querySnapshot) => {
                    const result = [];
                    querySnapshot.forEach((doc) => {
                        const item = {
                            id: doc.id,
                            data: doc.data()
                        };
                        result.push(item);
                    });
                    self.notes = result;
                });
        },
        deleteNote: function (id) {
            const self = this;
            const boardRef = db.collection("board").doc(this.board);
            boardRef
                .collection('notes')
                .doc(id)
                .delete()
                .then(function () {
                    self.getNotes();
                    console.log('nota eliminada:', id);
                })
                .catch(function (error) {
                    console.log('error eliminado nota', error);
                    Vue.toasted.error("Error eliminado nota: " + error);
                })
        },
        preventDefault: function () {

        }
    },
});

export default Notes;