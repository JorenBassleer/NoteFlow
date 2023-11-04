import { defineStore } from 'pinia';
import { collection, getDocs, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
      const notesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.notes = notesArray;
      this.isLoading = false;
    },
    async createNote(note) {
      await addDoc(collection(db, 'notes'), {
        note,
        timestamp: serverTimestamp(),
      });
      await this.fetchNotes();
    },
    async updateNote(note, id) {
      await updateDoc(collection(db, 'notes', id), {
        ...note,
        timestamp: serverTimestamp(),
      });
      await this.fetchNotes();
      // send to server
    },
    deleteNote: (id) => {
      // send request to server
    },
  },
});
