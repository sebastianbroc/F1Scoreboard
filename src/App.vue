<template>
  <div class="bg-image"></div>
  <div class="header">
    <h1>F1-Sommer-Season 2022</h1>
  </div>
  <div class="content">
    <DriverList/>
  </div>
</template>

<script>
import DriverList from './components/DriverList.vue'

export default {
  name: 'App',
  components: {
    DriverList
  }
}

</script>

<style>
@font-face {
  font-family: "F1";
  src: local("F1"),
    url(./assets/fonts/Formula1-Regular.ttf) format("truetype");
}

.header {
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(0,0,30,1);
  margin-bottom: 20px;
}
h1 {
  color: #ffffff;
  font-family: "F1";
  text-align: center;
}

.bg-image {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(./assets/austria.jpeg);
  filter: blur(12px);
  -webkit-filter: blur(12px);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.content {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;
  margin-top: 10vh;
}

#app {
  /*background-color: #666666;*/
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
