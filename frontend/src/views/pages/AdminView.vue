<script setup>

import Card from "primevue/card";

</script>

<template>
    <div class="">
        <div class="grid">
            <div class="col-1">
                <Card>
                    <template #content>
                        <div class="flex flex-column align-items-center justify-content-center gap-5">
                            <router-link to="/main/admin/database">
                                <a class="flex flex-column align-items-center gap-2">
                                    <i class="pi pi-database"></i>
                                    <span>Database</span>
                                </a>
                            </router-link>
                            <router-link to="/main/admin/users">
                                <a class="flex flex-column align-items-center gap-2">
                                    <i class="pi pi-users"></i>
                                    <span>Users</span>
                                </a>
                            </router-link>
                            <router-link to="/main/admin/statistics">
                                <a class="flex flex-column align-items-center gap-2">
                                    <i class="pi pi-chart-bar"></i>
                                    <span>Statistics</span>
                                </a>
                            </router-link>
                            <router-link to="/main/admin/settings">
                                <a class="flex flex-column align-items-center gap-2">
                                    <i class="pi pi-cog"></i>
                                    <span>Settings</span>
                                </a>
                            </router-link>

                            <i class="pi pi-cart-arrow-down"></i>
                            <i class="pi pi-cart-plus"></i>
                            <i class="pi pi-shopping-cart"></i>
                            <i class="pi pi-check"></i>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col">
                <router-view />
            </div>
        </div>
    </div>
</template>