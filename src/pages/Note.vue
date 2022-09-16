<template>
  <div class="note-page">
    <note-title :note="note"/>
    <hr />
    <div>
      <IconButton 
        @action="undo" 
        type="undo"
        :disabled="!(this.historyIndex > 0)"
        label="Undo"
        />
      <IconButton 
        @action="redo" 
        type="redo"
        :disabled="!(this.historyIndex < (this.noteHistory.length - 1))"
        label="Redo"
      />  
    </div>
    <ul>
      <TodoItem
        v-for="(todo, index) in note.todos"
        :todo="todo"
        :key="index"
        @remove-todo="onRemoveTodo"
      />
    </ul>
    <div class="new-todo">
      <IconButton 
        color="orange" 
        type="add" 
        @action="addTodo"
        label="Add"
        ></IconButton>
      <span @click="addTodo">Добавить ToDo</span>
    </div>
    <hr />
      <IconButton 
        color="green" 
        type="save" 
        @action="saveNote"
        label="Save"></IconButton>
      <IconButton 
        color="orange" 
        type="cancel" 
        @action="handleCancelEdit"
        label="Cancel"></IconButton>
      <IconButton 
        color="red" 
        type="delete" 
        @action="handleDeleteNote"
        label="Delete"></IconButton>
  </div>
</template>

<script>
import TodoItem from "../components/Ui/TodoItem"
import { NoteService } from '../helpers/NoteService'
import { random } from '../helpers/utils'  
import Confirm from '../components/Modal/Confirm'
import { create } from 'vue-modal-dialogs'
import NoteTitle from '../components/Ui/NoteTitle'
import IconButton from '../components/Ui/IconButton'

const confirm = create(Confirm, 'title', 'content')

export default {
  name: "Note",
  components: {
     TodoItem,
     NoteTitle,
     IconButton
  },
  data() {
    return {
      noteHistory: [],
      historyIndex: 0,
      watching: true,
      noteId: '',
      note: {}
    }
  },
  mounted() {
    this.getNoteById()  
  },
  methods: {
    getNoteById() {
      this.noteId = this.$route.params.noteId
      if (this.noteId) {
        this.note = NoteService.getItemById(this.noteId)
      } else {
        this.note = {
          noteId: "",
          title: "",
          todos: []
        }
      this.note.noteId = random()
    }  
    },
    addTodo() {
      this.note.todos.push({
        text: "",
        completed: false,
      });
    },
    onRemoveTodo(todo) {
      let i = this.note.todos.indexOf(todo)
      this.note.todos.splice(i, 1)
    },
    saveNote() {
      NoteService.updateItem(this.note.noteId, this.note)
    },
    cancelEdit() {
      this.clearNote()
      this.$router.push("/")
    },
    deleteNote() {
      NoteService.removeItem(this.noteId)
      this.clearNote()
      this.$router.push("/")
    },
    clearNote() {
      this.note = {
        noteId: "",
        title: "",
        todos: []
      }
    },
    undo() {
      this.watching = false;
      if (this.historyIndex > 0) {
        this.historyIndex -= 1
        this.note = this.noteHistory[this.historyIndex]
      }
    },
    redo() {
      this.watching = false
      if (this.historyIndex < (this.noteHistory.length - 1)) {
        this.historyIndex += 1
        this.note = this.noteHistory[this.historyIndex]
      }
    },
    async handleDeleteNote(noteId) {
      if (await confirm('Вы действительно хотите удалить заметку?')) {
        this.deleteNote(noteId)
      } 
    },
    async handleCancelEdit(noteId) {
      if (await confirm('Вы действительно хотите прекратить  редактирование?')) {
        this.cancelEdit(noteId)
      } 
    },
  },
  //сохранение истории изменений заметок, кроме отмены и повтора
  watch: {
    note: {
      handler: function(val) {
        if (this.watching) {
          this.noteHistory.push(JSON.parse(JSON.stringify(val)))
          this.historyIndex = this.noteHistory.length - 1
        } else {
          this.watching = true
        }
      },
      deep: true
    },
  },
  //безопасное перенаправление со страницы  
  async beforeRouteLeave (_to, from, next) {
    if (await confirm('Вы точно хотите покинуть страницу?',
      'Не сохраненные действия будут потеряны')) {
      this.clearNote()
      next()
    } else {
      next(from)
    }
  }
};
</script>

<style scoped>
.new-todo {
  display: flex;
  justify-content: flex-start;
  background-color: #e2e2e2;
  height: 36px;
  margin: 5px 0px;
  padding-top: 4px;
  padding-left: 10px;
  padding-right: 15px;
  border-radius: 5px;
}
</style>
