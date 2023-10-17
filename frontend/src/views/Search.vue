<template>
    <div class="container glassmorphic-container" style="width: 100%; min-height: 80vh;">
        <div class="row justify-content-center">
            <div class="col-6 mt-3">
                <div class="input-group mb-3">
                    <input v-model="query" type="text" class="form-control" placeholder="Iron Maiden"
                        aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary bg-gray" type="button" @click="fetchArtist"><i
                                class="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5 mx-3">
            <div class="col">
                <img v-if="artistData && artistData.info.images && artistData.info.images[1]"
                    :src="artistData.info.images[1].url" alt="Imagem do Perfil" class="rounded artistPic">
            </div>
            <div class="col d-flex align-items-center">
                <div>
                    <h1 class="font-weight-bold">{{ artistData && artistData.info.name }}</h1>
                    <h4>{{ artistData && artistData.info.genres && capitalize(artistData.info.genres.join(', ')) }}
                    </h4>
                    <h4>{{ artistData && artistData.info.followers &&
                        formatNumber(artistData.info.followers.total) }} </h4>
                </div>
            </div>
        </div>
        <div class="row mx-2" v-if="artistData">
            <table class="table table-borderless" id="tblCharts">
                <thead>
                    <tr class="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Música</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(track, index) in artistData.tracks" :key="track.id" class="text-center">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>
                            <SongIFrame :songURI="track.uri" />
                        </td>
                        <td>
                            <button>Ver</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import SongIFrame from "../components/SongIFrame.vue";
export default {
    data() {
        return {
            artistData: null,
            query: '',
        };
    },
    methods: {
        async fetchArtist() {
            const token = sessionStorage.getItem('spotifyToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await this.$axios.get(`${this.$config.backEndURL}/search?query=${this.query}`, config);
            this.artistData = data;
        },
        capitalize(value) {
            if (!value) return '';
            return value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        },
        formatNumber(value) {
            if (!value) return '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' seguidores';
        }

    },
    components: { SongIFrame },

};
</script>

  
<style scoped>
.artistPic {
    width: 25vw;
    height: 25vw;
    object-fit: cover;
}

tbody>tr {
    background-color: #212121;
    color: #1db954;
    height: 10vh;
}

tr>td,
th {
    vertical-align: middle;
}
</style>
  