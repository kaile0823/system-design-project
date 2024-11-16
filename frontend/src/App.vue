<script setup>

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

</script>

<template>
    <main class="inherit-dimension">
        <router-view />
    </main>
</template>
