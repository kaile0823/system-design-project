<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const product = ref(null);
const showDialog = ref(false);
const images = ref([]);
const selectProductCount = ref(1);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3002/api/products');
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

const viewDetails = (prop) => {
  product.value = prop;
  product.value.images.forEach(image => {
    images.value.push({ itemImageSrc: `http://localhost:3002/img/${prop.id}/${image}` });
  })
  showDialog.value = true;
};

const closeDetails = () => {
  images.value = [];
  product.value = null;
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

const checkAccount = async() => {
  
}

const purchase = async (product) => {

}

const addToCart = async (product) => {

}

const rateLiked = async (product) => {
  console.log('liked')
}

const rateDisliked = async (product) => {
  console.log('disliked')
}


</script>

<template>
  <div class="grid p-5">
    <div v-for="product in products" :key="product.id" class="col-6 md:col-4 lg:col-3 xl:col-2 p-2">
      <Card class="h-full shadow-3" style="max-height: 25rem;">
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
          <div class=" font-bold mt-2">${{ product.price.toFixed(2) }}</div>
        </template>
      </Card>
    </div>

    <Dialog v-model:visible="showDialog" :modal="true" :style="{ width: '90vw', maxWidth: '70rem' }"
      :header="`Product Details`" @close="closeDetails" @after-hide="closeDetails">
      <div class="grid ">

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

        <div class="col-12 md:col-6 flex flex-column justify-content-between" v-if="product">
          <div class="flex flex-column">
            <div class="font-bold mt-4" style=" font-size: 1.5rem;">
              {{ product.name }}
            </div>
            <div class="font-light mt-2">
              {{ product.category }}
            </div>
            <div class="flex gap-3">
              <div class="font-bold mt-2">
                ${{ product.price.toFixed(2) }}
              </div>
              <div class="mt-2">
                <Tag :value="getInventoryStatus(product.quantity)" :severity="getStatusLabel(product.quantity)" />
              </div>
            </div>
            <div class="mt-2">
              <Rating :modelValue="countRating(product)" :readonly="true" />
            </div>
            <div class="mt-2">
              {{ product.description }}
            </div>
          </div>

          <div class="mt-4 flex flex-column gap-4">
            <InputNumber v-model="selectProductCount" showButtons buttonLayout="horizontal" style="width: 1rem" :min="0"
              :max="product.quantity">
              <template #incrementbuttonicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
            <div class="flex gap-3">
              <Button label="Purchase" icon="pi pi-shopping-cart" severity="success" @click="purchase" />
              <Button label="Add to Cart" icon="pi pi-shopping-cart" @click="addToCart" />
              <Button icon="pi pi-thumbs-up" class="p-button-rounded p-button-secondary" @click="rateLiked" />
              <Button icon="pi pi-thumbs-down" class="p-button-rounded p-button-secondary" @click="rateDisliked" />
            </div>

          </div>
        </div>

      </div>
    </Dialog>

    <Dialog v-model:visible="showCart" :modal="true" :style="{ width: '50vw', maxWidth: '50rem' }"
      :header="`Cart Details`" @close="closeDetails" @after-hide="closeDetails">
      <div class="grid w-full"></div>
    </Dialog>
  </div>
</template>
