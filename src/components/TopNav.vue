<template>
    <div class="nav">
      <div class="logo">
        <img src="../assets/upnextlogo.svg" alt="upnext.dj">
      </div>
      <div class="login">
        <div class="dp">{{getLetter}}</div>
        <div class="info">
          <p contenteditable="true">{{username}}</p>
          <button @click="performLogin">Sign In</button>
          <loading-ellipsis v-if="!loggedIn" />
        </div>
      </div>
    </div>
</template>


<script>
  import api from '../api'
  import LoadingEllipsis from './LoadingEllipsis'

export default {
  name: 'TopNav',
  components: {
    LoadingEllipsis
  },
  data() {
    return {
      username: 'Your name        ',
      loggedIn: false,
    }
  },
  async created() {
    await this.performLogin()
  },
  computed: {
    getLetter: function() {
      return this.username.slice(0, 1).toUpperCase();
    },
  },
  methods: {
    async performLogin() {
      this.loggedIn = false

      let firstname = this.username.split(' ')[0],
          lastname = this.username.split(' ')[1],
          userid = String(Math.round(Math.random() * 1000))
      await api.performLogin(firstname, lastname, userid)

      this.loggedIn = true
    },
  }
}
</script>
