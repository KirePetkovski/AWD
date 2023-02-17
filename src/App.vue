<template >
  <NavigationTop :user="user"/>
  <router-view />
<!--  <LogInFirebase @activeuser="ActiveUser($event)"/>-->
</template>

<script>

import NavigationTop from "@/components/Navigation";


export default {
  name: 'App',
  components: { NavigationTop},
}
</script>

<style>

.router-link{
  margin-left: 30px;
  font-size: 20px;
  text-decoration: none;
}

.active{
  color: green;
}

</style>
