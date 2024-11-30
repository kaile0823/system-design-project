<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

const toast = useToast();

// Mock data for cart items (replace this with your actual cart data management)
const cartItems = ref([
  { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
  { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
  { id: 3, name: 'Product 3', price: 39.99, quantity: 3 },
]);

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
});

const updateQuantity = (item, newQuantity) => {
  item.quantity = newQuantity;
};

const removeItem = (item) => {
  const index = cartItems.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    toast.add({ severity: 'success', summary: 'Item Removed', detail: `${item.name} has been removed from your cart.`, life: 3000 });
  }
};

const checkout = () => {
  // Implement your checkout logic here
  toast.add({ severity: 'info', summary: 'Checkout', detail: 'Proceeding to checkout...', life: 3000 });
};
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
              <InputNumber v-model="slotProps.data.quantity" @update:modelValue="updateQuantity(slotProps.data, $event)" :min="1" :max="99" />
            </template>
          </Column>
          <Column field="total" header="Total">
            <template #body="slotProps">
              ${{ (slotProps.data.price * slotProps.data.quantity).toFixed(2) }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" @click="removeItem(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
        <div class="flex justify-content-between align-items-center mt-4">
          <div class="text-2xl font-bold">
            Total: ${{ total }}
          </div>
          <Button label="Checkout" icon="pi pi-shopping-cart" @click="checkout" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>