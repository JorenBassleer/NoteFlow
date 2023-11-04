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
    fetchNote(id) {
      // get from server
      return id;
    },
    async fetchNotes() {
      this.isLoading = true;
      const querySnapshot = await getDocs(collection(db, 'notes'));
      this.notes = querySnapshot.docs.map((docEntry) => ({
        id: docEntry.id,
        ...docEntry.data(),
      })).sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
      this.isLoading = false;
    },
    async fetchNotesWithoutLoader() {
      const querySnapshot = await getDocs(collection(db, 'notes'));
      this.notes = querySnapshot.docs.map((docEntry) => ({
        id: docEntry.id,
        ...docEntry.data(),
      }));
    },
    async createNote(note) {
      await addDoc(collection(db, 'notes'), {
        ...note,
        timestamp: serverTimestamp(),
      }).sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
      await this.fetchNotesWithoutLoader();
    },
    async updateNote(note, id) {
      await updateDoc(doc(db, 'notes', id), {
        ...note,
        timestamp: serverTimestamp(),
      });
      await this.fetchNotesWithoutLoader();
    },
    async deleteNote(id) {
      await deleteDoc(doc(db, 'notes', id));
      await this.fetchNotesWithoutLoader();
    },
  },
});
