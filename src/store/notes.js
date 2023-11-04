import { defineStore } from 'pinia';
import { 
  collection,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    isLoading: false,
  }),
  getters: {},
  actions: {
    // eslint-disable-next-line arrow-body-style
    fetchNote: (id) => {
      // get from server
      return id;
    },
    async fetchNotes() {
      this.isLoading = true;
      const querySnapshot = await getDocs(collection(db, 'notes'));
      this.notes = querySnapshot.docs.map((docEntry) => ({
        id: docEntry.id,
        ...docEntry.data(),
      }));
      this.isLoading = false;
    },
    async createNote(note) {
      console.log('createNote', note.title);
      await addDoc(collection(db, 'notes'), {
        ...note,
        timestamp: serverTimestamp(),
      });
      await this.fetchNotes();
    },
    async updateNote(note, id) {
      console.log('update note:', note);
      await updateDoc(doc(db, 'notes', id), {
        ...note,
        timestamp: serverTimestamp(),
      });
      await this.fetchNotes();
    },
    async deleteNote(id) {
      await deleteDoc(doc(db, 'notes', id));
      await this.fetchNotes();
    },
  },
});
