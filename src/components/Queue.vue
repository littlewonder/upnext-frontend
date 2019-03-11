<template>
  <div class="queue">
    <h1>Up Next
    </h1>
    <div class="songlist" v-if="queue.length > 0">
      <div class="song" v-for="(link, i) in queue" v-bind:key="i">
        <div class="upvotes">
          <img @click="upvote(link, i)" src="../assets/upvote.svg" class="upvote">
          <p>{{link.total_votes}}</p>
          <img @click="downvote(link, i)" src="../assets/downvote.svg" class="downvote">
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
      loading: false,
    }
  },
  created() {
    const self = this
    this.apiPollInterval = setInterval(async() => {
      self.loading = true

      let resp = await api.upNextSongs()
      for (let i = 0; i < resp.links.length; i++) {
        let lid = String(resp.links[i].link_id)
        resp.links[i]['my_vote'] = resp.votes[lid] || 0
      }

      self.queue = resp.links

      self.loading = false
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.apiPollInterval)
  },
  methods: {
    async upvote(link, i) {
      let response = await api.upvoteLink(link.link_id)
      if (!response.ok) {
        alert(`Upvote failed on ${link.link_id}`)
      }
    },
    async downvote(link, i) {
      let response = await api.downvoteLink(link.link_id)
      if (!response.ok) {
        alert(`Downvote failed on ${link.link_id}`)
      }
    }
  }
}
</script>