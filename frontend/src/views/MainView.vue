<script setup>

import NavbarComp from '@/components/NavbarComp.vue';
import MobileNavbarComp from '@/components/MobileNavbarComp.vue';
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '@/store/useGlobalStore';
import axios from 'axios';

const store = useGlobalStore();
const token = localStorage.getItem('token');
const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

onMounted(async () => {
    try {
        if(!token) return;
        const response = await axios.post(`${backendUrl}/api/users/verify-token`, { token: token });
        // console.log(response.data);
        store.setUname(response.data.uname);
        store.setEmail(response.data.email);
        store.setAdmin(response.data.admin);
        store.setUserId(response.data.id);
    }
    catch (error) {
        console.log(error);
    }
});

</script>

<template>
    <div class="">
        <div class="block md:hidden p-2" style="background-color: var(--p-primary-color)">
            <!-- Mobile Version -->
            <MobileNavbarComp />
        </div>

        <div class="hidden md:block  p-3 justify-content-center" style="background-color: var(--p-primary-color)">
            <!-- Desktop Version -->
            <NavbarComp />
        </div>

        <div class="p-3" style="background-color: var(--p-surface-100); min-height: 80vh;">
            <router-view /> 
        </div>

        <div class="p-3" style="background-color: var(--p-primary-color)">
            <footer>
                <p class="text-center text-white">© 2024 NCUE System Design Project</p>
            </footer>
        </div>
    </div>

    <!-- <a href="https://www.flaticon.com/free-icons/online-shopping" title="online-shopping icons">Online-shopping icons created by Ongicon - Flaticon</a> -->
</template>