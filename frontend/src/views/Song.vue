<template>
    <div class="container glassmorphic-container" style="width: 100%; min-height: 80vh;">
        <div class="row justify-content-center">
            <div class="col-11 mt-3">
                <SongIFrame :songURI="this.$route.params.trackId" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2 class="text-center mt-5 font-weight-bold">{{ songData?.spotifyData.name }}</h2>
                <h4 class="text-center">{{ songData?.spotifyData.artists[0].name }}</h4>
                <h4 class="text-center font-italic">{{ songData?.spotifyData.album.name }}</h4>
                <div class="row">
                    <div class="col">
                        <p class="text-center font-weight-light">{{ convertDate(songData?.spotifyData.album.release_date) }}
                        </p>
                    </div>
                    <div class="col">
                        <p class="text-center font-weight-light">{{ convertToMinutes(songData?.spotifyData.duration_ms) }}
                        </p>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col">
                        <button class='btn btn-outline-success actionButton' style='border:none;' title='Escrever resenha'
                            @click="showRateModal">
                            <i class='fas fa-4x fa-star'></i>
                        </button>
                    </div>
                    <div class="col">
                        <button class='btn btn-outline-success actionButton' style='border:none;' data-toggle='modal'
                            @click="showReviewModal">
                            <i class='fas fa-4x fa-edit'></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>
  
<script>
import SongIFrame from "../components/SongIFrame.vue";

export default {
    data() {
        return {
            songData: null,
        };
    },
    methods: {
        async fetchSong() {
            const token = sessionStorage.getItem('spotifyToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await this.$axios.get(
                `${this.$config.backEndURL}/song?songId=${this.$route.params.trackId}`,
                config
            );
            this.songData = data;
            console.log(this.songData);
        },
        convertToMinutes(miliseconds) {
            let minutes = Math.floor(miliseconds / 60000);
            let seconds = ((miliseconds % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },
        convertDate(date) {
            let [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        showRateModal() {
            Swal.fire({
                title: '<h1 class="text-lime">Avaliação</h1>',
                html: `
            <input type="hidden" id="rateInput" class="swal2-input" value="1">
            <div class="star-rating my-5">
                <span class="fa fa-star fa-4x selected" data-star="1"></span>
                <span class="fa fa-star fa-4x" data-star="2"></span>
                <span class="fa fa-star fa-4x" data-star="3"></span>
                <span class="fa fa-star fa-4x" data-star="4"></span>
                <span class="fa fa-star fa-4x" data-star="5"></span>
            </div>`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Avaliar',
                confirmButtonColor: '#1db954',

                preConfirm: () => {
                    const rateInputValue = document.getElementById('rateInput').value;
                },
                didOpen: () => {
                    const stars = document.querySelectorAll('.star-rating span');
                    stars.forEach(star => {
                        star.addEventListener('click', function () {
                            const value = this.getAttribute('data-star');
                            document.getElementById('rateInput').value = value;

                            stars.forEach(s => s.classList.remove('selected'));

                            for (let i = 0; i < value; i++) {
                                stars[i].classList.add('selected');
                            }
                        });
                    });
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const rateInputValue = document.getElementById('rateInput').value;
                    const token = sessionStorage.getItem('spotifyToken');
                    const songId = this.songData.spotifyData.id;
                    const rate = rateInputValue;
                    console.log(rateInputValue)
                    const data = {
                        songId: songId,
                        rate: rate
                    };

                    this.$axios.post('http://localhost:3000/rate', data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            console.log(response.data);
                            Swal.fire({
                                title: 'Avaliação enviada!',
                                icon: 'success',
                                confirmButtonText: 'Ok',
                                confirmButtonColor: '#1db954',
                            });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }

            });
        },
        showReviewModal() {
            Swal.fire({
                title: '<h1 class="text-lime">Resenha</h1>',
                html: `<textarea class="form-control mx-3 btn-success" id="reviewInputValue" rows="5" style="background-color: #131414; border-color: black; color: #1db954; width:30vw" maxlength="355"></textarea>`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Resenhar',
                confirmButtonColor: '#1db954',
                width: '40vw',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const review = document.getElementById('reviewInputValue').value;
                    const token = sessionStorage.getItem('spotifyToken');
                    const songId = this.songData.spotifyData.id;
                    const data = {
                        songId: songId,
                        review: review
                    };

                    this.$axios.post('http://localhost:3000/review', data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            console.log(response.data);
                            Swal.fire({
                                title: 'Resenha enviada!',
                                icon: 'success',
                                confirmButtonText: 'Ok',
                                confirmButtonColor: '#1db954',
                            });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }

            });
        },
    },
    created() {
        this.fetchSong();
    },
    components: { SongIFrame },
};
</script>

  
<style scoped>
.actionButton {
    color: #212121;
}

.actionButton:hover {
    background-color: transparent;
    color: #007428;
}

.actionButton:focus {
    outline: none;
    box-shadow: none;
}

.actionButton:active {
    background-color: transparent !important;
    color: #212121 !important;
    box-shadow: none !important;
}

.star-rating {
    font-size: 30px;
    cursor: pointer;
    color: red;
}

.star-rating span {
    color: #c3c3c3;
}
</style>
  