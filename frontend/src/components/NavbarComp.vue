<script setup>

import { ref, onMounted } from 'vue';
import { useGlobalStore } from '@/store/useGlobalStore';
import { useRouter } from 'vue-router';

const store = useGlobalStore();
const router = useRouter();
const isAdmin = ref(false);
const dark = ref(false);

onMounted(async () => {
    if (store.getAdmin) {
        isAdmin.value = true
    }
})

function toggleDarkMode() {
    document.documentElement.classList.toggle('my-app-dark');
    dark.value = !dark.value;
}

const checkAccount = async () => {
    const userState = { uname: store.getUname, email: store.getEmail };
    if (!userState.uname || !userState.email) {
        router.push('/user/login');
    }
}

const openCart = async () => {
    await checkAccount();
    router.push('/cart');
}

</script>

<template>
    <Card>
        <template #content>
            <div class="flex align-items-center">
                <div class="flex-auto flex left-0 justify-content-evenly align-items-center">
                    <router-link to="/">
                        <a>Home</a>
                    </router-link>
                    <router-link to="/product">
                        <a>Product</a>
                    </router-link>
                    <router-link to="/post">
                        <a>Post</a>
                    </router-link>
                    <router-link v-if="isAdmin" to="/admin/users">
                        <a>Admin</a>
                    </router-link>
                </div>
                <div class="flex align-items-center justify-content-evenly left-0 gap-5 ">
                    <a @click="openCart"><i class="pi pi-shopping-cart" /></a>
                    <a @click="toggleDarkMode()">
                        <i v-if="dark" class="pi pi-sun"></i>
                        <i v-else class="pi pi-moon"></i>
                    </a>
                    <router-link to="/user/login">
                        <a>
                            <i class="pi pi-user"></i>
                        </a>
                    </router-link>
                    <router-link to="/user">
                        <a v-if="store.getUname" class="font-bold">
                            User: {{ store.getUname }} 
                        </a>
                    </router-link>
                </div>
            </div>
        </template>
    </Card>
</template>