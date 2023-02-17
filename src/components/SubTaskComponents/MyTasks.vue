<template>
  <div>
    <table class="table mt-1">
      <thead>
      <tr>
        <th scope="col" class="col-1">ID</th>
        <th scope="col" class="col-8">Task</th>
        <th scope="col" class="col-2">Status</th>
        <th scope="col" class="col-1">Comment</th>
        <th scope="col" class="col-1">Close</th>
        <!--      <th scope="col" class="col-1">Reject</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in tasks" :key="index" v-show="task.status === 'In Progress' && task.user === this.user ">
        <td>{{ task.task_id }}</td>
        <td>{{ task.description }}</td>
        <td>
          <div class="mausePoiner" style="display: inline-block">
            <span id="status" @click="ChangeStatus(index)">{{ status[index] }}</span>
          </div>
            <span id="errorStatus" class="fa fa-exclamation-circle" v-show="errorStatus[index]"
                  data-toggle="tooltip" data-placement="bottom" title="Please change the status!"></span>
        </td>
        <td>
          <div class="text-center" @click="CommentTask(task.id, task.task_id, index)">
            <span class="fa fa-comment-o mausePoiner"></span>
          </div>
        </td>
        <td>
          <div class="text-center" @click="FinishedTask(task.id, index)">
            <span class="fa fa-check mausePoiner"></span>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div>
    <CommentModal @closemodel="modalComment = $event" v-if="modalComment" :modal_id="modal_id"
                  :modal_number="modal_number" :availableComment="availableComment" :comments="comments"/>
  </div>
</template>

<script>
import db from "@/firebase/config";
import CommentModal from "@/components/Modals/Comment.vue";

export default {
  name: "MyTasks",
  components: {CommentModal},
  props: ['tasks','user'],
  data() {
    return {
      commentTaskId: null,
      modalComment: false,
      availableComment: false,
      modal_id: null,
      modal_number: null,
      availableStatuses: ["Release", "Rejected", "Finished"],
      status: [],
      comments: [],
      pom: 0,
      errorStatus: [],
      myTasks: [],
    }
  },
  created() {
    for (let i = 0; i < this.tasks.length; i++) {
      this.status.push("In Progress");
    }
  },
  methods: {
    CommentTask(id, task_id, index) {
      console.log("Comment to task: " + task_id);
      console.log(this.tasks[index].comments);
      this.comments = this.tasks[index].comments;
      this.modalComment = true;
      this.availableComment = true;
      this.modal_id = id;
      this.modal_number = task_id;
    },
    FinishedTask(id, index) {
      var releaseUser = this.tasks[index].user;
      if (this.status[index] !== "In Progress") {

        if (this.status[index] === "Release") {
          releaseUser = "null";
        }

        this.errorStatus[index] = false;

        this.$emit("closeTask", {tasksIndex: index, status: this.status[index]});

        db.collection("Tasks").doc(id).update({
          Status: this.status[index],
          User: releaseUser,
        }).then(() => {
          console.log("Closing task with " + this.status[index]);
        })
      } else {
        this.errorStatus[index] = true;
      }
    },
    ChangeStatus(index) {
      this.pom++;
      if (this.pom > 2) {
        this.pom = 0;
      }
      console.log("pom = " + this.pom)
      this.status[index] = this.availableStatuses[this.pom];
    }
  }
}
</script>

<style scoped>
.mausePoiner:hover {
  cursor: pointer;
}

#status:hover {
  background-color: beige;
}

#errorStatus {
  float: right;
  font-size: 22px;
  color: red;
  padding-right: 40px;
}


</style>