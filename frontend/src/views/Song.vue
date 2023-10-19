<template>
    <div class="container glassmorphic-container" style="width: 100%; min-height: 80vh;">
        <div class="row justify-content-center">
            <div class="col-11 mt-3">
                <SongIFrame :songURI="this.$route.params.trackId" />
            </div>
        </div>
    </div>
</template>
  
<script>
import SongIFrame from "../components/SongIFrame.vue";

export default {
    data() {
        return {
            songData: null,
        };
    },
    methods: {
        async fetchSong() {
            const token = sessionStorage.getItem('spotifyToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await this.$axios.get(
                `${this.$config.backEndURL}/song?songId=${this.$route.params.trackId}`,
                config
            );
            this.songData = data;
            console.log(this.songData);
        },
    },
    created() {
        this.fetchSong();
    },
    components: { SongIFrame },
};
</script>

  
<style scoped>

</style>
  