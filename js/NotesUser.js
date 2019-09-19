const NotesUser = Vue.component('notes-user', {
    template: `
    <div class="notes mb-3 p-3 shadow">
        <section class="notes-list">
            <h2>Notas de <input type="text" class="" v-model="board" placeholder="uid"/></h2>

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

        <section class="notes-add mt-2">
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
            board: '',
        };
    },
    computed: {
        ...Vuex.mapState(['user', 'status', 'error'])
    },
    watch: {
        user() {
            const board = this.$store.state.user ? this.$store.state.user.uid : '';
            console.log(board);
            if (this.board) {
                this.board = board;
                this.getNotes();
            } else {
                this.board = board;
                this.observeNotes();
            }
        },
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
        addNote: function () {
            console.log('addNote');

            const self = this;

            const newNote = {
                text: this.newNote,
                createdAt: new Date()
            };

            let boardRef = null;
            try {
                console.log('board:', this.board);
                boardRef = db.collection("boards").doc(this.board);
            } catch (error) {
                console.log(`Error intentando ubicar board ${this.board}`, error);
                Vue.toasted.error(`Error intentando ubicar board ${this.board}: ${error}`);
                return;
            }

            boardRef
                .collection('notes')
                .add(newNote)
                .then(docRef => {
                    console.log('nota agregada:', docRef.id);
                    self.newNote = '';
                    self.$refs['newNoteInput'].focus();
                })
                .catch(error => {
                    console.log('Error agregando nota', error);
                    self.$refs['newNoteInput'].focus();
                    Vue.toasted.error("Error agregando nota: " + error);
                });

        },
        getNotes: function () {
            console.log('getNotes');
            const self = this;

            let boardRef = null;
            try {
                console.log('board:', this.board);
                boardRef = db.collection("boards").doc(this.board);
            } catch (error) {
                console.log(`error intentando ubicar board ${this.board}`, error);
                Vue.toasted.error(`error intentando ubicar board ${this.board}: ${error}`);
                return;
            }
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
                    self.notes = result;
                    Vue.toasted.success(`Notas traidas: ${this.notes.length}`);
                })
                .catch(error => {
                    console.log('Error trayendo notas', error);
                    Vue.toasted.error("Error trayendo notas: " + error);
                });
        },
        observeNotes: function () {
            console.log('observeNotes');

            const self = this;

            let boardRef = null;
            try {
                console.log('board:', this.board);
                boardRef = db.collection("boards").doc(this.board);
            } catch (error) {
                console.log(`Error intentando ubicar board ${this.board}`, error);
                Vue.toasted.error(`Error intentando ubicar board ${this.board}: ${error}`);
                return;
            }
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
            console.log('deleteNote');

            const self = this;

            let boardRef = null;
            try {
                console.log('board:', this.board);
                boardRef = db.collection("boards").doc(this.board);
            } catch (error) {
                console.log(`Error intentando ubicar board ${this.board}`, error);
                Vue.toasted.error(`Error intentando ubicar board ${this.board}: ${error}`);
                return;
            }
            boardRef
                .collection('notes')
                .doc(id)
                .delete()
                .then(function () {
                    self.getNotes();
                    console.log('nota eliminada:', id);
                    Vue.toasted.success(`Nota eliminada: ${id}`);
                })
                .catch(function (error) {
                    console.log(`Error intentando eliminar nota ${id}`, error);
                    Vue.toasted.error(`Error intentando eliminar nota ${id}: ${error}`);
                })
        },
        preventDefault: function () {

        }
    },
});

export default NotesUser;