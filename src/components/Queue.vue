<template>
  <div class="queue">
    <h1>Up Next</h1>
    <div class="songlist">
      <div class="song" v-for="(item,i) in queue" v-bind:key="i">
        <div class="upvotes">
          <img src="../assets/upvote.svg" class="upvote">
          <p>{{item.upvotes}}</p>
          <img src="../assets/downvote.svg" class="downvote">
        </div>
        <div class="details">
          <h3>{{item.song}}</h3>
          <h4>{{item.channel}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Queue",
  data() {
    return {
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
    }
  }
}
</script>
