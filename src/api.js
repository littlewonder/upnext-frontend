// const BACKEND_URL = "http://localhost:5000"
const BACKEND_URL = '/api'


function getAuthHeaders() {
  return new Headers({
    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
  })
}

async function performLogin() {
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    user_id: '101',
    firstname: 'Abhishek',
    lastname: 'Sharma'
  }

  let formData = new FormData()
  formData.append('user_id', '101')
  formData.append('firstname', 'Abhishek')
  formData.append('lastname', 'Sharma')

  let response = await fetch(`/api/login`,{
    method: 'POST',
    body: formData,
  })
  let respJson = await response.json()

  localStorage.setItem('currentUser', JSON.stringify(currentUser))
  localStorage.setItem('jwtToken', respJson['token'])
}

async function getAuthToken() {
  if (localStorage.getItem('jwtToken') == null) {
    await performLogin()
  }
  return localStorage.getItem('jwtToken')
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
  return response.json()
}

async function upvoteLink(linkId) {
  let formdata = new FormData()
  formdata.append('link_id', linkId)

  let response = await fetch('/api/link/upvote', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formdata
  })
  return response.json()
}

async function downvoteLink(linkId) {
  let formdata = new FormData()
  formdata.append('link_id', linkId)

  let response = await fetch('/api/link/upvote', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: body
  })
  return response.json()
}

async function submissionsByMe() {
  let response = await fetch('/api/link/by_me', {
    headers: getAuthHeaders(),
    method: 'GET'
  })
  return response.json()
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
  requestSong,
  mySubmissions,
  upvoteLink,
  downvoteLink,
  submissionsByMe,
  nowPlaying,
  upNextSongs,
}
