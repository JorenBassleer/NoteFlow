import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({ notes: [] }),
  getters: {},
  actions: {
    // eslint-disable-next-line arrow-body-style
    fetchNote: (id) => {
      // get from server
      return id;
    },
    fetchNotes: () => {
      // get from server
    },
    createNote: (note) => {
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
