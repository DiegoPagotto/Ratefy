<template>
    <div class="display-flex">
        <footer :style="{ backgroundColor: backgroundColor }" class="text-center">
            <p class="pt-3"><img src="../assets/logo-black.svg" style="width: 3%;" alt="Ratefy Logo"></p>
            <p class="h4">{{ title }}</p>
            <p class="pt-3 font-weight-bold">{{ description }}</p>
            <p class="pb-3"><small>{{ poweredBy }}<i class="fab fa-spotify"></i></small>
            </p>
        </footer>
    </div>
</template>
  
<script>
export default {
    props: {
        backgroundColor: {
            type: String,
            default: "#1db954", // Cor de fundo padrão
        },
        title: {
            type: String,
            default: "Ratefy", // Título padrão
        },
        description: {
            type: String,
            default: "Desenvolvido por Diego Pagotto na disciplina de Projeto de Sistemas - 6º Semestre - ADS - IFSP São Carlos", // Descrição padrão
        },
        poweredBy: {
            type: String,
            default: "Powered by Spotify Web API ", // Texto padrão
        },
    },
};
</script>
  
<style scoped>
/* Estilos CSS específicos para o componente aqui */
</style>
  