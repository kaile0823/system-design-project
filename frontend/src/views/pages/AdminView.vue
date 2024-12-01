<script setup>

</script>

<template>
    <div class="card">
        <Toolbar>
            <template #center>

                <div class="flex align-items-center justify-content-center gap-5">
                    <router-link to="/main/admin/users">
                        <a class="flex align-items-center gap-2">
                            <i class="pi pi-users"></i>
                            <span>Users</span>
                        </a>
                    </router-link>
                    <router-link to="/main/admin/items">
                        <a class="flex align-items-center gap-2">
                            <i class="pi pi-warehouse"></i>
                            <span>Items</span>
                        </a>
                    </router-link>
                    <router-link to="/main/admin/orders">
                        <a class="flex align-items-center gap-2">
                            <i class="pi pi-server"></i>
                            <span>Orders</span>
                        </a>
                    </router-link>
                    <router-link to="/main/admin/carts">
                        <a class="flex align-items-center gap-2">
                            <i class="pi pi-cart-arrow-down"></i>
                            <span>Carts</span>
                        </a>
                    </router-link>
                    <router-link to="/main/admin/statistics">
                        <a class="flex align-items-center gap-2">
                            <i class="pi pi-chart-bar"></i>
                            <span>Statistics</span>
                        </a>
                    </router-link>
                    <router-link to="/main/admin/settings">
                        <a class="flex align-items-center gap-2">
                            <i class="pi pi-cog"></i>
                            <span>Settings</span>
                        </a>
                    </router-link>
                </div>
            </template>
        </Toolbar>
    </div>
    <router-view />
</template>