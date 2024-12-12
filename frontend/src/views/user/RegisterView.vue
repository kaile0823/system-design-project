<script setup>

import { ref, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { TaiwanService } from "@/service/TaiwanService";
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const initialValues = ref({
    uname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    country: { district: '', city: '', address: '' },
});
const uname = ref(null);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const cond1 = ref(true); // When password is empty
const cond2 = ref(true); // When password does not match

const selectedCounty = ref('');
const selectedDistrict = ref('');
const counties = ref([]);
const districts = ref([]);
const allDistricts = ref([]);

watch(selectedCounty, (newValue) => {
    // Update districts based on the selected county
    const index = counties.value.findIndex((item) => item === newValue);
    if (index !== -1) {
        const array = allDistricts.value[index];
        districts.value = [];
        array.english.forEach((value, index) => {
            districts.value.push(`${value} ${array.mandarin[index]}`);
        })
        // console.log(districts.value);
    }
});

onMounted(() => {

    const obj = TaiwanService.getLocationInfo();
    const englishArray = obj.counties.english;
    const mandarinArray = obj.counties.mandarin;

    // Get county info
    englishArray.forEach((value, index) => {
        counties.value.push(`${value} ${mandarinArray[index]}`);
    });
    // console.log(counties.value);

    // Get district info
    const englishArray2 = obj.districts.english;
    const mandarinArray2 = obj.districts.mandarin;
    englishArray2.forEach((value, index) => {
        allDistricts.value.push({ english: value[0], mandarin: mandarinArray2[index][0] });
    })
});

const resolver = ref(zodResolver(
    z.object({
        uname: z.string()
            .min(3, { message: 'Minimum 3 characters.' })
            .max(30, { message: 'Maximum 30 characters.' }),
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
        address: z.string()
            .min(1, { message: 'Address is required' }),
        county: z.any().refine((val) => {
            if (val) {
                return true
            }
            return false;
        }, { message: 'County is required.' }),
        district: z.any().refine((val) => {
            console.log(val);
            if (val) {
                return true
            }
            return false;
        }, { message: 'District is required.' }),
        passwordConfirm: z.string(),

    }).superRefine(async (data, ctx) => {

        // console.log(data);
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
            const datas =
            {
                uname: data.uname,
                email: data.email,
                password: data.password,
                address: {
                    address: data.address,
                    county: data.county,
                    district: data.district,
                }
            }
            // console.log(datas);

            // Check if username or email already exists
            const userResponse = await axios.post('http://localhost:3002/api/users/', datas);
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
                            <Message v-if="$form.address?.invalid" class='col-6' severity="error" size="small"
                                variant="simple">{{
                                    $form.address.error?.message }}</Message>

                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-map"></i>
                                </InputGroupAddon>
                                <Select v-model="selectedCounty" name="county" :options="counties"
                                    placeholder="Counties" fluid />

                                <InputGroupAddon>
                                    <i class="pi pi-map"></i>
                                </InputGroupAddon>
                                <Select v-model="selectedDistrict" name="district" :options="districts"
                                    placeholder="District" fluid />
                            </InputGroup>
                            <div class="grid">
                                <Message v-if="$form.county?.invalid" class='col-6' severity="error" size="small"
                                    variant="simple">{{
                                        $form.county.error?.message }}</Message>
                                <Message v-if="$form.district?.invalid" class='col-6' severity="error" size="small"
                                    variant="simple">{{
                                        $form.district.error?.message }}</Message>
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