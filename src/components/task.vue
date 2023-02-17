<template>
  <div class="container" style="margin-top: 100px">
    <h2 class="text-center mt-5 mb-5">Task App</h2>
    <div v-show="user.role === 'admin'">
      <div class="d-flex m-5">
        <label class="m-2" for="newTask">Create new task: </label>
        <input type="text" placeholder="New task" class="form-control m-2" id="newTask" v-model="newTaskDescription">
        <select v-model="givenUser" class="m-2">
          <option v-for="(user, index) in Users" :key="index" v-bind:value="user.username">
            {{ user.username }}
          </option>
        </select>
        <button @click="addTask" class="btn btn-warning rounded-0 m-2">Submit</button>
      </div>
    </div>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link" type="button" role="tab"
                @click="ChangeTab('New tasks')">New tasks
        </button>
        <button class="nav-link" type="button" role="tab"
                @click="ChangeTab('My tasks')">My tasks
        </button>
        <button class="nav-link" type="button" role="tab"
                @click="ChangeTab('Finished tasks')">Finished tasks
        </button>
        <button class="nav-link" type="button" role="tab" v-show="user.role === 'admin'"
                @click="ChangeTab('Task in Progress')">Task in Progress
        </button>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div v-if="activeTab === 'New tasks'" role="tabpanel">
        <NotTaken :tasks="tasks.sort((a, b) => b.task_id - a.task_id)"
                  :role="user.role" :user="user.username"
                  @deleteTasks=" this.tasks.splice(index, 1);"
                  @changeStatus=" this.tasks[$event].status = 'In Progress'"
                  @changeUser="this.tasks[$event.tasksIndex].user = $event.user"
                  @editTask="this.tasks[$event.tasksIndex].description = $event.description"
        />
      </div>
      <div v-if="activeTab === 'My tasks'" role="tabpanel">
        <MyTasks :tasks="tasks.sort((a, b) => b.task_id - a.task_id)"
                 :user="user.username"
                 @closeTask="this.tasks[$event.tasksIndex].status = $event.status"
        />
      </div>
      <div v-if="activeTab === 'Finished tasks'" role="tabpanel">
        <Finished :tasks="tasks.sort((a, b) => b.task_id - a.task_id)"
                  :role="user.role" :user="user.username"
        />
      </div>
      <div v-if="activeTab === 'Task in Progress'" role="tabpanel">
        <TakenBy :tasks="tasks.sort((a, b) => b.task_id - a.task_id)"
                 @editTask="this.tasks[$event.tasksIndex].description = $event.description"
        />
      </div>
    </div>

  </div>
</template>

<script>
import NotTaken from "@/components/SubTaskComponents/NotTaken.vue";
import Finished from "@/components/SubTaskComponents/Finished.vue";
import MyTasks from "@/components/SubTaskComponents/MyTasks.vue";
import TakenBy from "@/components/SubTaskComponents/TakenBy.vue";

import db from "@/firebase/config.js";

export default {
  name: 'task-app',
  props: {
    msg: String
  },
  components: {
    NotTaken, Finished, MyTasks, TakenBy,
  },
  data() {
    return {
      activeTab: 'New tasks',
      newTaskDescription: '',
      tasks: [],
      NextIDTask: 0,
      user: {
        username: window.localStorage.getItem('username'),
        role: window.localStorage.getItem('role'),
      },
      Users: [{'username': ''}].sort(),
      givenUser: "",
      status: "Not taken",
    }
  },

  created() {

    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var getUser = {
          'username': doc.data().Username,
        }
        this.Users.push(getUser);
      });
    });

    db.collection("Tasks").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!this.tasks.find(({id}) => id === doc.id)) {
          const task = {
            'id': doc.id,
            'task_id': doc.data().ID,
            'description': doc.data().Description,
            'status': doc.data().Status,
            'user': doc.data().User,
            'comments': doc.data().Comment,
          }
          console.log("CREATE for: " + this.user.username + " " + this.user.role);
          this.tasks.push(task);
        }
        if (this.NextIDTask <= doc.data().ID) {
          this.NextIDTask = doc.data().ID;
        }
      });
    });
  },
  mounted() {
    this.Users.sort();
  },
  methods: {
    TaskDelete(index) {
      this.tasks.splice(index, 0);
    },
    addTask() {
      if (this.newTaskDescription.length > 0) {
        if (this.givenUser !== "") {
          this.status = "In Progress";
        } else {
          this.status = "Not Taken";
        }
        const task = {
          'Comment': [],
          'Description': this.newTaskDescription,
          'ID': this.NextIDTask + 1,
          'User': this.givenUser,
          'Status': this.status,
        }
        db.collection("Tasks").add(task)
            .then(
                this.tasks = []
            );
      }
      this.newTaskDescription = "";
      this.givenUser = "";
    },
    ChangeTab(TabName) {
      console.log(TabName);
      this.activeTab = TabName;
      console.log("active tab: " + this.activeTab);
    },

  }
}
</script>

<style>
.mausePoiner:hover {
  cursor: pointer;
}
</style>