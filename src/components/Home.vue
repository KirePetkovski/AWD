<template>
  <div class="container mt-5">

    <div class="divTitle" style="float: right; display: inline-block">
      <div class="text-center" :class="{size: bigSize}">
        <p id="title"> {{ titles[index] }} </p>
      </div>
    </div>
    <div class="divImage">
      <img id="image" :src="require('/src/assets/' + images[index])"/>
    </div>

  </div>

</template>

<script>
export default {
  name: "Home-app",
  data() {
    return {
      images: [
        "code.png",
        "png.png",
        "bootstrap.png",
        "graph.png",
        "firebase.png",
      ],
      titles: [
        "Made by Kire Petkovski 185045",
        "Vue JS",
        "Bootstrap",
        "Free graph",
        "Using Firebase",
      ],
      index: 0,
      bigSize: true,
    }
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  beforeMount() {
    this.IncreaseIndex();
  },
  methods: {
    IncreaseIndex() {
      this.index++;
      if (this.index === 5) {
        this.index = 0;
      }
      //console.log("index " + this.index);
      setTimeout(this.IncreaseIndex, 2000);
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 1200) {
        this.bigSize = true;
        return;
      }
      this.bigSize = false;
      return;
    },
  }

  // mouted() {
  //this.$router.go(0);
  // }
}
</script>

<style scoped>
#image {
  display: inline-block;
  width: 100%;
  height: 100%;
}

#title {
  /*margin-top: 10%;*/
  position: center;
  font-size: 50px;
}

.divImage {
  display: inline-block;
  width: 500px;
  height: 600px;
}

.divTitle {
  width: 500px;
}

.size {
  padding-top: 50%;
}

</style>