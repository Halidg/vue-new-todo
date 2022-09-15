<template>
  <div class="home">
    <div v-if="!notes.length">
      <h3>Заметки еще не созданы</h3>
      <icon-button 
        color="orange" 
        type="add" 
        @action="$router.push('/note')"
        label="Add"
        ></icon-button>
    </div>
    <div>
      <note-card
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
import { NoteService } from '../services/NoteService' 
import Confirm from '../components/Modal/Confirm'
import { create } from 'vue-modal-dialogs'
import IconButton from '../components/Ui/IconButton'

const confirm = create(Confirm, 'title', 'content')


export default {
  name: "Home",
  data() {
    return {
      notes: []
    };
  },
  components: {
     NoteCard,
     IconButton
    
  },
  mounted () {
    this.fetchNotes()
  },
  methods: {
    deleteNote(noteId) {
      NoteService.removeItem(noteId)
      this.fetchNotes()
    },
    fetchNotes(){
      this.notes = NoteService.fetchNotes()
    },
    async handleDeleteNote(noteId){
      if (await confirm('Вы точно хотите удалить заметку?')) {
        this.deleteNote(noteId)
        } 
    }
  },
};
</script>

<style scoped>
div{
  text-align: center;
}
</style>
