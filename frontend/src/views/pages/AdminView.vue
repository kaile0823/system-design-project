<script setup>

import AdminBarComp from '@/components/AdminBarComp.vue';

</script>

<template>
    <div class="card hidden md:block">
        <Toolbar>
            <template #center>
                <div class="flex align-items-center justify-content-center gap-5">
                    <AdminBarComp />
                </div>
            </template>
        </Toolbar>
    </div>
    <router-view />
</template>