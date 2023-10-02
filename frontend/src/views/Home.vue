<template>
  <div>
    <h1>Página Inicial</h1>
    <button @click="loginWithSpotify">Login com Spotify</button>
    <router-link to="/profile">
      <button :disabled="isDisabled">Ver perfil</button>
    </router-link>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      isDisabled: true,
    };
  },
  methods: {
    loginWithSpotify() {
      window.location.href = 'http://localhost:3000/login'
    }
  },
  created() {
    const existingToken = sessionStorage.getItem('spotifyToken');
    const tokenFromURL = this.$route.query.access_token;

    if (tokenFromURL) {
      sessionStorage.setItem('spotifyToken', tokenFromURL);
    }

    if (existingToken || tokenFromURL) {
      this.isDisabled = false;
    }
  },
};
</script>
  