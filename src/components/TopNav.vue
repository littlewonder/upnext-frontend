<template>
    <div class="nav">
      <div class="logo">
        <img src="../assets/upnextlogo.svg" alt="upnext.dj">
      </div>
      <div class="login">
        <div class="dp">{{getLetter}}</div>
        <div class="info">
          <p>{{username}}</p>
          <button>Sign Out</button>
        </div>
      </div>
    </div>
</template>


<script>
import api from '../api'

export default {
  name: 'TopNav',
  data() {
    return {}
  },
  async created() {
    await api.performLogin()
  },
  computed: {
    getLetter: function() {
      return this.username.slice(0, 1).toUpperCase();
    },
    username: function() {
      let user = JSON.parse(localStorage.getItem('currentUser'))
      return `${user.firstname} ${user.lastname}`
    }
  }
}
</script>
