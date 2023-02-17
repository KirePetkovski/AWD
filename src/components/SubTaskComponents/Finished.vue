<template>
<div>
  <table class="table mt-1">
    <thead>
    <tr>
      <th scope="col" class="col-1">ID</th>
      <th scope="col" class="col-8">Task</th>
      <th scope="col" class="col-4">Status</th>
      <th scope="col" class="col-4" v-show="role === 'admin'">User</th>
      <th scope="col" class="col-1">Comment</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(task, index) in tasks" :key="index"
        v-show="((task.status === 'Finished' || task.status === 'Rejected')
        && ((task.user === user && role !== 'admin') || (role === 'admin')))">

      <td>{{ task.task_id }}</td>
      <td>{{ task.description }}</td>
      <td>{{ task.status }}</td>
      <td v-show="role === 'admin'">{{ task.user }}</td>
      <td>
        <div class="text-center" @click="CommentTask(task.id, task.task_id, index)">
          <span class="fa fa-comment-o mausePoiner"></span>
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
  </div>
</template>

<script>


import CommentModal from "@/components/Modals/Comment";
export default {
  name: "Finished-tasks",
  components: {CommentModal},
  props: ['tasks', 'user', 'role'],
  data(){
    return {
      modalComment: false,
      modal_id: null,
      modal_number: null,
      availableComment: null,
      comments: [],
    }
  },
  methods: {
    CommentTask(id, task_id,index ){
      console.log("Comment to task: " + task_id);
      this.comments = this.tasks[index].comments;
      this.modalComment = true;
      this.availableComment = true;
      this.modal_id = id;
      this.modal_number = task_id;
    },
  }
}
</script>

<style scoped>
.mausePoiner:hover{
  cursor: pointer;
}
</style>