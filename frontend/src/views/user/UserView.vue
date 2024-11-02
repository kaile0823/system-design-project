<script setup>

import { ref, reactive } from 'vue'
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';

</script>

<template>
  <div style="height: 100vh;" class="back">
    <div class="hidden " style="background-color: white;">
      User View, developement bar
      <router-link to="/main/">
        <Button label="Dev: To main" />
      </router-link>
    </div>

    <div class="grid align-items-center justify-center" style="min-height: 100vh;">
      <div class="col-offset-2 col-8">
        <Card style="background-color: var(--p-surface-100); min-height: 65vh">
          <template #title>
            <h1 class="text-center">
              Log In
            </h1>
            <p class="text-center">Please enter your username and email</p>
          </template>
          <template #content>
            <form action="">
              <div class="flex flex-column gap-3 mt-4">
                <InputText name="username" type="text" placeholder="Username" fluid />
                <InputText name="email" type="text" placeholder="Email" fluid />
                <div class="m-2">
                  <router-link to="/user/forgot-password">
                    <a>
                      Forgot password?
                    </a>
                  </router-link>
                </div>
                <div class="flex justify-content-center">
                  <Button class="w-3" type="submit" severity="primary" label="Submit" />

                </div>
                <div class="flex text-center m-5">
                  Don't have an account?
                  <router-link to="/user/register">
                    <a>
                      Register Here
                    </a>
                  </router-link>
                  .
                </div>
              </div>
            </form>
          </template>
        </Card>
      </div>
    </div>
  </div>

</template>