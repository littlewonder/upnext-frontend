<template>
  <div id="app">
    <!--Navigation Bar-->
    <div class="nav">
      <div class="logo">
        <img src="./assets/upnextlogo.svg" alt="upnext.dj">
      </div>
      <div class="login">
        <div class="dp">{{getLetter}}</div>
        <div class="info">
          <p>{{login}}</p>
          <button>Sign Out</button>
        </div>
      </div>
    </div>
    <!--Navigation Bar-->
    <!--Now Playing-->
    <div class="container">
      <div class="nowplaying">
        <h1>Now Playing</h1>
        <div class="player">
          <div class="image">
            <img :src="getCurrentThumbnail">
          </div>
          <div class="songinfo">
            <h2>{{current.song}}</h2>
            <h3>{{current.channel}}</h3>
            <div class="progress"></div>
            <p class="dedication">
              <img src="./assets/dedicate.svg">
              Dedicated to {{current.to}} from {{current.from}}
            </p>
          </div>
        </div>
      </div>
      <!--Now Playing-->
      <hr class="divider">
      <!--Queue-->
      <div class="bottom">
        <div class="queue">
          <h1>Up Next</h1>
          <div class="songlist">
            <div class="song" v-for="(item,i) in queue" v-bind:key="i">
              <div class="upvotes">
                <img src="./assets/upvote.svg">
                <p>{{item.upvotes}}</p>
                <img src="./assets/downvote.svg">
              </div>
              <div class="details">
                <h3>{{item.song}}</h3>
                <h4>{{item.channel}}</h4>
              </div>
            </div>
          </div>
        </div>
        <!--Queue-->
        <div class="aside">
          <!--Request Window-->
          <div class="request">
            <h1>Request Song</h1>
            <div class="link">
              <input type="text" placeholder="https://www.youtube.com/watch?v=yOJQyZJcRso">
            </div>
            <div class="dedicate">
              <label>Dedicate to</label>
              <input type="text" placeholder="Type a Name...">
              <button>Request Song</button>
            </div>
          </div>
          <!--Request Window-->
          <hr class="divider">
          <!--My Submissions-->
          <div class="submissions">
            <h1>My Submissions</h1>
            <div class="list">
              <div class="submission" v-for="(sub,k) in submissions" v-bind:key="k">
                <div class="status">
                  <img src="./assets/played.svg" v-if="(sub.ifPlayed)">
                  <img src="./assets/unplayed.svg" v-else>
                </div>
                <div class="subdet">
                  <h3>{{sub.song}}</h3>
                  <h4>{{sub.channel}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--My Submissions-->
    </div>
  </div>
</template>

<script>
import "reset-css";
export default {
  name: "app",
  data() {
    return {
      login: "Abhishek Sharma",
      current: {
        song: "Karmasutra - Official Music Video | Karma | Deep Kalsi",
        channel: "Zee Music Company",
        to: "Vivek Sharma",
        from: "Abhishek",
        url: "https://www.youtube.com/watch?v=WrY4qQEBTHM",
        upvotes: 20,
        ifPlayed: true
      },
      queue: [
        {
          song: "Slow Dancing in a Burning room",
          channel: "John Mayer Vevo",
          upvotes: 12,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM",
          ifPlayed: false
        },
        {
          song: "BOHEMIA - Umeed (Official Music Video)",
          channel: "Bohemia",
          upvotes: 9,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM",
          ifPlayed: false
        },
        {
          song: "Prateek Kuhad - Tum Jab Paas",
          channel: "JioSaavn",
          upvotes: 3,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM",
          ifPlayed: false
        },
        {
          song: "Kyu (Prod. by Sez On The Beat) | Seedhe Maut ...",
          channel: "Seedhe Maut",
          upvotes: 5,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM",
          ifPlayed: false
        },
        {
          song: "Pink Floyd - Comfortably Numb [HD]",
          channel: "David Gilmour",
          upvotes: 2,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM",
          ifPlayed: false
        }
      ],
      submissions: [
        {
          song:
            "Full Power (Yungsta x Frappe Ash) - NaNa (Prod. by Stunnah Beatz...",
          channel: "Frappe Ash",
          ifPlayed: true,
          upvotes: 2,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM"
        },
        {
          song: "Bol Beta | Yungsta | Encore ABJ | Elements | 2018",
          channel: "Yungsta (Full Power)",
          ifPlayed: false,
          upvotes: 2,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM"
        },
        {
          song:
            "Full Power (Yungsta x Frappe Ash) - NaNa (Prod. by Stunnah Beatz...",
          channel: "Frappe Ash",
          ifPlayed: false,
          upvotes: 2,
          to: "Vivek Sharma",
          from: "Abhishek",
          url: "https://www.youtube.com/watch?v=WrY4qQEBTHM"
        }
      ]
    };
  },
  computed: {
    getLetter: function() {
      return this.login.slice(0, 1).toUpperCase();
    },
    getCurrentThumbnail: function() {
      let videoId = this.current.url.split("=")[1];
      return "https://img.youtube.com/vi/" + videoId + "/0.jpg";
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  background-color: #191926;
  max-width: 1120px;
  margin: 0 auto;
}
.divider {
  height: 0px;
  border: 1px solid #252533;
  margin: 40px 0;
}
.nav {
  background-color: #252533;
  padding: 1em;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .login {
    display: flex;
    flex-direction: row;
    align-items: center;
    .dp {
      background: #09d8cc;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      text-align: center;
      line-height: 40px;
      font-size: 1em;
      color: #292b37;
      margin-right: 0.75em;
    }
    .info {
      p {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        line-height: normal;
        font-size: 0.875em;
        color: #09d8cc;
      }
      button {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-size: 0.75em;
        color: rgba(255, 255, 255, 0.5);
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        margin-top: 4px;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
h1 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 2em;
  color: #ffffff;
}
h2 {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 1.5em;
  color: #ffffff;
}
h3 {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 1em;
  color: rgba(255, 255, 255, 0.6);
}
.nowplaying {
  margin-top: 2.5em;
  p {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    color: #09d8cc;
  }
  .image {
    img {
      height: 144px;
      width: 256px;
      object-fit: cover;
    }
    margin-right: 2em;
  }
  .player {
    display: flex;
    flex-direction: row;
  }
  h3 {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }
  h1 {
    margin-bottom: 1em;
  }
}
.request {
  h1 {
    margin-bottom: 1em;
  }
  input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    border-radius: 2px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 1em;
    padding: 8px;
    color: #fff;
    &:focus {
      outline: none;
      border: 1px solid #09d8cc;
    }
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: rgba(255, 255, 255, 0.3);
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: rgba(255, 255, 255, 0.3);
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: rgba(255, 255, 255, 0.3);
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: rgba(255, 255, 255, 0.3);
  }
  label {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 1em;
    margin-right: 0.75em;
    color: rgba(255, 255, 255, 0.8);
  }
  .link {
    margin-bottom: 1.5em;
    input {
      width: 100%;
    }
  }
  .dedicate {
    input {
      width: 53%;
    }
  }
  button {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 1em;
    color: #09d8cc;
    border: 1px solid #09d8cc;
    box-sizing: border-box;
    border-radius: 2px;
    background: transparent;
    padding: 0.5em 0.75em;
    margin-left: 1em;
  }
}
.queue {
  .song {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1.5em 0;
    .upvotes {
      margin-right: 1.5em;
      p {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        font-size: 0.875em;
        text-align: center;
        color: #ffffff;
        margin: 0.4em 0;
      }
    }
  }
  .details {
    h3 {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      font-size: 1em;
      color: rgba(255, 255, 255, 0.8);
    }
    h4 {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      line-height: normal;
      font-size: 0.875em;
      color: rgba(255, 255, 255, 0.4);
      margin-top: 0.5em;
    }
  }
}
.submissions {
  h1 {
    margin-bottom: 1em;
  }
  .list {
    .submission {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 1.5em 0;
    }
    .status {
      margin-right: 1em;
    }
    .subdet {
      h3 {
        color: rgba(255, 255, 255, 0.8);
      }
      h4 {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        line-height: normal;
        font-size: 0.875em;
        color: rgba(255, 255, 255, 0.4);
        margin-top: 0.5em;
      }
    }
  }
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  .bottom {
    display: flex;
    flex-direction: row;
    .aside {
      display: flex;
      flex-direction: column;
      width: 50%;
    }
    .queue {
      width: 50%;
    }
  }
}
</style>
