var utils = require('./utils'),
    nowPlaying = null,
    nowPlayingInterval = null

async function updateNowPlaying() {
  nowPlaying = await utils.nowPlaying()
  localStorage.setItem('nowplaying', JSON.stringify(nowPlaying))
}

async function startRadio() {
  nowPlayingInterval = setInterval(() => {
    if (nowPlaying == null) {
      updateNowPlaying()
    }
    if ((new Date()).getTime() / 1000 >
        nowPlaying.player_time + nowPlaying.link.duration) {

      updateNowPlaying()
    }
    console.log(nowPlaying.link.url)
  }, 1000)
}

function stopRadio(){
  clearInterval(nowPlayingInterval)
}


module.exports = {
  startRadio,
  stopRadio
}
