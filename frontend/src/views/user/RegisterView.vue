<script setup>

import { ref, onMounted } from "vue";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import { CountryService } from "@/service/CountryService";

const toast = useToast();
const initialValues = ref({
    country: { name: '' },
    email: '',
    password: '',
    uname: ''
});
const uname = ref(null);
const password = ref(null);
const passwordConfirm = ref('');
const cond1 = ref(true);
const cond2 = ref(true);
const selectedCity = ref();
const countries = ref();
const filteredCountries = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

onMounted(() => {
    CountryService.getCountries().then((data) => (countries.value = data));
});


// const resolver = ref(zodResolver(
//     z.object({
//         password: z.string()
//             .min(6, { message: 'Minimum 6 characters.' })
//             .max(20, { message: 'Maximum 20 characters.' })
//             .refine((value) => /[a-z]/.test(value), {
//                 message: 'Must have a lowercase letter.'
//             })
//             .refine((value) => /[A-Z]/.test(value), {
//                 message: 'Must have an uppercase letter.'
//             })
//             .refine((value) => /[0-9]/.test(value), {
//                 message: 'Must have a number.'
//             })
//             .refine((value) => {
//                 if (value) {
//                     cond1.value = false;
//                     return true
//                 } else {
//                     cond1.value = true;
//                     return false
//                 }
//             }),
//         passwordConfirm: z.string()
//     }).superRefine((data, ctx) => {
//         if (data.password !== data.passwordConfirm) {
//             cond2.value = true;
//             ctx.addIssue({
//                 path: ['passwordConfirm'],
//                 message: 'Passwords do not match.',
//             });
//         }
//         else {
//             cond2.value = false;
//         }
//     })
// ));

const resolver = ref(zodResolver(
    z.object({
        uname: z.string()
            .min(3, { message: 'Minimum 3 characters.' }),
        email: z.string()
            .email('Invalid email'),
        password: z
            .string()
            .min(6, { message: 'Minimum 6 characters.' })
            .max(20, { message: 'Maximum 20 characters.' })
            .refine((value) => /[a-z]/.test(value), {
                message: 'Must have a lowercase letter.'
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: 'Must have an uppercase letter.'
            })
            .refine((value) => /[0-9]/.test(value), {
                message: 'Must have a number.'
            }),
        country: z.union([
            z.object({
                name: z.string().min(1, 'Country is required.')
            }),
            z.any().refine((val) => false, { message: 'Country is required.' })
        ]),
    }).superRefine(async (values, ctx) => {

        // if (values) {
        //     ctx.addIssue({
        //         path: ['password'],
        //         message: 'Password is incorrect',
        //     });
        // }

    })
));

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
    if (valid) {
        toast.add({ severity: 'success', summary: 'Registered Successfully.', life: 3000 });
    }
};

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
                        <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues"
                            :validateOnValueUpdate="true" @submit="onFormSubmit" class="flex flex-column gap-4 px-6">
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-user"></i>
                                </InputGroupAddon>
                                <InputText v-model="uname" placeholder="Username" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-envelope"></i>
                                </InputGroupAddon>
                                <InputNumber v-model="email" placeholder="Email" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-key"></i>
                                </InputGroupAddon>
                                <Password v-model="password" name="password" type="text" placeholder="Password"
                                    toggleMask fluid>
                                    <template #header>
                                        <div class="font-semibold text-xm mb-4">Pick a password</div>
                                    </template>
                                    <template #footer>
                                        <Divider />
                                        <Message v-if="$form.password?.invalid"
                                            v-for="(error, index) of $form.password.errors" :key="index"
                                            severity="error" size="small" variant="simple">{{ error.message }}</Message>
                                    </template>
                                </Password>
                                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.password.error?.message }}</Message>
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-key"></i>
                                </InputGroupAddon>
                                <Password v-model="passwordConfirm" name="passwordConfirm" type="text"
                                    placeholder="Confirm Password" :feedback="false" toggleMask fluid />
                                <Message v-if="$form.passwordConfirm?.invalid" severity="error" size="small"
                                    variant="simple">
                                    {{ $form.passwordConfirm.error?.message }}</Message>
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-map"></i>
                                </InputGroupAddon>
                                <Select v-model="selectedCity" :options="cities" optionLabel="name"
                                    placeholder="City" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-map"></i>
                                </InputGroupAddon>
                                <AutoComplete name="country" optionLabel="country" placeholder="Country"
                                    :suggestions="filteredCountries" @complete="searchCountries" fluid />
                                <Message v-if="$form.country?.invalid" severity="error" size="small" variant="simple">{{
                                    $form.country.error?.message }}</Message>
                            </InputGroup>

                            <div class="flex justify-content-center">
                                <Button class="w-3" type="submit" severity="primary" label="Register" />
                            </div>
                        </Form>
                        <Toast />
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>