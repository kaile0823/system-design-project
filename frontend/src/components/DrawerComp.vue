<script setup>

import axios from 'axios';
import AdminBarComp from '@/components/AdminbarComp.vue';
import { onMounted, ref, computed } from 'vue'

const dark = ref(false);
const isAdmin = ref(false)
const token = localStorage.getItem('token')

onMounted(async () => {
    // Check if the user is an admin
    isAdmin.value = true
})

function toggleDarkMode() {
    document.documentElement.classList.toggle('my-app-dark');
    dark.value = !dark.value;
}
</script>

<template>
    <Drawer>
        <template #container="{ closeCallback }">
            <div class="flex flex-column h-full">
                <div class="flex justify-content-between px-3 pt-4 gap-3">
                    <span class="font-semibold text-2xl">Menu</span>
                    <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined />
                </div>
                <div class="overflow-y-auto flex flex-column justify-content-center pt-3 px-4 gap-5 my-4">
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
                    <hr class="mx-0" />
                    <router-link v-if="isAdmin" to="/admin/users">
                        <a>Admin</a>
                    </router-link>
                    <AdminBarComp v-if="isAdmin" />
                </div>
                <div class="mt-auto">
                    <hr class="mb-4 mx-4" />
                    <div class="font-bold m-4 p-4">Mobile View</div>
                </div>
            </div>
        </template>
    </Drawer>
</template>