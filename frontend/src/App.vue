<script setup>

import { FormField } from '@primevue/forms';
import { ref, reactive } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Toast from 'primevue/toast';

const toast = useToast();

const value = ref('');

const resolver = zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required.' })
    })
);

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};

</script>


<template>
    <Toast />

    <div class="card flex justify-center">
        <!-- <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56"> -->
            <!-- <FormField v-slot="$field" name="username" initialValue="" class="flex flex-col gap-1"> -->
                <!-- <InputText type="text" placeholder="Username" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message
                    }}</Message> -->
            <!-- </FormField> -->
            <InputText type="text" v-model="value" />
            <Message v-if="!value" severity="error" size="small" variant="simple">Username is required.</Message>
            {{ value }}
            <Button type="submit" severity="secondary" label="Submit" />
        <!-- </Form> -->
    </div>


    <main class="" style="height: 100vh;">
        <router-view />

    </main>
</template>
