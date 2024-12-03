<script setup>

import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/useGlobalStore';
import { useToast } from "primevue/usetoast";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const router = useRouter();
const store = useGlobalStore();
const toast = useToast();
const initialValues = ref({
    password: '',
    passwordConfirm: ''
});
const password = ref('');
const passwordConfirm = ref('');
const cond1 = ref(true);
const cond2 = ref(true);

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
    }).superRefine((data, ctx) => {
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
    })
));

const submit = async () => {
    try {
        const resetData = {
            email: store.getEmail,
            password: password.value
        }
        // Reset password result from server
        const response = await axios.post('http://localhost:3002/api/users/reset-password', resetData);
        if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Password Changed', life: 3000 });
            router.push('/user/login');
        }
    } catch (error) {
        console.error("Client can't reset password: ", error);
    }
}

const onFormSubmit = async ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
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
                                :validateOnValueUpdate="true" @submit="onFormSubmit"
                                class="flex flex-column justify-content-center gap-4">
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

                                <Password v-model="passwordConfirm" name="passwordConfirm" type="text"
                                    placeholder="Confirm Password" :feedback="false" toggleMask fluid />
                                <Message v-if="$form.passwordConfirm?.invalid" severity="error" size="small"
                                    variant="simple">
                                    {{ $form.passwordConfirm.error?.message }}</Message>
                                <div class="flex justify-content-center">
                                    <Button class=" w-3" type="submit" severity="primary" label="Reset Password"
                                        :disabled="cond1 || cond2" @click="submit" disabled />
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