<template>
  <div class="model-popup">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Deleting task with id: {{ modal_number }}</h5>
        </div>
        <div class="modal-body">
          Are you sure you want to delete the task?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirmDelete(modal_id)">Delete task</button>
          <button type="button" class="btn btn-secondary" @click="closeModel()">Do not delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/config";

export default {
  name: "Delete-modal",
  props:["modal_id", "modal_number", "tasks", "tasksIndex"],
  data(){
    return{
      confirmButton: false,
    }
  },
  methods: {
    closeModel(){
        console.log("confirmButton " + this.confirmButton)
        this.$emit("closemodel", {modalDelete: false, confirmButton: this.confirmButton, tasksIndex: this.tasksIndex });
    },
    confirmDelete(id) {

      db.collection("Tasks").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      })
      this.confirmButton = true;
      this.closeModel();
    }
  }
}
</script>

<style scoped>

.model-popup{
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  z-index: 1;
}
.modal-dialog{
  width: 500px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
}
.modal-footer,
.modal-body,
.modal-title{
  margin: 20px;
}

.modal-footer .btn{
  margin: 5px;
}
</style>