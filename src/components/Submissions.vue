<template>
    <div class="submissions">
    <h1>My Submissions</h1>
    <div class="list">
        <div class="submission" v-for="(link ,k) in submissions" v-bind:key="k">
          <div class="status">
            <img src="../assets/unplayed.svg" v-if="!(link.is_expired)">
            <img src="../assets/played.svg" v-else>
        </div>
        <div class="subdet">
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
    name: 'Submissions',
    data() {
      return {
        submissions: [],
        apiPollInterval: null
      }
    },
    created() {
      const self = this
      this.apiPollInterval = setInterval(async() => {
        let response = await api.submissionsByMe()
        let respjson = await response.json()
        self.submissions = respjson
      }, 2000)
    },

    beforeDestroy() {
      clearInterval(this.apiPollInterval)
    }
}
</script>

