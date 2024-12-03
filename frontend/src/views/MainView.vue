<script setup>

import NavbarComp from '@/components/NavbarComp.vue';
import DrawerComp from '@/components/DrawerComp.vue';
import { ref } from 'vue';

const visible = ref(false);

</script>

<template>
    <div class="">
        <div class="block md:hidden p-2" style="background-color: var(--p-primary-color)">
            <DrawerComp @close="visible = false" v-model:visible="visible" />
            <div class="flex justify-content-between align-items-center p-2">
                <Button icon="pi pi-bars" @click="visible = true" />
                <div class="flex justify-content-center align-items-center gap-5">
                    <router-link to="/cart">
                        <a><i class="pi pi-shopping-cart text-white" /></a>
                    </router-link>
                    <a @click="toggleDarkMode()">
                        <i v-if="dark" class="pi pi-sun text-white"></i>
                        <i v-else class="pi pi-moon text-white"></i>
                    </a>
                    <router-link to="/user/login">
                        <a><i class="pi pi-user text-white" /></a>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="hidden md:block  p-4 justify-content-center" style="background-color: var(--p-primary-color)">
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