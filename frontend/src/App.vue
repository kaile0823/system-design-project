<script setup>

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

</script>

<template>
  <main class="inherit-dimension">
    <!-- <transition name="fade" mode="out-in">
            <router-view />
        </transition> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
/* Add transition effect */
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
}
</style>
