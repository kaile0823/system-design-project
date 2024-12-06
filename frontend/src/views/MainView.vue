<script setup>

import NavbarComp from '@/components/NavbarComp.vue';
import MobileNavbarComp from '@/components/MobileNavbarComp.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '@/store/useGlobalStore';

const store = useGlobalStore();

const token = localStorage.getItem('token');

onMounted(async () => {
    // kl: 跟伺服器透過token獲取使用者信息
    const success = true;

    if (success) {
        const result = {
            uname: 'ABC',
            email: 'howwilson12@gmail.com',
            admin: true
        }

        store.setUname(result.uname);
        store.setEmail(result.email);
        store.setAdmin(result.admin);
    }
})

</script>

<template>
    <div class="">
        <div class="block md:hidden p-2" style="background-color: var(--p-primary-color)">
            <!-- Mobile Version -->
            <MobileNavbarComp />
        </div>

        <div class="hidden md:block  p-4 justify-content-center" style="background-color: var(--p-primary-color)">
            <!-- Desktop Version -->
            <NavbarComp />
        </div>

        <div class="p-4" style="background-color: var(--p-surface-100); min-height: 80vh;">
            <router-view />
        </div>

        <div class="p-4" style="background-color: var(--p-primary-color)">
            <footer>
                <p class="text-center">© 2024 NCUE System Design Project Team 11</p>
            </footer>
        </div>
    </div>
</template>