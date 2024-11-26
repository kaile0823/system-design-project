<script setup>

import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import Tag from 'primevue/tag';
import Rating from 'primevue/rating';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';
import Card from 'primevue/card';
import { Toast } from 'primevue';

import axios from 'axios';

// Initialization

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

// Server Functions

// Fetch products from server
const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3002/api/products');
        if (response && response.data) {
            products.value = response.data;
        } else {
            console.error('No data received from the API');
        }
    } catch (error) {
        console.error("Client can't get Products: ", error);
    }
};

const getImageLinks = async () => {
    for (const prod of products.value) {
        const id = prod.id
        try {
            const response = await axios.get('http://localhost:3002/api/images?id=' + id);
            if (response && response.data) {
                console.log(response.data);
                console.log(response);
            } else {
                console.error('No data received from the API');
            }
        } catch (error) {
            console.error("Client can't get image links: ", error);
        }
    }
}

// Developing Image
const product1 = ref({});
const getImage = async (img) => {
    try {
        const response = await axios.get(`https://primefaces.org/cdn/primevue/images/product/${img}`);
        if (response.data) {
            return response.data;
        }
    }
    catch (error) {
        console.error("Client can't get images: ", error);
    }
}
// Push image to server
const addImage = async () => {

    try {
        const response = await axios.post('http://localhost:3002/api/images', product.value);
        if (response.status === 201 && response.data) {
            products.value.push(response.data);
        } else {
            throw new Error('Failed to create product');
        }
    } catch (error) {
        console.error("Client can't add Products: ", error);
    }
}

const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("id", 10000);
    formData.append("image", file);
    try {
        const response = await axios.post('http://localhost:3002/api/images', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
    } catch (error) {
        console.error("Client can't add images: ", error);
    }
}

onMounted(async () => {
    await fetchProducts();
    // await getImageLinks();
    const data = await ProductService.getProducts();
    product1.value = data;

    for (const objs of product1.value) {
        const img = await getImage(objs.images);
        uploadImg(img);
    }
});

// Update based on server
const statuses = ref([
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Clothing', value: 'Clothing' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fitness', value: 'Fitness' },
]);

// Create product and push to server
const addProduct = async () => {

    product.value.image = JSON.stringify(product.value.image);

    try {
        const response = await axios.post('http://localhost:3002/api/products', product.value);
        if (response.status === 201 && response.data) {
            products.value.push(response.data);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        } else {
            throw new Error('Failed to create product');
        }
    } catch (error) {
        console.error("Client can't add Products: ", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Product Not Created', life: 3000 });
    }
}

// Update product
const updateProduct = async () => {
    try {
        const id = product.value.id;
        const response = await axios.put(`http://localhost:3002/api/products/${id}`, product.value);
        if (response.status === 200) {
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            throw new Error('Failed to update product');
        }
    } catch (error) {
        console.error("Client can't update Products: ", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Product Not Updated', life: 3000 });
    }
}

// Delete product

const deleteProduct = async () => {
    try {
        const id = product.value.id;
        const response = await axios.delete(`http://localhost:3002/api/products/${id}`);
        if (response.status === 204) {
            products.value = products.value.filter(val => val.id !== product.value.id);
            product.value = {};
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            deleteProductDialog.value = false;
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        console.error("Client can't delete Products: ", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Product Not Deleted', life: 3000 });
    }

};

// Delete productS
const deleteSelectedProducts = async () => {

    for (const product of selectedProducts.value) {
        try {
            await axios.delete(`http://localhost:3002/api/products/${product.id}`);
            console.log(`Deleted product with ID: ${product.id}`);
        } catch (error) {
            console.error(`Failed to delete product with ID: ${product.id}`, error);
            selectedProducts.value = selectedProducts.value.filter(val => val.id !== product.id);
            toast.add({ severity: 'error', summary: 'Error', detail: 'Product Not Deleted', life: 3000 });
        }
    }
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });

};

// Image Operation

const imageFiles = ref([]);

const onImageUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const onImageSelect = (event) => {
    imageFiles.value = event.imageFiles;
    imageFiles.value.pop();
};



// Dialog Operations

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};

const saveProduct = () => {

    submitted.value = true;
    product.value.category = product.value.category.label;

    if (!product?.value.name?.trim()) {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Information incomplete', life: 3000 });
        return;
    };
    if (!product?.value.description?.trim()) {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Information incomplete', life: 3000 });
        return;
    };
    if (!product?.value.price) {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Information incomplete', life: 3000 });
        return;
    };
    if (!product?.value.quantity) {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Information incomplete', life: 3000 });
        return;
    };
    if (!product?.value.category?.trim()) {
        toast.add({ severity: 'error', summary: 'Warning', detail: 'Information incomplete', life: 3000 });
        return;
    };

    if (product.value.id) {
        updateProduct();
    }
    else {
        addProduct();
    }

    productDialog.value = false;
    product.value = {};
};


// Utilities

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};

const exportCSV = () => {
    dt.value.exportCSV();
};


// Column Utilities

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

const countRating = (data) => {
    if (data.ratingCount == 0) {
        data.ratingCount = 1
    }
    return Math.round(data.ratingScore / data.ratingCount)
}

const size = ref({ label: 'Normal', value: 'null' });
const sizeOptions = ref([
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'null' },
    { label: 'Large', value: 'large' }
]);

</script>
<template>
    <div class="mt-5">
        <Card>
            <template #content>
                <h1 class="text-center">Items Database</h1>
            </template>
        </Card>
        <Toast />
        <div class="mt-4">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :size="size.value" stripedRows resizableColumns columnResizeMode="expand"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex flex-wrap gap-3 justify-content-center">
                        <Button label="New" icon="pi pi-plus" @click="openNew" />
                        <Button label="Delete" icon="pi pi-trash" severity="danger" outlined
                            @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload
                            chooseLabel="Import" auto :chooseButtonProps="{ severity: 'secondary' }" />
                        <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column :exportable="false" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
                <Column field="name" header="Name" sortable style="min-width: 10rem"></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.images}`"
                            :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="price" header="Price" sortable style="min-width: 6rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Quantity" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="getInventoryStatus(slotProps.data.quantity)"
                            :severity="getStatusLabel(slotProps.data.quantity)" />
                    </template>
                </Column>
                <Column field="category" header="Category" sortable style="min-width: 8rem"></Column>
                <Column field="rating" header="Reviews" sortable style="min-width: 7rem">
                    <template #body="slotProps">
                        <Rating :modelValue="countRating(slotProps.data)" :readonly="true" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '80%' }" header="Product Details" :modal="true">
            <div class="grid mt-3">
                <div class="md:col-6 sm:col-12 col-12">
                    <img v-if="product.image"
                        :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
                        :alt="product.image" style="max-width: 100%" />
                    <div v-else>
                        <!-- ## TODO image picker -->
                        <FileUpload name="demo[]" @upload="onImageUpload($event)" :multiple="true" accept="image/*"
                            :maxFileSize="10485760" @select="onImageSelect">
                            <template #content="{ imageFiles }"></template>
                            <template #empty>
                                <span>Drag and drop files to here to upload.</span>
                            </template>
                        </FileUpload>
                    </div>
                </div>
                <div class="md:col-6 sm:col-12 col-12">
                    <div class="field">
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus
                            :invalid="submitted && !product.name" fluid />
                        <small v-if="submitted && !product.name" class="text-red-500">Name is required</small>
                    </div>
                    <div class="field">
                        <label for="description" class="block font-bold mb-3">Description</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20"
                            :invalid="submitted && !product.description" fluid />
                        <small v-if="submitted && !product.description" class="text-red-500">Description is
                            required</small>
                    </div>
                </div>
                <div class="col-4 field">
                    <label for="price" class="block font-bold mb-3">Price</label>
                    <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US"
                        :invalid="submitted && !product.price" fluid />
                    <small v-if="submitted && !product.price" class="text-red-500">Price is required</small>
                </div>
                <div class="col-4 field">
                    <label for="quantity" class="block font-bold mb-3">Quantity</label>
                    <InputNumber id="quantity" v-model="product.quantity" integeronly
                        :invalid="submitted && !product.quantity" fluid />
                    <small v-if="submitted && !product.quantity" class="text-red-500">Quantity is required</small>
                </div>
                <div class="col-4 field">
                    <label for="category" class="block font-bold mb-3">Category</label>
                    <Select id="category" v-model="product.category" :options="statuses" optionLabel="label"
                        placeholder="Select a Status" :invalid="submitted && !product.category" fluid></Select>
                    <small v-if="submitted && !product.category" class="text-red-500">Category is required</small>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>