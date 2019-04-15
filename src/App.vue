<template>
  <div id="app">
    <!--Navigation Bar-->
    <TopNav :isLoggedIn="loggedIn" />

    <!--Navigation Bar-->
    <div class="container" v-if="loggedIn">
      <!--Now Playing-->
      <!-- <NowPlaying :link="nowPlaying.link" :playerTime="nowPlaying.playerTime" /> -->
      <NowPlaying />

      <hr class="divider">
      <div class="bottom">
        <!--Queue-->
        <Queue />

        <!-- uncomment this div -->
        <!-- <div class="aside"> -->
        <!--   <\!--Request Window-\-> -->
        <!--   <SubmitLink /> -->
        <!--   <hr class="divider"> -->
        <!--   <\!--My Submissions-\-> -->
        <!--   <Submissions /> -->

        <!-- </div> -->
      </div>
      <!--My Submissions-->
    </div>
    <div class="container" v-else>
      <SignInContainer class="requirelogin" />
    </div>
  </div>
</template>

<script>
import "reset-css";
import SignInContainer from './components/SignInContainer'
import NowPlaying from './components/NowPlaying'
import Queue from './components/Queue'
import TopNav from './components/TopNav'
import Submissions from './components/Submissions'
import SubmitLink from './components/SubmitLink'

var api = require('./api')

export default {
  name: "app",
  components: {
    SignInContainer,
    TopNav,
    NowPlaying,
    Queue,
    SubmitLink,
    Submissions
  },
  data() {
    return {
      loggedIn: false,
      isLoggedInInterval: null,
    };
  },
  computed: {
    getLetter: function() {
      return this.login.slice(0, 1).toUpperCase();
    }
  },
  created() {
    const self = this
    
    this.isLoggedInInterval = setInterval(() => {
      if (sessionStorage.jwtToken) {
        // clearInterval(interval)
        self.loggedIn = true
        
      } else {
        self.loggedIn = false
      }
    }, 1000)
  },
  beforeDestroy() {
    window.clearInterval(this.isLoggedInInterval)
  },
  methods: {
  }
};
</script>

<style lang="scss">
  @import "./app.scss"
</style>
