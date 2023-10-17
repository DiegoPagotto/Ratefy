<template>
  <div>
    <header>
      <Navbar :loggedIn="loggedIn" v-if="showNav" />
    </header>

    <router-view>
    </router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: { Navbar, Home, Footer },
  data() {
    return {
      showNav: true,
      loggedIn: false,
      username: '',
      userProfilePic: '',
    };
  },
  methods: {
    verifyToken() {
      const existingToken = sessionStorage.getItem('spotifyToken');
      const urlToken = new URL(window.location.href).searchParams.get('access_token');

      if (urlToken) {
        sessionStorage.setItem('spotifyToken', urlToken);
        window.location.href = `${this.$config.frontEndURL}`;
      }
      if (existingToken || urlToken) {
        this.loggedIn = true
        this.getUsernameAndPic();
      }
    },
    async getUsernameAndPic() {
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('spotifyToken')}` },
      };
      const { data } = await this.$axios.get(`${this.$config.backEndURL}/profile`, config);
      this.username = data.display_name;
      this.userProfile = data.images[0].url;
    },
  },
};
</script>

<style></style>
