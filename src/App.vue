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
      nowPlaying: {
        link: null,
        playerTime: 0
      },
      queue: [],
      nextUpdateAt: 0
    };
  },
  computed: {
    getLetter: function() {
      return this.login.slice(0, 1).toUpperCase();
    }
  },
  created() {
    const self = this
    // let subscribed = false
    
    let interval = setInterval(() => {
      if (sessionStorage.jwtToken) {
        // clearInterval(interval)
        self.loggedIn = true
        
        // subscribe to events
        // if (!subscribed) {
        //   api.subscribeToEvents(this.updateNowPlayingData, this.updateQueue)
        //   subscribed = true
        // }
        
      } else {
        self.loggedIn = false
      }
    }, 1000)
  },
  methods: {
    updateNowPlayingData(link, playerTime) {

      this.nowPlaying.playerTime = playerTime
      if (!this.nowPlaying.link)
        this.nowPlaying.link = link
    },
    updateQueueData(newQ) {
      console.log('new q is', newQ)
    }
  }
};
</script>

<style lang="scss">
  @import "./app.scss"
</style>
