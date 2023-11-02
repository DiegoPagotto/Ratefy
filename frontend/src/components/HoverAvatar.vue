<script setup lang="ts">
import { ref } from 'vue'
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'radix-vue'

const hoverState = ref(false)
</script>

<template>
    <HoverCardRoot v-model:open="hoverState">
        <HoverCardTrigger>
            <img class="block profilePic" style="width: 40px;height: 40px; margin: 0;" :src="profileImage">
        </HoverCardTrigger>
        <HoverCardPortal>
            <HoverCardContent class="bg-gray rounded text-center mt-4">
                <router-link to="/profile" class="text-decoration-none">
                    <a class="dropdown-item">Perfil <i class="fa fa-user ml-3" aria-hidden="true"></i></a>
                </router-link>
                <a class="dropdown-item" @click="emitLogoutEvent">Logout <i class="fas fa-sign-out-alt ml-1"></i></a>
            </HoverCardContent>
        </HoverCardPortal>
    </HoverCardRoot>
</template>

<script lang="ts">
export default {
    emits: ['logout'],
    props: {
        profileImage: {
            type: String,
            required: true
        }
    },
    methods: {
        emitLogoutEvent() {
            this.$emit('logout')
        }
    }
}
</script>

<style scoped>
.dropdown-item {
    color: #1db954;
}

.dropdown-item:hover {
    color: #212121;
    background-color: #1db954;
    border-radius: inherit;
    cursor: pointer;
}
</style>