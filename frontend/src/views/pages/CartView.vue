<script setup>

import { ref, onMounted, computed } from 'vue';
import { useGlobalStore } from '@/store/useGlobalStore';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import axios from 'axios';

const store = useGlobalStore();
const router = useRouter();
const toast = useToast();
const showPurchaseSuccessDialog = ref(false);
const showPurchaseFailedDialog = ref(false);
const cartItems = ref([]);

onMounted(async () => {

  try {
    // kl: 獲得購物車資訊

    cartItems.value.push({ id: 1, name: 'Product 1', price: 19.99, quantity: 2 });
    cartItems.value.push({ id: 2, name: 'Product 2', price: 29.99, quantity: 1 });
    cartItems.value.push({ id: 3, name: 'Product 3', price: 39.99, quantity: 3 });

    const response = await axios.get('http://localhost:3002/api/products');
    // cartItems.value = response.data;



  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
});

// const updateQuantity = (item, newQuantity) => {
//   item.quantity = newQuantity;
// };

const checkAccount = async () => {
  const userState = { uname: store.getUname, email: store.getEmail };
  if (!userState.uname || !userState.email) {
    router.push('/user/login');
  }
}

const removeItem = (item) => {
  // kl: 刪除在購物車裡的商品

  const index = cartItems.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    toast.add({ severity: 'success', summary: 'Item Removed', detail: `${item.name} has been removed from your cart.`, life: 3000 });
  }
};


const purchase = async () => {
  await checkAccount(); // 檢查是否已登入
  
  const success = false;
  
  const data = {
    email: store.getEmail,
    productID: product.value.id,
    productCount: selectProductCount.value
  }
  
  // kl： 處理購物邏輯
  showDialog.value = false;
  if (success) {
    showPurchaseSuccessDialog.value = true;
    toast.add({ severity: 'info', summary: 'Checkout', detail: 'Proceeding to checkout...', life: 3000 });
  } else {
    showPurchaseFailedDialog.value = true;
  }
}

const closePurchaseSuccess = () => {
  showPurchaseSuccessDialog.value = false;
  window.location.reload();
}

const closePurchaseFailed = () => {
  showPurchaseFailedDialog.value = false;
  window.location.reload();
}


</script>

<template>
  <div class="cart-view">
    <Card>
      <template #title>
        Your Shopping Cart
      </template>
      <!-- TODO: Handle shopping item added from product catalog, currently it's just a placeholder -->
      <template #content>
        <DataTable :value="cartItems" responsiveLayout="scroll">
          <Column field="name" header="Product"></Column>
          <Column field="price" header="Price">
            <template #body="slotProps">
              ${{ slotProps.data.price.toFixed(2) }}
            </template>
          </Column>
          <Column field="quantity" header="Quantity">
            <template #body="slotProps">
              <InputNumber v-model="slotProps.data.quantity" @update:modelValue="updateQuantity(slotProps.data, $event)"
                :min="1" :max="99" disabled/>
            </template>
          </Column>
          <Column field="total" header="Total">
            <template #body="slotProps">
              ${{ (slotProps.data.price * slotProps.data.quantity).toFixed(2) }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text"
                @click="removeItem(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
        <div class="flex justify-content-between align-items-center mt-4">
          <div class="text-2xl font-bold">
            Total: ${{ total }}
          </div>
          <Button label="Purchase" icon="pi pi-shopping-cart" @click="purchase" />
        </div>
      </template>
    </Card>
  </div>

  <Dialog v-model:visible="showPurchaseSuccessDialog" :modal="true"
    :style="{ width: '50vw', maxWidth: '50rem', height: '50vh' }" :header="`Information`" @close="closePurchaseSuccess"
    @after-hide="closePurchaseSuccess">
    <div class="text-center">Successfully Added to Cart</div>
  </Dialog>

  <Dialog v-model:visible="showPurchaseFailedDialog" :modal="true"
    :style="{ width: '50vw', maxWidth: '50rem', height: '50vh' }" :header="`Information`" @close="closePurchaseFailed"
    @after-hide="closePurchaseFailed">
    <div class="text-center">Failed Adding to Cart</div>
  </Dialog>
</template>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>