<template>
  <div id="app">
    <!--Navigation Bar-->
    <TopNav />

    <!--Navigation Bar-->
    <div class="container">
      <!--Now Playing-->
      <NowPlaying />

      <hr class="divider">
      <div class="bottom">
        <!--Queue-->
        <Queue />

        <div class="aside">
          <!--Request Window-->
          <SubmitLink />
          <hr class="divider">
          <!--My Submissions-->
          <Submissions />

        </div>
      </div>
      <!--My Submissions-->
    </div>
  </div>
</template>

<script>
import "reset-css";
import NowPlaying from './components/NowPlaying'
import Queue from './components/Queue'
import TopNav from './components/TopNav'
import Submissions from './components/Submissions'
import SubmitLink from './components/SubmitLink'

var api = require('./api')

console.log(NowPlaying, Queue)

export default {
  name: "app",
  components: {
    TopNav,
    NowPlaying,
    Queue,
    SubmitLink,
    Submissions
  },
  data() {
    return {
      login: "Abhishek Sharma",
      submissions: []
    };
  },
  computed: {
    getLetter: function() {
      return this.login.slice(0, 1).toUpperCase();
    }
  }
};
</script>

<style lang="scss">
  @import "./app.scss"
</style>
