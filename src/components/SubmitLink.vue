<template>
          <div class="request">
            <h1>Request Song
                <span class="loading" v-if="saving">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </h1>
            <div class="link">
              <input v-model="url" type="text" placeholder="https://www.youtube.com/watch?v=yOJQyZJcRso">
            </div>
            <div class="dedicate">
              <label>Dedicate to</label>
              <input v-model="dedicatedTo" type="text" placeholder="Type a Name...">
              <button @click="submitLink">Request Song</button>
            </div>
          </div>
</template>

<script>
import api from '../api'
export default {
    name: 'SubmitLink',
    data() {
        return {
            url: '',
            dedicatedTo: '',
            saving: false
        }
    },
    methods: {
        async submitLink () {
            console.log(this.url, this.dedicatedTo)
            this.saving = true
            let res = await api.requestSong(this.url, this.dedicatedTo)
            let resjson = await res.json()
            if (res.ok) {
                this.saving = false
                this.url = ''
                this.dedicatedTo = ''
            }else {
                alert('Failed :( ' + resjson.message)
            }
        }
    }
}
</script>


<style scoped>
@keyframes blink {
  0% {
    opactiy: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
}

.loading span {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.loading span:nth-child(2) {
  animation-delay: .2s
}

.loading span:nth-child(3) {
  animation-delay: .4s;
}
</style>