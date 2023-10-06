<template>
  <div class="mt-5">
    <h1>Perfil do Usuário</h1>
    <div v-if="userProfile">
      <h2>{{ userProfile.display_name }}</h2>
      <p>{{ userProfile.email }}</p>
      <img :src="userProfile.images[0].url" alt="Imagem do Perfil" />
    </div>
  </div>
</template>

<script>
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
      const { data } = await this.$axios.get('http://localhost:3000/profile', config);
      this.userProfile = data;
    },
  },
};
</script>
