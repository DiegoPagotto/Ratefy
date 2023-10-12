<template>
    <iframe style="border-radius: 12px"
        :src="`https://open.spotify.com/embed/playlist/${getPlaylistID(playlistURI)}?utm_source=generator`" width="100%"
        height="600vh" frameborder="0" allowfullscreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
    </iframe>
</template>
  
<script>
export default {
    props: {
        playlistURI: String,
    },
    methods: {
        getPlaylistID(uri) {
            const parts = uri.split(":");
            return parts[parts.length - 1];
        },
    },
};
</script>
  