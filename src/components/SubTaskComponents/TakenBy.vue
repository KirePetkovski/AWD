<template>
  <div>
    <table class="table mt-1">
      <thead>
      <tr>
        <th scope="col" class="col-1">ID</th>
        <th scope="col" class="col-8">Task</th>
        <th scope="col" class="col-4">Status</th>
        <th scope="col" class="col-4">User</th>
        <th scope="col" class="col-1">Comment</th>
        <th scope="col" class="col-1">Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in tasks" :key="index" v-show="task.status === 'In Progress'">
        <td>{{ task.task_id }}</td>
        <td>{{ task.description }}</td>
        <td>{{ task.status }}</td>
        <td>{{ task.user }}</td>
        <td>
          <div class="text-center"  @click="CommentTask(task.id, task.task_id, index)">
            <span class="fa fa-comment-o mausePoiner"></span>
          </div>
        </td>
        <td>
          <div class="text-center" @click="editTask(task.id, task.task_id, index )">
            <span class="fa fa-edit mausePoiner"></span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div>
    <CommentModal @closemodel="modalComment = $event" v-if="modalComment"
                  :modal_id="modal_id"
                  :modal_number="modal_number"
                  :availableComment="availableComment"
                  :comments="comments"
    />
    <EditModal @closemodel="closeModalEdit($event)" v-if="modalEdit"
               :tasksIndex="tasksIndex"
               :modal_id="modal_id"
               :modal_number="modal_number"
               :modal_description="modal_description"
    />
  </div>
</template>

<script>
import CommentModal from "@/components/Modals/Comment";
import EditModal from "@/components/Modals/Edit";


export default {
  name: "TakenBy-task",
  components: {EditModal, CommentModal},
  props: ['tasks'],
  data(){
    return{
      modalComment: false,
      availableComment: null,
      modalEdit: false,
      modal_id: null,
      modal_number: null,
      modal_description: null,
      confirmButton: false,
      tasksIndex: null,
      comments: []
    }
  },
  methods:{
    CommentTask(id, task_id, index){
      console.log("Comment to task: " + task_id);
      console.log(this.tasks[index].comments);
      this.comments = this.tasks[index].comments;
      this.modalComment = true;
      this.availableComment = true;
      this.modal_id = id;
      this.modal_number = task_id;
    },
    editTask(id, task_id, index) {
      console.log("Editing task: " + id);

      this.modalEdit = true;
      this.modal_id = id;
      this.modal_description = this.tasks[index].description;
      this.tasksIndex = index;
      this.modal_number = task_id;
    },
    closeModalEdit({modalEdit, confirmButton, tasksIndex, description}){

      this.modalEdit = modalEdit;
      this.confirmButton = confirmButton;

      if (this.confirmButton) {
        this.$emit("editTask", {tasksIndex: tasksIndex, description: description});
        this.confirmButton = false;
      }
    },
  }
}
</script>

<style scoped>
.mausePoiner:hover {
  cursor: pointer;
}
</style>