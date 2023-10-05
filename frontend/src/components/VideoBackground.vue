<template>
    <div class="video-background">
        <video autoplay muted loop>
            <source src="../assets/landing_video.mp4" type="video/mp4">
            Seu navegador não suporta o elemento de vídeo.
        </video>
    </div>
</template>
  
<style scoped>
.video-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.video-background video {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>
  