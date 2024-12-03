<script setup>

import { ref } from 'vue';

const dark = ref(false);

function toggleDarkMode() {
    document.documentElement.classList.toggle('my-app-dark');
    dark.value = !dark.value;
}

</script>

<template>
    <Card>
        <template #content>
            <div class="flex align-items-center">
                <div class="flex-auto flex left-0 justify-content-evenly align-items-center">
                    <router-link to="/dev">
                        <a>Developement Page</a>
                    </router-link>
                    <router-link to="/">
                        <a>Home</a>
                    </router-link>
                    <router-link to="/product">
                        <a>Product</a>
                    </router-link>
                    <router-link to="/post">
                        <a>Post</a>
                    </router-link>
                    <router-link to="/admin/users">
                        <a>Admin</a>
                    </router-link>
                </div>
                <div class="flex align-items-center justify-content-evenly left-0 gap-5 ">
                     <router-link to="/cart">
                        <a>
                            <i class="pi pi-shopping-cart"></i>
                        </a>
                    </router-link>
                    <a @click="toggleDarkMode()">
                        <i v-if="dark" class="pi pi-sun"></i>
                        <i v-else class="pi pi-moon"></i>
                    </a>
                    <router-link to="/user/login">
                        <a>
                            <i class="pi pi-user"></i>
                        </a>
                    </router-link>
                </div>
            </div>
        </template>
    </Card>
</template>