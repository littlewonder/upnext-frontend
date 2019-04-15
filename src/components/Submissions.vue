<template>
    <div class="submissions">
      <h1>My Submissions</h1>
      <div class="list">
        <div v-if="submissions.length == 0">
          <h3>No submissions from you.</h3>
        </div>
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
    }
  },
  created() {
    api.submissionsByMe((data) => {
      this.submissions = data
    })
  },
  
  beforeDestroy() {
    // clearInterval(this.apiPollInterval)
  }
}
</script>

