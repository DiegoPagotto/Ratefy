<template>
  <div class="container glassmorphic-container" style="width: 100%;">
    <div class="row justify-content-center">
      <img :src="userProfile.images[1].url" alt="Imagem do Perfil" class="profilePic">
    </div>
    <div class="row justify-content-center">
      <h1 class="font-weight-bold">{{ userProfile.display_name }}</h1>
    </div>
    <div class="row justify-content-center text-center mx-5 mt-5">
      <div class="col-4 h4">
        <span class="font-weight-bold">{{ userProfile.followers.total }}</span> seguidores <i class="fa fa-users" aria-hidden="true"></i>
      </div>
      <div class="col-4 h4">
        <span class="font-weight-bold">{{ userProfile.totalRates }}</span> avaliações <i class="fa fa-star" aria-hidden="true"></i>
      </div>
      <div class="col-4 h4">
        <span class="font-weight-bold">{{ userProfile.totalReviews }}</span> resenhas <i class="fa fa-comments" aria-hidden="true"></i>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <h4>Playlists de <span class="font-weight-bold">{{ userProfile.display_name }}</span></h4>
    </div>
    <div class="row my-3">
      <div class="col" v-for="playlistURI in userProfile.playlists" :key="playlistURI">
        <PlaylistIFrame :playlistURI="playlistURI" />
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistIFrame from '../components/PlaylistIFrame.vue';
export default {
  data() {
    return {
      userProfile: null,
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      const token = sessionStorage.getItem('spotifyToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await this.$axios.get(`${this.$config.backEndURL}/profile`, config);
      this.userProfile = data;
      const { data: playlists } = await this.$axios.get(`${this.$config.backEndURL}/playlists`, config);
      this.userProfile.playlists = this.getRandomPlaylists(playlists.items);
    },
    getRandomPlaylists(playlistsArray) {
      const maxPlaylists = Math.min(3, playlistsArray.length);
      const randomURIs = [];

      while (randomURIs.length < maxPlaylists) {
        const randomIndex = Math.floor(Math.random() * playlistsArray.length);
        const randomURI = playlistsArray[randomIndex].uri;

        if (!randomURIs.includes(randomURI)) {
          randomURIs.push(randomURI);
        }
      }

      return randomURIs;
    },

  },
  components: { PlaylistIFrame },
};
</script>

<style scoped>
</style>
