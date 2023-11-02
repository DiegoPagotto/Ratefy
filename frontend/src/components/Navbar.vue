<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #212121;">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                <img src="../assets/logo.svg" style="width: 5vh;" alt="">
                <span class="ml-3 my-auto menu-link text-white font-weight-bold" style="font-size: 25px;">Ratefy</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
                aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav ml-auto">
                    <li v-if="loggedIn" class="nav-item">
                        <router-link to="/charts" class="nav-link">
                            Paradas <i class="fa fa-chart-bar ml-2 text-lime" aria-hidden="true"></i>
                        </router-link>
                    </li>
                    <li v-if="loggedIn" class="nav-item mr-5">
                        <router-link to="/search" class="nav-link">
                            Pesquisar <i class="fa fa-search ml-2 text-lime" aria-hidden="true"></i>
                        </router-link>
                    </li>
                    <li v-if="loggedIn" class="nav-item">
                        <a class="nav-link">Bem-vindo, <span class="text-lime font-weight-bold">{{ this.$root.username
                        }}</span></a>
                    </li>
                    <li v-if="loggedIn" class="nav-item menu-item growHover">
                        <HoverAvatar :profileImage="this.$root.userProfile" @logout="logout" />
                    </li>
                    <li v-if="!loggedIn" class="nav-item" id="btnLogin">
                        <button @click="loginWithSpotify" class="btn btn-success d-flex text-dark pt-2 font-weight-bold"
                            style="border-radius: 50px;">
                            <span>Login com Spotify</span> <i class="fab fa-spotify fa-large ml-2"
                                style="font-size: 25px;"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import HoverAvatar from '../components/HoverAvatar.vue';

export default {
    props: {
        loggedIn: {
            type: Boolean,
            required: true
        }
    },
    components: {
        'HoverAvatar': HoverAvatar
    },
    created() {
        this.$root.verifyToken();
    },
    methods: {
        loginWithSpotify() {
            window.location.href = `${this.$config.backEndURL}/login`;
        },
        logout() {
            sessionStorage.removeItem('spotifyToken');
            this.$router.push('/');
            location.reload();
        },
    },
};
</script>

  
<style scoped>
.menu-link {
    color: #999999;
}

.menu-link:hover {
    font-weight: bold;
    color: #999999;
}

.growHover:hover {
    transform: scale(1.1);
    transition: all .2s ease-in-out;
}

.text-decoration-none {
    text-decoration: none;
}

.vertical-divider {
    border-left: 1px solid #999999;
    height: 40px;
    margin: 0 10px;
}

.menu,
.drop-menu {
    list-style-type: none;
    padding: 0;
}

.menu-item {
    display: inline-block;
    position: relative;
}

.menu-item a {
    text-decoration: none;
    padding: 6px 10px;
    color: #fff;
    display: block;
}

.drop-menu {
    display: none;
    position: absolute;
    background-color: #383838;
    min-width: 120px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
    left: 60%;
    transform: translateX(-40%);
}

.drop-menu-item {
    width: 100%;
}

.drop-menu-item:hover {
    background-color: #242424;
}

.drop-menu-item a {
    color: #1db954;
}

.drop-menu-item a:hover {
    color: red;
    cursor: pointer;
}

.pointer {
    cursor: pointer;
}

.menu-item:hover .drop-menu {
    display: block;
}
</style>
