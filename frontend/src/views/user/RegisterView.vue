<script setup>

import { ref, onMounted } from "vue";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import { CountryService } from "@/service/CountryService";

onMounted(() => {
    CountryService.getCountries().then((data) => (countries.value = data));
});

const initialValues = ref({
    country: { name: '' }
});
const resolver = ref(zodResolver(
    z.object({
        country: z.union([
            z.object({
                name: z.string().min(1, 'Country is required.')
            }),
            z.any().refine((val) => false, { message: 'Country is required.' })
        ]),
        password: z
            .string()
            .min(4, { message: 'Minimum 4 characters.' })
            .max(20, { message: 'Maximum 20 characters.' })
            .refine((value) => /[a-z]/.test(value), {
                message: 'Must have a lowercase letter.'
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: 'Must have an uppercase letter.'
            })
            .refine((value) => /d/.test(value), {
                message: 'Must have a number.'
            })
    })
));


const countries = ref();
// const selectedCountry = ref();
const filteredCountries = ref();
const toast = useToast();

const searchCountries = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredCountries.value = [...countries.value];
        } else {
            filteredCountries.value = countries.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
};

const onFormSubmit = ({ valid }) => {

    console.log(initialValues.value);
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};


const text1 = ref(null);
const text2 = ref(null);
const number = ref(null);
const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

</script>

<template>
    <div
        style="height: 100vh; background: linear-gradient(108deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 60%, rgba(252,176,69,1) 100%);">
        <div class="flex align-items-center justify-content-center" style="min-height: 100vh;">
            <div style="width: 80%; max-width: 50rem;">

                <Card style="min-height: 65vh">
                    <template #title>
                        <h1 class="text-center">Register</h1>
                    </template>
                    <template #content>
                        <div class="card grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-user"></i>
                                </InputGroupAddon>
                                <InputText v-model="text1" placeholder="Username" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>$</InputGroupAddon>
                                <InputNumber v-model="number" placeholder="Price" />
                                <InputGroupAddon>.00</InputGroupAddon>
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>www</InputGroupAddon>
                                <InputText v-model="text2" placeholder="Website" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-map"></i>
                                </InputGroupAddon>
                                <Select v-model="selectedCity" :options="cities" optionLabel="name"
                                    placeholder="City" />
                            </InputGroup>
                        </div>

                        <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
                            class="flex justify-content-center flex-column gap-4 w-full">

                            <!-- <InputText name="username" type="text" placeholder="Username" fluid />
                            <Message v-if="$form.country?.invalid" severity="error" size="small" variant="simple">{{
                                $form.country.error?.message }}</Message>

                            <InputText name="email" type="text" placeholder="Email" fluid />
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                                $form.country.error?.message }}</Message> -->

                            <Password name="password" type="text" placeholder="Password" :formControl="{ validateOnValueUpdate: true }" toggleMask fluid>
                                <template #header>
                                    <div class="font-semibold text-xm mb-4">Pick a password</div>
                                </template>
                                <template #footer>
                                    <Divider />
                                    <Message v-if="$form.password?.invalid"
                                        v-for="(error, index) of $form.password.errors" :key="index" severity="error"
                                        size="small" variant="simple">{{ error.message }}</Message>
                                </template>
                            </Password>

                            <AutoComplete name="country" optionLabel="country" placeholder="Country"
                                :suggestions="filteredCountries" @complete="searchCountries" fluid />
                            <Message v-if="$form.country?.invalid" severity="error" size="small" variant="simple">{{
                                $form.country.error?.message }}</Message>

                            <!-- <AutoComplete name="location" optionLabel="location" placeholder="Location"
                                :suggestions="filteredLocation" @complete="searchLocation" fluid />
                            <Message v-if="$form.location?.invalid" severity="error" size="small" variant="simple">{{
                                $form.country.error?.message }}</Message>

                            <AutoComplete name="city" optionLabel="city" placeholder="City" :suggestions="filteredCity"
                                @complete="searchCity" fluid />
                            <Message v-if="$form.country?.invalid" severity="error" size="small" variant="simple">{{
                                $form.country.error?.message }}</Message> -->

                            <div class="flex justify-content-center">
                                <Button class="w-3" type="submit" severity="primary" label="Submit" />
                            </div>

                        </Form>
                        <Toast />

                    </template>
                </Card>
            </div>
        </div>
    </div>

</template>