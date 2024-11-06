<script setup>

import { Form } from '@primevue/forms';

import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Toast from 'primevue/toast';

const toast = useToast();

const initialValues = reactive({
    username: ''
});

const resolver = ({ values }) => {
    const errors = {};

    if (!values.username) {
        errors.username = [{ message: 'Username is required.' }];
    }

    return {
        errors
    };
};

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({
            severity: 'success',
            summary: 'Form is submitted.',
            life: 3000
        });
    }
};

</script>

<template>
    <div class="border-1">
        This is form
        <div class="card flex justify-center">
            <Toast />

            <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit"
                class="flex flex-col gap-4 w-full sm:w-56">
                <div class="flex flex-col gap-1">
                    <InputText name="username" type="text" placeholder="Username" fluid />
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                        $form.username.error?.message }}</Message>
                </div>
                <Button type="submit" severity="secondary" label="Submit" />
            </Form>
            
        </div>
    </div>
</template>