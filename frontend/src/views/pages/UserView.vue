<script setup>

import { useGlobalStore } from '@/store/useGlobalStore';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const store = useGlobalStore();
const user = ref({
    uname: '',
    email: '',
    address: {
        address: '',
        district: '',
        city: ''
    },
});
const purchases = ref();
const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

onMounted(async () => {
    try {
        console.log(store.getUserId);
        if (!store.getUserId) {
            return
        }
        const response = await axios.get(`${backendUrl}/api/users/${store.getUserId}`);
        const response2 = await axios.get(`${backendUrl}/api/purchase/${store.getUserId}`);
        user.value = response.data;
        purchases.value = response2.data;

        purchases.value.forEach((purchase) => {
            purchase.createdAt = new Date(purchase.createdAt).toLocaleString();
            purchase.total = purchase.quantity * purchase.Product.price;
            return purchase
        })
        console.log(purchases.value)
    }
    catch (error) {
        console.log(error);
    }
});

</script>


<template>
    <h2 class="text-center">User Profile</h2> 
    <hr class="my-4">
    <div class="grid">
        <div class="col-12 md:col-6 grid">
            <div class="col-3 text-right align-self-center" style="font-size: 1rem;">
                Name
            </div>
            <div class="col-8">
                <InputText v-model="user.uname" disabled fluid />
            </div>
        </div>

        <div class="col-12 md:col-6 grid">
            <div class="col-3 text-right align-self-center" style="font-size: 1rem;">
                Email
            </div>
            <div class="col-8">
                <InputText v-model="user.email" disabled fluid />
            </div>
        </div>

        <div class="col-12 md:col-6 grid">
            <div class="col-3 text-right align-self-center" style="font-size: 1rem;">
                Address
            </div>
            <div class="col-8">
                <InputText v-model="user.address.address" disabled fluid />
            </div>
        </div>

        <div class="col-12 md:col-6 grid">
            <div class="col-3 text-right align-self-center" style="font-size: 1rem;">
                District
            </div>
            <div class="col-8">
                <InputText v-model="user.address.district" disabled fluid />
            </div>
        </div>

        <div class="col-12 md:col-6 grid">
            <div class="col-3 text-right align-self-center" style="font-size: 1rem;">
                County
            </div>
            <div class="col-8">
                <InputText v-model="user.address.county" disabled fluid />
            </div>
        </div>
    </div>
    <hr class="my-4">
    <h2 class="text-center">Purchases</h2>

    <DataTable ref="dt" v-model:selection="selectedProducts" :value="purchases" dataKey="id" stripedRows resizableColumns columnResizeMode="expand">
        <!-- <Column header="Image">
            <template #body="slotProps">
                <img :src="`${backendUrl}/img/${slotProps.data.id}/${slotProps.data.images[0]}`"
                    :alt="slotProps.data.image" class="rounded" style="width: 64px" />
            </template>
        </Column> -->
        <Column field="Product.name" header="Product"  style="min-width: 8rem"></Column>
        <Column field="quantity" header="Quantity"  style="min-width: 8rem"></Column>
        <Column field="createdAt" header="Purchase Time"  style="min-width: 8rem"></Column>
        <Column field="Product.price" header="Unit Price"  style="min-width: 6rem"></Column>
        <Column field="total" header="Total Price"  style="min-width: 6rem"></Column>

    </DataTable>
</template>
