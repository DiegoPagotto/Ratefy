<template>
  <LandingPage />

  <section ref="scrollSection" style="background-color: #121212;">
    <div class="container pb-3">
      <div class="row">
        <h1 class="display-3" style="color: #ebebeb; margin-top:20vh">O que é o <span
            style="color: #1db954;">Ratefy</span>?
        </h1>
        <div class="col mt-5">
          <img src="https://i.imgur.com/5svFAXi.png" alt="">
        </div>
        <div class="col mt-5 text-white">
          <p class="mt-5" style="color:#b3b3b3; font-size: 24px;">
            O <span style="color:#1db954;">Ratefy</span> é uma plataforma de interação entre usuários do
            Spotify onde você pode compartilhar suas preferências, opiniões e
            avaliações acerca de músicas, álbuns e artistas, além disso é um ótimo ambiente
            para conhecer novos artistas e novas pessoas, conhecer suas playlists e
            seu gosto musical.
          </p>
        </div>
      </div>

      <h1 class="display-3 text-right pb-3 pt-5" style="color: #ebebeb; ">Como usar a <span
          style="color:#1db954;">plataforma</span>?</h1>
      <div class="row my-3 ml-4 pb-5">
        <div class="col text-white ">
          <p style="color:#b3b3b3; font-size: 24px;" class="mt-5">
            É muito simples: navegue até a aba "Paradas",
            encontre uma música (Global ou Brasileira) que
            você deseja avaliar, dê uma nota e, se quiser muito
            mostrar sua opinião, não se esqueça de resenhar também!
            <br><br>
            Vamos adorar conhecer todas as suas opiniões! :-)
          </p>
        </div>
        <div class="col">
          <img src="https://i.imgur.com/GoJo3ec.gif" alt="" class="pb-3">
        </div>
      </div>
    </div>

  </section>
</template>
  
<script>
import LandingPage from '../components/LandingPage.vue';

export default {
  methods: {
    checkSectionVisibility() {
      this.$root.showNav = this.$refs.scrollSection.getBoundingClientRect().top <= 0;
    },
  },
  created() {
    this.$root.showNav = false;
    this.$root.verifyToken();
    window.addEventListener('scroll', this.checkSectionVisibility);

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkSectionVisibility);
  },
  components: { LandingPage },
};
</script>
