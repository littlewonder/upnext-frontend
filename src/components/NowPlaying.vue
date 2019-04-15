<template>
<div class="nowplaying" v-if="link != null">
  <h1>Now Playing</h1>
  <div id="player" style="opacity: 0">
      <iframe id="ytplayer" type="text/html" width="114" height="64" :src="getCurrentSong"/>
      frameborder="0" allowfullscreen>
  </div>
  <div class="player">
    <div class="image">
        <img :src="getCurrentThumbnail">
    </div>
    <div class="songinfo">
      <h2>{{link.title}}</h2>
      <h3>{{link.channel_name}}</h3>
      <div class="progress"></div>
      <p class="dedication">
        <img src="../assets/dedicate.svg">
        Dedicated to {{link.dedicated_to}} from {{submitted_by.firstname}}
      </p>
    </div>
  </div>
  </div>
  <div class="nowplaying" v-else>
    <h1>Nothing to play :( </h1>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'NowPlaying',
  // props: [
  //   "link",
  //   "playerTime"
  // ],
  data() {
    return {
      playerTime: 0,
      prevUpdateAt: 0,
      nextUpdateIn: -1,
      nextUpdateAt: 0,
      link: null,
      submitted_by: {
        firstname: '',
        lastname: ''
      }
    }
  },
  updated() {
    console.log('now playing updated')
  },
  async created() {
    // TODO : replace this impl - instead of replacing iframe, use the iframe api
    // get now playing (as subscriptions will work for future updates)
    
    let that = this
    api.subscribeTo('playerTime', async (val) => {
      if (val >= 1 << 30) {
        that.link = null
        return
      }
      let curtime = Date.now() / 1000
      if (that.nextUpdateAt - curtime < 2) {
        // dont know why so many states, but abhi ke liye chal raha
        let res = await api.nowPlaying()
        let link = res.link
        if (!link) {
          that.link = null
          that.nextUpdateAt = 0
          return
        }
        that.prevUpdateAt = curtime
        that.nextUpdateIn = link.duration
        that.nextUpdateAt = curtime + link.duration - val
        that.playerTime = val
        that.submitted_by.firstname = res.submitted_by.firstname
        that.submitted_by.lastname = res.submitted_by.lastname
        that.link = link
      }
    })
    // api.subscribeTo('nowPlaying', (link) => {
    //   that.link = link
    // })
  },
  beforeDestroy() {
    // clearInterval(this.statusMsgInterval)
  },
  computed: {
    getCurrentSong: function() {
      let videoId = this.link.video_id
      let player_time = this.playerTime
      return `http://www.youtube.com/embed/${videoId}?modestbranding=1&autoplay=1&showinfo=0&color=white&iv_load_policy=3&start=${player_time}`
    },

    getCurrentThumbnail: function() {
      let videoId = this.link.video_id
      return "https://img.youtube.com/vi/" + videoId + "/0.jpg";
    },
  }
}

</script>
