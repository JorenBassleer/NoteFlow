import { defineStore } from 'pinia';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useNotesStore = defineStore('notes', {
  state: () => ({ notes: [] }),
  getters: {},
  actions: {
    // eslint-disable-next-line arrow-body-style
    fetchNote: (id) => {
      // get from server
      return id;
    },
    async fetchNotes() {
      const querySnapshot = await getDocs(collection(db, 'notes'));
      querySnapshot.forEach((doc) => {
        this.notes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },
    async createNote(note) {
      const newlyCreatedNote = await addDoc(collection(db, 'notes'), note);
      // send to server
      this.notes.push(note);
    },
    updateNote: (note, id) => {
      // send to server
    },
    deleteNote: (id) => {
      // send request to server
    },
  },
});
