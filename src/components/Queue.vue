<template>
  <div class="queue">
    <h1>Up Next
    </h1>
    <div class="songlist" v-if="queue.length > 0">
      <div class="song" v-for="(link, i) in queue" v-bind:key="i">
        <div class="upvotes">
          <img @click="upvote(link, i)" src="../assets/upvote-done.svg" class="upvote" v-if="link.my_vote==1">
          <img @click="upvote(link, i)" src="../assets/upvote.svg" class="upvote" v-else>
          <p>{{link.total_votes}}</p>
          <img @click="downvote(link, i)" src="../assets/downvote-done.svg" class="downvote" v-if="link.my_vote==-1">
          <img @click="downvote(link, i)" src="../assets/downvote.svg" class="downvote" v-else>
        </div>
        <div class="details">
          <h3>{{link.title}}</h3>
          <h4>{{link.channel_name}}</h4>
        </div>
      </div>
    </div>
    <div v-else>
      <br />
      <h3>Empty queue. Request song to make everyone listen to it. </h3>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: "Queue",
  props: [
    "updateMethod"
  ],
  data() {
    return {
      queue: [],
      apiPollInterval: null,
      apiLocked: false,
    }
  },
  created() {
    const that = this
    api.subscribeTo('queue', (resp) => {
      if (!resp.links) {
        that.queue = []
        return
      }
      for (let i = 0; i < resp.links.length; i++) {
        let lid = String(resp.links[i].link_id)
        resp.links[i]['my_vote'] = resp.votes[lid] || 0
      }
      that.queue = resp.links
    })
  },
  beforeDestroy() {
    clearInterval(this.apiPollInterval)
  },
  methods: {
    async upvote(link, i) {
      this.apiLocked = true
      
      let response = await api.upvoteLink(link.link_id)
      if (!response.ok) {
        alert(`Upvote failed on ${link.link_id}`)
      }
      let oldscore = this.queue[i].my_vote
      let my_vote = 1
      let total_votes = this.queue[i].total_votes
      
      if (oldscore == 1)
        total_votes += 0
      else if (oldscore == -1)
        total_votes += 2
      else
        total_votes += 1
      
      console.log(this.queue[i].total_votes, total_votes, my_vote)
      
      Object.assign(this.queue[i], {total_votes: total_votes, my_vote: my_vote})
      
      this.apiLocked = false
    },
    
    async downvote(link, i) {
      this.apiLocked = true
      
      let response = await api.downvoteLink(link.link_id)
      if (!response.ok) {
        alert(`Downvote failed on ${link.link_id}`)
      }
      let oldscore = this.queue[i].my_vote
      let my_vote = -1
      let total_votes = this.queue[i].total_votes
      
      if (oldscore == -1)
        total_votes += 0
      else if (oldscore == 1)
        total_votes += -2
      else
        total_votes += -1
      
      console.log(this.queue[i].total_votes, total_votes, my_vote)
      Object.assign(this.queue[i], {total_votes: total_votes, my_vote: my_vote})

      this.apiLocked = false
    }
  }
}
</script>


<style>
  .upvote, .downvote {
  cursor: pointer;
  }
</style>
