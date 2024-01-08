<script>
export default {
  mounted() {
    var langSelect = document.querySelector("#langSelect");
    if (document.cookie == null) {
      document.cookie = "lang=fr;";
    }
    const frFlag = "https://cdn-icons-png.flaticon.com/512/197/197560.png";
    const engFlag = "https://cdn-icons-png.flaticon.com/512/197/197374.png";
    langSwitch();
    langSelect.addEventListener("click", langSwitch);
    function langSwitch(){
      if (document.cookie == "lang=fr") {
        langSelect.firstChild.src = engFlag;
        document.cookie = "lang=eng;";
      } else {
        langSelect.firstChild.src = frFlag;
        document.cookie = "lang=fr;";
      }
    }
  }
}
</script>

<template>
  <div id="langSelect"><img src="https://cdn-icons-png.flaticon.com/512/197/197560.png" width="20px"></div>
</template>

<style scoped>
#langSelect {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 10;
  cursor: pointer;
  user-select: none;
}
</style>
