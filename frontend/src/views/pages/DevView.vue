<script setup>

import { ref, reactive } from 'vue'

import FormComp from '@/components/FormComp.vue';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const products = ref([
  { code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24, price: 65 },
  { code: 'nvklal433', name: 'Black Watch', category: 'Accessories', quantity: 32, price: 72 },
  { code: 'zz21cz3c1', name: 'Blue Band', category: 'Fitness', quantity: 5, price: 17 },
  { code: '244wgera2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 2, price: 29 },
  { code: 'h456wer53', name: 'Bracelet', category: 'Accessories', quantity: 7, price: 4 },
  { code: 'av2231fwg', name: 'Brown Purse', category: 'Clothing', quantity: 32, price: 120 },
])



</script>

<template>
  This is dev

  <FormComp />

  <DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>

  <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
</template>