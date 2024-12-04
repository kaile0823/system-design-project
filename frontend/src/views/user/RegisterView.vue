<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { CountryService } from "@/service/CountryService";
import { TaiwanService } from "@/service/TaiwanService";
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const initialValues = ref({
    uname: 'ABC',
    email: 'howwilson11@gmail.com',
    password: 'Nut12345',
    passwordConfirm: 'Nut12345',
    country: { district: '', city: '', address: '' },
});
const uname = ref(null);
const email = ref('howwilson11@gmail.com');
const password = ref('Nut12345');
const passwordConfirm = ref('Nut12345');
const cond1 = ref(true); // When password is empty
const cond2 = ref(true); // When password does not match

const countries = ref();
// const cities = ref([
//     { name: 'New York', code: 'NY' },
//     { name: 'Rome', code: 'RM' },
//     { name: 'London', code: 'LDN' },
//     { name: 'Istanbul', code: 'IST' },
//     { name: 'Paris', code: 'PRS' }
// ]);

const districts = ref([]);
const cities = ref([]);

onMounted(() => {
    CountryService.getCountries().then((data) => (countries.value = data));

    const obj = TaiwanService.getLocationInfo();
    console.log(obj);

    // Iterate over the methods in the objects
    Object.keys(obj).forEach((key) => {

    });

    const englishArray = obj.counties.english;
    const mandarinArray = obj.counties.mandarin;

    // Pair and print the values
    englishArray.forEach((value, index) => {
        console.log(`${value} ${mandarinArray[index]}`);
    });

    const englishArray2 = obj.districts.english[0];
    const mandarinArray2 = obj.districts.mandarin[0];

    // Pair and print the values
    englishArray2.forEach((value, index) => {
        console.log(`${value} ${mandarinArray2[index]}`);
    });
});

const resolver = ref(zodResolver(
    z.object({
        uname: z.string()
            .min(3, { message: 'Minimum 3 characters.' }),
        email: z.string()
            .email('Invalid email'),
        password: z.string()
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
            })
            .refine((value) => {
                if (value) {
                    cond1.value = false;
                    return true
                } else {
                    cond1.value = true;
                    return false
                }
            }),
        passwordConfirm: z.string()
    }).superRefine(async (data, ctx) => {

        console.log(data);
        // Check if password does not match
        if (data.password !== data.passwordConfirm) {
            cond2.value = true;
            ctx.addIssue({
                path: ['passwordConfirm'],
                message: 'Passwords do not match.',
            });
        }
        else {
            cond2.value = false;
        }

        // Proceed if password validation is valid
        if (cond1.value || cond2.value) {
            return
        }

        try {
            const address =
            {
                district: 'test',
                city: 'test',
                address: 'test'
            }
            const userResponse = await axios.post('http://localhost:3002/api/users/', {
                uname: data.uname,
                email: data.email,
                password: data.password,
                address: address
            });

            console.log(userResponse);
            // Check if username or email already exists
            if (userResponse.status === 200) {
                if (userResponse.data.uname) {
                    ctx.addIssue({
                        path: ['uname'],
                        message: 'Username already exists.',
                    });
                }
                if (userResponse.data.email) {
                    ctx.addIssue({
                        path: ['email'],
                        message: 'Email already exists.',
                    });
                }
            }
            if (userResponse.status !== 201) {
                ctx.addIssue({
                    path: ['uname'],
                    message: 'Form incomplete',
                });
            }
        } catch (error) {
            console.log(error);
        }
    })
));

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Registered Successfully.', life: 3000 });
        router.push('/user/login');
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
                            :validateOnValueUpdate="false" @submit="onFormSubmit" class="flex flex-column gap-4 px-6">
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-user"></i>
                                </InputGroupAddon>
                                <InputText v-model="uname" name="uname" placeholder="Username" />
                            </InputGroup>
                            <Message v-if="$form.uname?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.uname.error?.message }}</Message>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-envelope"></i>
                                </InputGroupAddon>
                                <InputText v-model="email" name="email" placeholder="Email" />
                            </InputGroup>
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.email.error?.message }}</Message>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-key"></i>
                                </InputGroupAddon>
                                <Password v-model="password" name="password" type="text" placeholder="Password"
                                    :formControl="{ validateOnValueUpdate: true }" toggleMask fluid>
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
                            </InputGroup>
                            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.password.error?.message }}</Message>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-key"></i>
                                </InputGroupAddon>
                                <Password v-model="passwordConfirm" name="passwordConfirm" type="text"
                                    placeholder="Confirm Password" :formControl="{ validateOnValueUpdate: true }"
                                    :feedback="false" toggleMask fluid />
                            </InputGroup>
                            <Message v-if="$form.passwordConfirm?.invalid" severity="error" size="small"
                                variant="simple">
                                {{ $form.passwordConfirm.error?.message }}</Message>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-address-book"></i>
                                </InputGroupAddon>
                                <InputText v-model="address" name="address" placeholder="Address" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-map"></i>
                                </InputGroupAddon>
                                <Select name="district" :options="districts" optionLabel="name" placeholder="District"
                                    fluid />

                                <InputGroupAddon>
                                    <i class="pi pi-map"></i>
                                </InputGroupAddon>
                                <Select name="city" :options="cities" optionLabel="name" placeholder="City" fluid />
                            </InputGroup>
                            <div class="grid">
                                <Message v-if="$form.district?.invalid" class='col-6' severity="error" size="small"
                                    variant="simple">{{
                                        $form.district.error?.message }}</Message>
                                <Message v-if="$form.city?.invalid" class='col-6' severity="error" size="small"
                                    variant="simple">{{
                                        $form.city.error?.message }}</Message>
                            </div>

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