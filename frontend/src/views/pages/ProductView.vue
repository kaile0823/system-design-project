<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const selectedProduct = ref(null);
const showDialog = ref(false);
const images = ref([]);

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
  selectedProduct.value.images.forEach(image => {
    images.value.push({ itemImageSrc: `http://localhost:3002/img/${product.id}/${image}` });
  })
  showDialog.value = true;
};

const closeDetails = () => {
  images.value = [];
  selectedProduct.value = null;
  showDialog.value = false;
};


const countRating = (data) => {
  if (data.ratingCount == 0) {
    data.ratingCount = 1
  }
  return Math.round(data.ratingScore / data.ratingCount)
}

const getStatusLabel = (quantity) => {
  if (quantity == 0) {
    return 'danger';
  }
  if (!quantity) {
    return 'danger';
  }
  if (quantity <= 2) {
    return 'warn';
  }
  if (quantity > 2) {
    return 'success';
  }
}

const getInventoryStatus = (quantity) => {
  if (quantity == 0) {
    return `${quantity}: OUTOFSTOCK`;
  }
  if (!quantity) {
    return 'ERROR'
  }
  if (quantity <= 2) {
    return `${quantity}: LOWSTOCK`;
  }
  if (quantity > 2) {
    return `${quantity}: INSTOCK`;
  }
}

const purchase = async (product) => {

}

const addToCart = async (product) => {

}

const rate = async (product) => {

}


</script>

<template>
  <div class="grid p-5">
    <div v-for="product in products" :key="product.id" class="col-6 md:col-4 lg:col-3 xl:col-2 p-2">
      <Card class="h-full" style="max-height: 25rem;">
        <template #header>
          <a @click="viewDetails(product)">
            <img :src="`http://localhost:3002/img/${product.id}/${product.images[0]}`" :alt="product.name"
              style="width: 100%; height: 200px; object-fit: cover;" />
          </a>
        </template>
        <template #title>
          <div class="font-bold">{{ product.name }}</div class="font-bold">
        </template>
        <template #content>
          <div class="font-light">{{ product.category }}</div>
          <div class="font-bold mt-2">${{ product.price.toFixed(2) }}</div>
        </template>
      </Card>
    </div>

    <Dialog v-model:visible="showDialog" :modal="true" :style="{ width: '90vw', maxWidth: '70rem' }"
      :header="`Product Details`" @close="closeDetails" @after-hide="closeDetails">
      <div class="grid w-full">

        <div class="col-12 md:col-6">
          <Galleria :value="images" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
            :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
            <template #item="slotProps">
              <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
            </template>
            <template #thumbnail="slotProps">
              <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
            </template>
          </Galleria>
        </div>

        <div class="col-12 md:col-6 flex flex-column justify-content-between" v-if="selectedProduct">
          <div class="flex flex-column">
            <div class="font-bold mt-4" style=" font-size: 1.5rem;">
              {{ selectedProduct.name }}
            </div>
            <div class="font-light mt-2">
              {{ selectedProduct.category }}
            </div>
            <div class="flex gap-3">
              <div class="font-bold mt-2">
                ${{ selectedProduct.price.toFixed(2) }}
              </div>
              <div class="mt-2">
                <Tag :value="getInventoryStatus(selectedProduct.quantity)"
                  :severity="getStatusLabel(selectedProduct.quantity)" />
              </div>
            </div>
            <div class="mt-2">
              <Rating :modelValue="countRating(selectedProduct)" :readonly="true" />
            </div>
            <div class="mt-2">
              {{ selectedProduct.description }}
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <Button label="Purchase" icon="pi pi-shopping-cart" severity="success" @click="purchase" />
            <Button label="Add to Cart" icon="pi pi-shopping-cart" @click="addToCart" />
            <Button icon="pi pi-heart" class="p-button-rounded p-button-secondary" @rate="rate" />
          </div>
        </div>

      </div>
    </Dialog>
  </div>
</template>
