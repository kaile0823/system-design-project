<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const products = ref([]);
const selectedProduct = ref(null);
const showDialog = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3002/api/products');
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

const viewDetails = (product) => {
  selectedProduct.value = product;
  showDialog.value = true;
};

const closeDetails = () => {
  showDialog.value = false;
};
</script>

<template>
  <div class="product-view">
    <h1 style="font-size: 24px; margin-bottom: 20px;">Product Catalog</h1>
    
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <Card>
          <template #header>
            <img :src="product.image" :alt="product.name" style="width: 100%; height: 200px; object-fit: cover;" />
          </template>
          <template #title>
            <h2 style="font-size: 1.2rem; margin: 0;">{{ product.name }}</h2>
          </template>
          <template #content>
            <p style="color: #666; margin: 10px 0;">{{ product.description }}</p>
            <p style="font-size: 1.1rem; font-weight: bold; margin: 10px 0;">${{ product.price.toFixed(2) }}</p>
            <Button label="View Details" @click="viewDetails(product)" severity="secondary" />
          </template>
        </Card>
      </div>
    </div>

    <Dialog 
      v-model:visible="showDialog" 
      :modal="true"
      :style="{ width: '90vw', maxWidth: '500px' }"
      :header="selectedProduct?.name"
    >
      <div v-if="selectedProduct" class="product-details">
        <img 
          :src="selectedProduct.image" 
          :alt="selectedProduct.name" 
          style="width: 100%; height: 300px; object-fit: cover; margin-bottom: 20px;" 
        />
        <p style="margin-bottom: 20px;">{{ selectedProduct.description }}</p>
        <p style="font-size: 1.5rem; font-weight: bold; margin-bottom: 20px;">
          ${{ selectedProduct.price.toFixed(2) }}
        </p>
        <div style="display: flex; gap: 10px;">
          <Button label="Purchase" icon="pi pi-shopping-cart" severity="success"/>
          <Button label="Add to Cart" icon="pi pi-shopping-cart" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-secondary" />
          <Button icon="pi pi-times" @click="closeDetails" class="p-button-rounded p-button-secondary" />

        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.product-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-item {
  max-width: 600px;
}

.product-details {
  padding: 20px 0;
}

@media (min-width: 768px) {
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .product-item {
    max-width: none;
  }
}
</style>

