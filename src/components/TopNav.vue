<template>
    <div class="nav">
      <div class="logo">
        <img src="../assets/upnextlogo.svg" alt="upnext.dj">
      </div>
      <div class="login" v-if="isLoggedIn">
        <div class="dp">{{getLetter}}</div>
        <div class="info">
          <p contenteditable="true">{{username}}</p>
          <button @click="signOut">Sign Out</button>
        </div>
      </div>
    </div>
</template>


<script>
  import api from '../api'

export default {
  name: 'TopNav',
  props: ['isLoggedIn'],
  data() {
    return {
    }
  },
  computed: {
    getLetter: function() {
      return this.username.slice(0, 1).toUpperCase();
    },
    username() {
      if (sessionStorage.currentUser){
        let u = JSON.parse(sessionStorage.currentUser)
        console.log(u)
        return `${u.firstname} ${u.lastname}`
      }
      return 'Please sign in'
    }
  },
  methods: {
    async signOut() {
      console.log('doing signout')
      window.gapi.auth2.getAuthInstance().signOut()
      api.signOut()
    },
  }
}
</script>
