<script setup>

import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const initialValues = ref({
    password: '',
    passwordConfirm: ''
});
const password = ref('');
const passwordConfirm = ref('');
const success = ref(false);

const resolver = ref(zodResolver(
    z.object({
        password: z.string()
            .min(6, { message: 'Minimum 6 characters.' })
            .max(20, { message: 'Maximum 20 characters.' })
            .refine((value) => /[a-z]/.test(value), {
                message: 'Must have a lowercase letter.'
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: 'Must have an uppercase letter.'
            })
            .refine((value) => /d/.test(value), {
                message: 'Must have a number.'
            }),
        passwordConfirm: z.string(),
    }).superRefine(async (data, ctx) => {

        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                message: "Passwords do not match.",
            });
        }

        // Reset password result from server
        const response = await axios.post('http://localhost:3002/api/users/reset-password', {
            password: data.password });

        if (response.status === 200) {
            success.value = true
        }
    })
));

const onFormSubmit = async ({ valid }) => {
    if (valid && success.value) {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Password Changed', life: 3000 });
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
                        <h1 class="text-center">
                            Reset Password
                        </h1>
                    </template>
                    <template #content>
                        <div class="flex flex-column justify-content-center " style="min-height: 40vh">
                            <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues"
                                :validateOnSubmit="true" @submit="onFormSubmit"
                                class="flex flex-column justify-content-center gap-4">
                                <Password v-model="password" name="password" type="text" placeholder="Password"
                                    :feedback="false" fluid />
                                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                                    {{$form.password.error?.message }}</Message>
                                <Password v-model="passwordConfirm" name="passwordConfirm" type="text" placeholder="Confirm Password"
                                    :feedback="false" fluid />
                                <Message v-if="$form.passwordConfirm?.invalid" severity="error" size="small" variant="simple">
                                    {{$form.passwordConfirm.error?.message }}</Message>
                                <div class="flex justify-content-center">
                                    <Button class="w-3" type="submit" severity="primary" label="Reset Password" />
                                </div>
                            </Form>
                        </div>
                        <Toast />

                    </template>
                </Card>
            </div>
        </div>
    </div>

</template>