<template>
  <div>
    <table class="table mt-1">
      <thead>
      <tr>
        <th scope="col" class="col-1">ID</th>
        <th scope="col" class="col-8">Task</th>
        <th scope="col" class="col-4">Status</th>
        <th scope="col" class="col-1">Take task</th>
        <th scope="col" class="col-1" v-show="role === 'admin'">Delete</th>
        <th scope="col" class="col-1" v-show="role === 'admin'" >Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in tasks" :key="index" v-show="task.status === 'Not Taken' || task.status === 'Release'">
        <td>{{ task.task_id }}</td>
        <td>{{ task.description }}</td>
        <td>{{ task.status }}</td>
        <td>
          <div class="text-center">
            <span class="fa fa-plus mausePoiner" @click="TakeATask(task.id, index)"></span>
          </div>
        </td>
        <td v-show="role === 'admin'">
          <div class="text-center">
            <span class="fa fa-trash mausePoiner" @click="deleteTask(task.id, task.task_id, index)"></span>
          </div>
        </td>
        <td v-show="role === 'admin'">
          <div class="text-center" @click="editTask(task.id, task.task_id, index )">
            <span class="fa fa-edit mausePoiner"></span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div>
    <DeleteModal @closemodel="closeModalDelete($event)" v-if="modalDelete"
                 :tasksIndex="tasksIndex"
                 :modal_id="modal_id"
                 :modal_number="modal_number"
                 :tasks="tasks"
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
import db from "@/firebase/config.js";
import DeleteModal from "@/components/Modals/Delete.vue";
import EditModal from "@/components/Modals/Edit";
//import task from "@/components/task";

export default {
  name: "NotTaken-task",
  components: {EditModal, DeleteModal},
  props: ['tasks','role', 'user'],
  data() {
    return {
      modalDelete: false,
      modalEdit: false,
      modal_id: null,
      modal_number: null,
      modal_description: null,
      confirmButton: false,
      tasksIndex: null,
    }
  },

  methods: {
    TakeATask(id, index) {
      this.$emit("changeStatus", index);
      this.$emit("changeUser", {tasksIndex: index, user: this.user});

      db.collection("Tasks").doc(id).update({
        User: this.user,
        Status: "In Progress"
      }).then(() => {
        console.log("Successfully taken task");
      })
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
        this.$emit("editTask", {tasksIndex: tasksIndex, description:description});
        this.confirmButton = false;
      }

    },
    deleteTask(id, task_id, index) {
      console.log("Deleting task: " + id);
      this.modalDelete = true;
      this.modal_id = id;
      this.tasksIndex = index;
      this.modal_number = task_id;
    },
    closeModalDelete({modalDelete, confirmButton, tasksIndex}) {
      this.modalDelete = modalDelete;
      this.confirmButton = confirmButton;

      if (this.confirmButton) {
        this.$emit("deleteTasks", tasksIndex);
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