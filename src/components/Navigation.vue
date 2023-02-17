<template>
  <header :class="{'scrolled-nav': scrollPosition}">
    <nav>
      <a class="navbar-brand  p-2" href="#">
        Task App |
      </a>
      <ul v-show="!mobile" class="navigation">
        <li>
          <router-link class="router-link" :to="{name: 'Home'}"> Home </router-link>
        </li>
        <li>
          <router-link class="router-link" :to="{name: 'Task'}"> Task </router-link>
        </li>
        <li  v-show="!log">
          <router-link class="router-link" :to="{name: 'LogIn'}"> Log in </router-link>
        </li>
        <li v-show="log">
          <button id="logoutBorder" class="router-link" @click="LogOut()"> Log out</button>
        </li>
      </ul>
      <div class="icon">
        <i @click="toggleMobileNav()" v-show="mobile" class="fa fa-bars" :class="{'icon-active': mobileNav }"></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li>
            <router-link class="router-link" :to="{name: 'Home'}"> Home </router-link>
          </li>
          <li>
            <router-link class="router-link" :to="{name: 'Task'}"> Task </router-link>
          </li>
          <li  v-show="!log">
            <router-link class="router-link" :to="{name: 'LogIn'}"> Log in </router-link>
          </li>
          <li v-show="log">
            <button id="logoutBorderMobile" class="router-link" @click="LogOut()"> Log out</button>
          </li>
        </ul>
      </transition>
      <div class="text-center p-2">
        <span class="fa fa-user-o LogInUser"></span>
        <span>{{ user.username  }}</span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation-Top",
  //props: ['user'],
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      log: null,
      user: {
        username: window.localStorage.getItem('username'),
        role: window.localStorage.getItem('role'),
      },
      reload: false,
    }
  },
  created() {

    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();

    this.log = this.user.username !== '';
    //console.log("NEW Navigation \n"+ this.user.username + "\n" + this.user.role);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    LogOut() {
      window.localStorage.setItem('username', '');
      window.localStorage.setItem('role', '');
      this.log = false;
      this.$router.go(0);
    }
  },
}
</script>

<style scoped>
header {
  background-color: black;
  z-index: 99;
  width: 100%;
  transition: 0.5s ease all;
  color: white;
}

.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
}

nav {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  transition: .5s ease all;
  margin: 0 auto;
  width: 90%;
}

li {
  list-style: none;
  text-decoration: none;
  display: inline-block;
}

a {
  color: white;
  font-weight: 500;
  text-transform: uppercase;
}

.router-link {
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  transition: .5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}

.router-link:hover {
  color: #00afae;
  border-color: #00afae;;
}

.icon {
  display: flex;
  top: 0;
  right: 24px;
  height: 100%;
  align-items: center;
  position: absolute;
}

i {
  cursor: pointer;
  font-size: 24px;
  transition: 0.8s ease all;
}

.icon-active {
  transform: rotate(180deg);
}

.dropdown-nav {
  background-color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  top: 0;
  left: 0;
}

.dropdown-nav li {
  margin-left: 0;
}

.dropdown-nav li .router-link {
  color: black;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 1s ease all;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.LogInUser {
  font-size: 30px;
  margin: 0 20px;
}
#logoutBorder{
  padding-top: 4px;
  background-color: black;
  border-top: none;
  border-left: none;
  border-right: none
}
#logoutBorderMobile{
  background-color: white;
  padding-top: 4px;
  margin-left: 25px;
  border: none;
}
</style>