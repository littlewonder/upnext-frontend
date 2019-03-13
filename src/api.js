// const BACKEND_URL = "http://localhost:5000"
const BACKEND_URL = '/api'


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
}
