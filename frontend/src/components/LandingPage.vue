<template>
    <div class="landing-page">
        <video-background />
        <div class="content">
            <div class="centered">
                <div class="vertical-center">
                    <img src="../assets/logo.svg" alt="Logo da Ratefy" class="logo">
                    <h1 class="text-lime">Ratefy</h1>
                    <p>Sua opinião faz a música acontecer!</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import VideoBackground from "./VideoBackground.vue";

export default {
    components: {
        VideoBackground,
    },
};
</script>
  
<style scoped>
.logo {
    max-width: 200px;
    margin-bottom: 20px;
}

.landing-page {
    position: relative;
    height: 100vh;
}

.content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.centered {
    text-align: center;
    color: white;
}

.vertical-center {
    max-width: 600px;
    margin: 0 auto;
}

.text-lime {
    color: #1ed760;
}

.bg-lime {
    background-color: #1ed760;
}
</style>
  