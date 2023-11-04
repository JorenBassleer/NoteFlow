import { defineStore } from 'pinia';
import { collection, getDocs, addDoc } from 'firebase/firestore';
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
      querySnapshot.forEach((doc) => {
        this.notes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      this.isLoading = false;
    },
    async createNote(note) {
      this.isLoading = true;
      const newlyCreatedNote = await addDoc(collection(db, 'notes'), note);
      // send to server
      this.notes.push({
        id: newlyCreatedNote.id,
        ...newlyCreatedNote.data(),
      });
      this.isLoading = false;
    },
    updateNote: (note, id) => {
      // send to server
    },
    deleteNote: (id) => {
      // send request to server
    },
  },
});
