<template>
  <div class="nowplaying" v-if="nowPlaying">
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
        <h2>{{nowPlaying.link.title}}</h2>
        <h3>{{nowPlaying.link.channel_name}}</h3>
        <div class="progress"></div>
        <p class="dedication">
          <img src="../assets/dedicate.svg">
          Dedicated to {{nowPlaying.submitted_by.firstname}} {{nowPlaying.submitted_by.lastname}} from {{nowPlaying.link.dedicated_to}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'NowPlaying',
  data() {
    return {
      nowPlaying: null,
      player_time: 0,
      nextUpdateAt: 0,
      apiPollInterval: null,
    }
  },
  created() {
    // TODO : replace this impl - instead of replacing iframe, use the iframe api
    console.log('iframe player created')
    const self = this
    this.apiPollInterval = setInterval(async () => {
      let curtime = Date.now() / 1000
      if (curtime > self.nextUpdateAt - 2) { // update 2 seconds earlier to consider network delay
        let radiostate = await api.nowPlaying()
        console.log('updating track > ', radiostate)
        self.nextUpdateAt = (new Date(
          Date.now() + (radiostate.link.duration - radiostate.player_time) * 1000
        )).getTime() / 1000

        self.nowPlaying = radiostate
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.apiPollInterval)
  },
  computed: {
    getCurrentSong: function() {
      let videoId = this.nowPlaying.link.video_id
      let player_time = this.nowPlaying.player_time
      return `http://www.youtube.com/embed/${videoId}?modestbranding=1&autoplay=1&showinfo=0&color=white&iv_load_policy=3&start=${player_time}`
    },

    getCurrentThumbnail: function() {
      let videoId = this.nowPlaying.link.video_id
      return "https://img.youtube.com/vi/" + videoId + "/0.jpg";
    },
  }
}

</script>
