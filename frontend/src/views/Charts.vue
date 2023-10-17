<template>
    <div class="container glassmorphic-container" style="width: 100%;">
        <div class="row justify-content-center">
            <RegionSelector @option-changed="updateSelectedOption" />
        </div>
        <div class="row mx-2">
            <table class="table table-borderless" id="tblCharts">
                <thead>
                    <tr class="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Música</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(track, index) in selectedChart" :key="track.track.id" class="text-center">
                        <th scope="row">{{ index + 1 }}</th>
                        <SongIFrame :songURI="track.track.uri" />
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
import RegionSelector from '../components/RegionSelector.vue';
import SongIFrame from '../components/SongIFrame.vue';
export default {
    data() {
        return {
            charts: null,
            selectedOption: "N",
        };
    },
    created() {
        this.fetchCharts();
    },
    methods: {
        async fetchCharts() {
            const token = sessionStorage.getItem('spotifyToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await this.$axios.get(`${this.$config.backEndURL}/charts`, config);
            this.charts = data;
        },
        updateSelectedOption(option) {
            this.selectedOption = option;
        },
    },
    components: { RegionSelector, SongIFrame },
    computed: {
        selectedChart() {
            if (this.selectedOption === "G") {
                return this.charts.global;
            } else if (this.selectedOption === "N") {
                return this.charts.brasil;
            }
            return [];
        },
    },
};
</script>
  
<style scoped>
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
  