<script>
import VueCookies from 'vue-cookies'
export default {
  mounted() {
    if ($cookies.get("lang") == null) {
      $cookies.set("lang", "fr");
    } else {
      var engPhoto = document.querySelector("#engPhoto")
      var frPhoto = document.querySelector("#frPhoto")
      if ($cookies.get("lang") == "fr") {
        engPhoto.style.display = "none";
        frPhoto.style.display = "block";
      }
      if ($cookies.get("lang") == "eng") {
        engPhoto.style.display = "block";
        frPhoto.style.display = "none";
      }
    }
  },
  methods: {
    langSwitch() {
      var engPhoto = document.querySelector("#engPhoto")
      var frPhoto = document.querySelector("#frPhoto")
      if ($cookies.get("lang") == "fr") {
        engPhoto.style.display = "block";
        frPhoto.style.display = "none";
        $cookies.set("lang", "eng");
      } else {
        engPhoto.style.display = "none";
        frPhoto.style.display = "block";
        $cookies.set("lang", "fr");
      }
      this.emitter.emit('lang-switch');
    }
  }
}
</script>

<template>
  <div id="langSelect" @click="langSwitch()">
    <div id="frPhoto"></div>
    <div id="engPhoto"></div>
  </div>
</template>

<style scoped>
#frPhoto {
  display: block;
  width: 20px;
  height: 20px;
  content: url("https://cdn-icons-png.flaticon.com/512/197/197560.png");
}

#engPhoto {
  display: none;
  width: 20px;
  height: 20px;
  content: url("https://cdn-icons-png.flaticon.com/512/197/197374.png");
}
</style>
