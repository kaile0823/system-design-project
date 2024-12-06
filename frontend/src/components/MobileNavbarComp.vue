<script setup>

import { onMounted, ref } from 'vue'
import { useGlobalStore } from '@/store/useGlobalStore';
import { useRouter } from 'vue-router';
import AdminBarComp from '@/components/AdminBarComp.vue';

const store = useGlobalStore();
const router = useRouter();
const dark = ref(false);
const isAdmin = ref(false);
const visible = ref(false);

onMounted(async () => {
    if (store.getAdmin) {
        isAdmin.value = true
    }
})

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

function toggleDarkMode() {
    document.documentElement.classList.toggle('my-app-dark');
    dark.value = !dark.value;
}

</script>

<template>
    <Drawer @close="visible = false" v-model:visible="visible">
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

    <div class="flex justify-content-between align-items-center p-2">
        <Button icon="pi pi-bars" @click="visible = true" />
        <div class="flex justify-content-center align-items-center gap-5">
            <a @click="openCart"><i class="pi pi-shopping-cart text-white" /></a>
            <a @click="toggleDarkMode()">
                <i v-if="dark" class="pi pi-sun text-white"></i>
                <i v-else class="pi pi-moon text-white"></i>
            </a>
            <router-link to="/user/login">
                <a><i class="pi pi-user text-white" /></a>
            </router-link>
            <span v-if="store.getUname" class="font-bold text-white"> User: {{ store.getUname }} </span>
        </div>
    </div>
</template>