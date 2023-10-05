<template>
  <div>
    <header>
      <Navbar :loggedIn="loggedIn" v-if="showNav" />
    </header>

    <router-view>
      <Home />
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
      showNav: false,
      username: '',
      userProfilePic: '',
    };
  },
};
</script>

<style></style>
