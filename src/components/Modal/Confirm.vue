<template>
  <div class="modal-backdrop" @click="$close(false)">
    <div class="modal-dialog">
      <header class="modal-title">{{ title }}</header>
      <div class="modal-body">
        <p>{{ content }}</p>
      </div>
      <footer class="modal-actions">
        <IconButton 
          type="check_circle" 
          color="orange" 
          @action="$close(true)"
          label="Confirm">
        </IconButton>
        <IconButton
          type="cancel" 
          color="red" 
          @action="$close(false)"
          label="Cancel">
        </IconButton>
      </footer>
    </div>
  </div>
</template>

<script>
import IconButton from '../Ui/IconButton.vue'

export default {
  name: "Confirm",
  components: {
    IconButton
  },
}
</script>

<style scoped>
.modal-backdrop {
  background: rgba(78, 78, 78, 0.658);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.modal-dialog {
  width: 30rem;
  background: #FFF;
  padding: 1.5rem 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  transition: 0.5s;
}
.modal-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
.modal-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 10px;
}
</style>