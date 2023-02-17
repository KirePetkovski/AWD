<template>
  <div class="model-popup">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editing task with id: {{ modal_number }}</h5>
        </div>
        <div class="modal-body">
          <label for="description"> Description: </label>
          <br/>
          <textarea type="text" id="description" v-model="input" rows="5" cols="55"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirmEdit(modal_id)"> Edit task </button>
          <button type="button" class="btn btn-secondary" @click="closeModel()"> Cancel </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/config";

export default {
  name: "Edit-modal",
  props: ["modal_id", "modal_number", "modal_description", "tasksIndex"],
  data() {
    return {
      input: this.modal_description,
      confirmButton: false,
    }
  },
  methods: {
    closeModel() {
      this.$emit("closemodel", {modalEdit: false, confirmButton: this.confirmButton,
                              tasksIndex: this.tasksIndex, description: this.input });
    },
    confirmEdit(id) {
      console.log("New Description: " + this.input + " for task with id: " + id);
      db.collection("Tasks").doc(id).update({
        Description: this.input,
      }).then(() => {
        console.log("Document successfully edited!");
      })
      this.confirmButton = true;
      this.closeModel();
    },
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