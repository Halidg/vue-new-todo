<template>
  <div class="note">
    <h1>{{ note.title }}</h1>
    <ul>
      <li
        :class="todo.completed ? 'todo-completed' : ''"
        v-for="todo in note.todos"
        :key="todo.id"
      >
        {{ todo.text }}
      </li>
    </ul>
    <div class="note_actions">
      <IconButton 
        type="edit" 
        color="orange" 
        @action="goToNote"
        label="Edit Note"
      >
        Редактировать заметку
      </IconButton>
      <IconButton
        type="delete_outline"
        color="red"
        @action="$emit('delete-note', note.noteId)"
        label="Delete"
      >
        Удалить заметку
      </IconButton>
    </div>
  </div>
</template>

<script>
import IconButton from "../Ui/IconButton.vue"

export default {
  name: "NoteCard",
  props: {
    note: Object
  },
  components: {
    IconButton
  },
  methods: {
    goToNote() {
      this.$router.push(`/note/${this.note.noteId}`)
    }
  }
}
</script>

<style scoped>
.todo-completed {
  text-decoration: line-through;
}
.note {
  text-align: center;
}
</style>
