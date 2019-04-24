<template>
  <center v-if="isLeader">
    <h2>I am the leader. Can't serve you :/ </h2>
  </center>
  <center v-else>
    <h2>Please sign in to continue</h2>
    <div ref="signinBtn" class="g-signin2"></div>
  </center>
</template>

<script>
  import api from '../api'
  export default {
    name: 'SignInContainer',
    data() {
      return {
        isLeader: true,
      }
    },
    mounted() {
      let client_id = '373755865350-q39p3p2424k1k86rcou0k8cg3l0475j8.apps.googleusercontent.com'
      let script = document.createElement('script')
      script.setAttribute('src', 'https://apis.google.com/js/platform.js')
      script.setAttribute('async', '')
      script.setAttribute('defer', '')

      let meta = document.createElement('meta')
      meta.setAttribute('name', 'google-signin-client_id')
      meta.setAttribute('content', client_id)

      let scope = document.createElement('meta')
      scope.setAttribute('name', 'google-signin-scope')
      scope.setAttribute('content', 'profile email')

      document.head.appendChild(scope)
      document.head.appendChild(meta)
      document.head.appendChild(script)
    },
    async created() {
      let isLeader = await api.IsLeaderNode()
      this.isLeader = isLeader
      if (isLeader)
        return

      const self = this
      let intv = setInterval(() => {
        if (!window.gapi) {
          return
        }

        window.gapi.load('auth2', () => {
          let client_id = '373755865350-q39p3p2424k1k86rcou0k8cg3l0475j8.apps.googleusercontent.com'
          const auth2 = window.gapi.auth2.init({
            client_id: client_id,
          })

          window.gapi.auth2.getAuthInstance().signOut()

          auth2.attachClickHandler(self.$refs.signinBtn, {
            scope: 'profile email'
          }, googleUser => {
            self.onSignIn(googleUser)
          }, error => {
            console.log('got error here')
            console.log(error)
          })
        })

        clearInterval(intv)
      }, 1000)
    },
    methods: {
      async onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile()
        let userid = profile.getId(),
            firstname = profile.getGivenName(),
            lastname = profile.getFamilyName(),
            email = profile.getEmail()

        await api.performLogin(firstname, lastname, userid, email)
      }
    }

  }
</script>

<style scoped>
  .g-signin2 {
    margin: 30px;
  }
</style>
