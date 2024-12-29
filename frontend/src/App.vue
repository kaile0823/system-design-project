<script setup>

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

</script>

<template>
  <main class="inherit-dimension">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
