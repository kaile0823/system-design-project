<script setup>

import Card from 'primevue/card';

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
                    <router-link to="/main/dev">
                        <a>Developement Page</a>
                    </router-link>
                    <router-link to="/main/">
                        <a>Home</a>
                    </router-link>
                    <router-link to="/main/product">
                        <a>Product</a>
                    </router-link>
                    <router-link to="/main/post">
                        <a>Post</a>
                    </router-link>
                    <router-link to="/main/admin/users">
                        <a>Admin</a>
                    </router-link>
                </div>
                <div class="flex align-items-center justify-content-evenly left-0 gap-5 ">
                    <i class="pi pi-shopping-cart"></i>
                    <a @click="toggleDarkMode()">
                        <i v-if="dark" class="pi pi-sun"></i>
                        <i v-else class="pi pi-moon"></i>
                    </a>
                    <router-link to="/">
                        <a>
                            <i class="pi pi-user"></i>
                        </a>
                    </router-link>
                </div>
            </div>
        </template>
    </Card>
</template>