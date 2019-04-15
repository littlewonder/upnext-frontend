// const BACKEND_URL = "http://localhost:5000"
const BACKEND_URL = '/api'
var evSource = null
var openEventSources = []
window.openEventSources = openEventSources

window.addEventListener('beforeUnload', () => {
  for (let src of window.openEventSources) {
    src.close()
  }
})

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function getAuthHeaders() {
  return new Headers({
    'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
  })
}

async function performLogin(firstname, lastname, userid, email) {
  let formData = new FormData()
  formData.append('user_id', userid)
  formData.append('firstname', firstname)
  formData.append('lastname', lastname)
  formData.append('email', email)

  let response = await fetch(`/api/login`,{
    method: 'POST',
    body: formData,
  })
  let respJson = await response.json()

  sessionStorage.setItem('currentUser', JSON.stringify({
    firstname: firstname,
    lastname: lastname,
    userid: userid
  }))
  sessionStorage.setItem('jwtToken', respJson['token'])

  setCookie('userid', userid, 1)
}

function signOut() {
  sessionStorage.removeItem('currentUser')
  sessionStorage.removeItem("jwtToken")
}

async function getAuthToken() {
  return sessionStorage.getItem('jwtToken')
}

async function requestSong(url, dedicated_to) {
  let formData = new FormData()
  formData.append('url', url)
  formData.append('dedicated_to', dedicated_to)

  let response = await fetch(`/api/link/new`, {
    method: 'POST',
    body: formData,
    headers: getAuthHeaders()
  })
  return response
}

async function mySubmissions() {
  let response = await fetch('/api/link/by_me', {
    headers: getAuthHeaders()
  })
  return response
}

async function upvoteLink(linkId) {
  let formdata = new FormData()
  formdata.append('link_id', linkId)

  let response = await fetch('/api/link/upvote', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formdata
  })
  return response
}

async function downvoteLink(linkId) {
  let formdata = new FormData()
  formdata.append('link_id', linkId)

  let response = await fetch('/api/link/downvote', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formdata
  })
  return response
}

async function submissionsByMe() {
  let response = await fetch('/api/link/by_me', {
    headers: getAuthHeaders(),
    method: 'GET'
  })
  return response
}

async function nowPlaying() {
  let response = await fetch('/api/radio/now_playing', {
    headers: getAuthHeaders(),
    method: 'GET'
  })
  return response.json()
}

async function upNextSongs() {
  let response = await fetch('/api/radio/queue', {
    headers: getAuthHeaders(),
    method: 'GET'
  })
  return response.json()
}

function subscribeTo(hooktype, cb) {
  let evSource = new EventSource('/api/subscribe?hooktype='+hooktype)
  evSource.onopen = () => console.log('subscribed to', hooktype)
  evSource.onclose = () => console.log('closed for', hooktype)
  evSource.onerror = () => console.log('error at', hooktype)
  evSource.onmessage = (e) => {
    let data = JSON.parse(e.data)
    console.log('SSE:', hooktype)
    cb(data)
  }
}

function subscribeToEvents(nowPlayingCb, queueCb) {
  evSource = new EventSource('/api/subscribe')
  window.evSource = evSource
  evSource.onopen = () => {
    console.log('event source is open for subscription')
  }
  evSource.onclose = () => {
    console.log('event source is CLOSED')
  }
  evSource.onmessage = (e) => {
    let data = JSON.parse(e.data)
    nowPlayingCb(data.now_playing, data.player_cur_time_sec)
    queueCb(data.queue)
  }

  window.addEventListener('beforeUnload', () => {
    console.log('closing event source')
    evSource.close()
  })
}



module.exports = {
  performLogin,
  getAuthToken,
  signOut,
  requestSong,
  mySubmissions,
  upvoteLink,
  downvoteLink,
  submissionsByMe,
  nowPlaying,
  upNextSongs,
  subscribeToEvents,
  subscribeTo,
}
