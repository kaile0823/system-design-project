<script setup>

import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/useGlobalStore';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const router = useRouter();
const store = useGlobalStore();
const initialValues = ref({
    email: ''
});
const email = ref('');
const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

const resolver = ref(zodResolver(
    z.object({
        email: z.string()
            .email({ message: "Invalid email address." })
            .refine(async (val) => {
                const data = {
                    email: val,
                    password: ''
                }
                const response = await axios.post(`${backendUrl}/api/users/login`, data);
                return response.data.isEmailValid
            }, { message: 'Email does not exist' }),
    })
));

const onFormSubmit = async ({ valid }) => {
    if (valid) {
        store.setEmail(email.value);
        router.push('/user/reset-password');
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
                        <h1 class="text-center">
                            Forgot Password
                        </h1>
                    </template>
                    <template #content>
                        <div class="flex flex-column justify-content-between " style="min-height: 40vh">
                            <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues"
                                :validateOnValueUpdate="false" @submit="onFormSubmit"
                                class="flex flex-column justify-content-center gap-4" style="min-height: 40vh">
                                <InputText v-model="email" name="email" type="text" placeholder="Email" fluid />
                                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                                    $form.email.error?.message }}</Message>
                                <div class="flex justify-content-center">
                                    <Button class="w-3" type="submit" severity="primary" label="Reset Password" />
                                </div>
                            </Form>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>

</template>