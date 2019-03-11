<template>
    <div class="submissions">
    <h1>My Submissions</h1>
    <div class="list">
        <div class="submission" v-for="(sub,k) in submissions" v-bind:key="k">
        <div class="status">
            <img src="../assets/played.svg" v-if="(sub.ifPlayed)">
            <img src="../assets/unplayed.svg" v-else>
        </div>
        <div class="subdet">
            <h3>{{sub.song}}</h3>
            <h4>{{sub.channel}}</h4>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'Submissions',
    data() {
        return {
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

