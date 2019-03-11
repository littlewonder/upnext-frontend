<template>
    <div class="nav">
      <div class="logo">
        <img src="../assets/upnextlogo.svg" alt="upnext.dj">
      </div>
      <div class="login">
        <div class="dp">{{getLetter}}</div>
        <div class="info">
          <p>{{login}}</p>
          <button>Sign Out</button>
        </div>
      </div>
    </div>
</template>


<script>
export default {
    name: 'TopNav',
    data() {
      return {
        login: 'Abhishek SHarma'
      }
    },
    computed: {
        getLetter: function() {
        return this.login.slice(0, 1).toUpperCase();
        }
    }
}
</script>
