<template>
  <div class="queue">
    <h1>Up Next</h1>
    <div class="songlist" v-if="queue.length > 0">
      <div class="song" v-for="(link, i) in queue" v-bind:key="i">
        <div class="upvotes">
          <img src="../assets/upvote.svg" class="upvote">
          <p>{{link.total_votes}}</p>
          <img src="../assets/downvote.svg" class="downvote">
        </div>
        <div class="details">
          <h3>{{link.title}}</h3>
          <h4>{{link.channel_name}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: "Queue",
  data() {
    return {
      queue: [],
      apiPollInterval: null,
    }
  },
  created() {
    const self = this
    this.apiPollInterval = setInterval(async() => {
      let resp = await api.upNextSongs()
      for (let i = 0; i < resp.links.length; i++) {
        let lid = String(resp.links[i].link_id)
        if (resp.votes[lid])
          resp.links[i]['my_vote'] = resp.votes[lid]
        else
          resp.links[i]['my_vote'] = 0
      }

      self.queue = resp.links
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.apiPollInterval)
  }
}
</script>
