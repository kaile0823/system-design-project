<script setup>

import NavbarComp from '@/components/NavbarComp.vue';

</script>

<template>
    <div class="flex-auto p-4 justify-content-center" style="background-color: var(--p-primary-color)">
        <NavbarComp />
    </div>
    <div class="flex-auto p-4 w-full" style="background-color: var(--p-surface-100); min-height: 80vh;">
        <router-view style=""></router-view>
    </div>
    <div class="flex-auto p-4" style="background-color: var(--p-primary-color)">
        <footer>
            <p class="text-center">© 2024 NCUE System Design Project Team 11</p>
        </footer>
    </div>
</template>