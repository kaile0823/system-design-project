<script setup>

import { ref } from "vue";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const initialValues = ref({
  email: '',
  password: ''
});
const email = ref('');
const password = ref('');

const resolver = ref(zodResolver(
  z.object({
    email: z.string().email('Invalid email'),
    password: z.string(),
  }).superRefine(async (values, ctx) => {
    const loginData = {
      email: values.email,
      password: values.password
    }

    // Login result from server
    const response = await axios.post('http://localhost:3002/api/users/login', loginData);

    if (!response.data.isEmailValid) {
      ctx.addIssue({
        path: ['email'],
        message: 'Email does not exist in server',
      });
    } else if (!response.data.isPasswordValid) {
      ctx.addIssue({
        path: ['password'],
        message: 'Password is incorrect',
      });
    }

    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
    }
  })
));

// const resolver = ({ values }) => {
//   const errors = {};

//   if (!values.email) {
//     errors.email = [{ message: 'Email is required.' }];
//   } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
//     errors.email = [{ message: 'Invalid email address.' }];
//   }

//   if (!values.password) {
//     errors.password = [{ message: 'Password is required.' }];
//   }

//   return {
//     errors
//   };
// };

const onFormSubmit = async ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Logged In', life: 3000 });
    router.push('/');
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
              Log In
            </h1>
          </template>
          <template #content>
            <div class="flex flex-column justify-content-between " style="min-height: 40vh">

              <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" :validateOnSubmit="true"
                @submit="onFormSubmit" class="flex flex-column justify-content-center gap-4 w-full">

                <InputText v-model="email" name="email" type="text" placeholder="Email" fluid />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                  $form.email.error?.message }}</Message>

                <Password v-model="password" name="password" type="text" placeholder="Password" :feedback="false"
                  fluid />
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                  $form.password.error?.message }}</Message>

                <router-link class="ml-2" to="/user/forgot-password">
                  <a>Forgot password?</a>
                </router-link>

                <div class="flex justify-content-center">
                  <Button class="w-3" type="submit" severity="primary" label="Log In" />
                </div>

              </Form>
              <div class="ml-2">
                Don't have an account?
                <router-link to="/user/register">
                  <a> Register Here</a>
                </router-link>
              </div>
            </div>
            <Toast />

          </template>
        </Card>
      </div>
    </div>
  </div>

</template>