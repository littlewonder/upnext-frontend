<template>
          <div class="request">
            <h1>Request Song
                <loading-ellipsis v-if="saving" />
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
import LoadingEllipsis from './LoadingEllipsis'

export default {
    name: 'SubmitLink',
    components:{
        LoadingEllipsis,
    },
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