<template>
    <nav class="navbar navbar-expand-md fixed-top align-items-center" style="background-color: #212121;">
        <div class="container">
            <div class="row align-items-center">
                <span>
                    <img src="../assets/logo.svg" width="50rem" alt="">
                </span>
                <span class="ml-4 my-auto text-white font-weight-bold" style="font-size: 25px;">Ratefy</span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto row">
                    <div style="display: flex;" v-if="loggedIn">
                        <li class="nav-item">
                            <a class="nav-link menu-link" id="btnParadas" href="charts.html">Paradas</a>
                        </li>
                        <li class="nav-item ml-3">
                            <a class="nav-link menu-link" id="btnPerfil" href="profile.html">Perfil</a>
                        </li>
                        <div class="vertical-divider ml-3"></div> <!-- Add the vertical divider here -->
                        <li class="nav-item">
                            <a class="nav-link menu-link">Bem-vindo, <span class="text-lime font-weight-bold">{{
                                this.$root.username }}</span></a>
                        </li>
                        <li class="nav-item menu-item">
                            <img :src="this.$root.userProfile" class="profilePic" id="profilePic">
                            <ul class="drop-menu">
                                <li class="drop-menu-item">
                                    <a @click="logout">Logout <i class="fas fa-sign-out-alt ml-3"></i></a>
                                </li>
                            </ul>
                        </li>
                    </div>


                    <li class="nav-item ml-4" id="btnLogin" v-if="!loggedIn">
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
export default {
    props: {
        loggedIn: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        loginWithSpotify() {
            window.location.href = 'http://localhost:3000/login';
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

.profilePic {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 3px solid #1db954;
}
.vertical-divider{
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

.menu-item:hover .drop-menu {
    display: block;
}
</style>
  