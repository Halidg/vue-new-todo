<template>
  <div class="home">
    <div v-if="!notes.length">
      <h3>Заметки еще не созданы</h3>
    </div>
    <div>
      <NoteCard
        v-for="note in notes"
        :note="note"
        :key="note.title"
        @delete-note="handleDeleteNote"
      />
    </div>
  </div>
</template>

<script>
import NoteCard from "../components/Ui/NoteCard"
import { NoteService } from '../helpers/NoteService' 
import Confirm from '../components/Modal/Confirm'
import { create } from 'vue-modal-dialogs'

const confirm = create(Confirm, 'title', 'content')

export default {
  name: "Home",
  data() {
    return {
      notes: []
    };
  },
  components: {
    NoteCard
  },
  mounted() {
    this.getAllNotes()
  },
  methods: {
    deleteNote(noteId) {
      NoteService.removeItem(noteId)
      this.getAllNotes()
    },
    getAllNotes() {
      this.notes = NoteService.getAllNotes()
    },
    async handleDeleteNote(noteId){
      if (await confirm('Вы точно хотите удалить заметку?')) {
        this.deleteNote(noteId)
      } 
    }
  },
}
</script>

<style scoped>
div {
  text-align: center;
}
</style>