<template>
  <div class="model-popup">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Commenting task with id: {{ modal_number }}</h5>
        </div>
        <div class="modal-body">
          <p> Comments: </p>
          <br/>
          <div id="comment">
            <div v-for="(comment, index) in textareaComments" :key="index">
              <p>{{ comment }}</p>
            </div>
          </div>
          <br/>
          <div v-show="availableComment">
            <label for="commentAdd">Add new Coment: </label>
            <br/>
            <input type="text" id="commentAdd" v-model="input" style="width: 360px"/>
            <button type="button" id="btnComment" class="btn btn-warning" @click="addNewComment(modal_id)">
              <span class="text-center fa fa-arrow-right"></span>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModel()"> Close </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/config";

export default {
  name: "Comment-modal",
  props: ["modal_id", "modal_number", "availableComment", "comments"],
  data() {
    return {
      textareaComments: [],
      input: this.modal_description,
    }
  },
  created() {
    this.textareaComments = this.comments;
  },
  methods: {
    closeModel() {
      this.$emit("closemodel", false);
    },
    addNewComment(id) {
      if(this.input.length > 0) {
        console.log("New Comment: " + this.input + " for task with id: " + id);
        this.textareaComments.push(this.input);

        db.collection("Tasks").doc(id).update({
          Comment: this.textareaComments,
        }).then(() => {
          console.log("Comment successfully add!");
        })
      }
    }
  }
}

</script>

<style scoped>

#comment{
  border: 1px solid black;
  height: 200px;
  width: 420px;
  overflow-x: hidden;
  overflow-y: auto;
}

#btnComment{
  margin-left: 10px;
  width: 50px;
}

.model-popup {
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

.modal-dialog {
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
.modal-title {
  margin: 20px;
}

.modal-footer .btn {
  margin: 5px;
}
</style>