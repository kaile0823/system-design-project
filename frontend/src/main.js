import "./assets/main.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from "@primevue/themes"

import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)
app.use(router)
app.use(ToastService)
app.use(ConfirmationService);

// Configuration of PrimeVue theme
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{indigo.50}",
            100: "{indigo.100}",
            200: "{indigo.200}",
            300: "{indigo.300}",
            400: "{indigo.400}",
            500: "{indigo.500}",
            600: "{indigo.600}",
            700: "{indigo.700}",
            800: "{indigo.800}",
            900: "{indigo.900}",
            950: "{indigo.950}"
        },
        colorScheme: {
            light: {
                formField: {
                    hoverBorderColor: "{primary.color}"
                },
                primary: {
                    color: '{indigo.500}',
                    inverseColor: '#ffffff',
                    hoverColor: '{indigo.600}',
                    activeColor: '{indigo.600}'
                },
                highlight: {
                    background: '{indigo.950}',
                    focusBackground: '{indigo.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
                surface: {
                    0: '#ffffff',
                    50: '{neutral.50}',
                    100: '{neutral.100}',
                    200: '{neutral.200}',
                    300: '{neutral.300}',
                    400: '{neutral.400}',
                    500: '{neutral.500}',
                    600: '{neutral.600}',
                    700: '{neutral.700}',
                    800: '{neutral.800}',
                    900: '{neutral.900}',
                    950: '{neutral.950}'
                }
            },
            dark: {
                formField: {
                    hoverBorderColor: "{primary.color}"
                },
                primary: {
                    color: '{neutral.800}',
                    inverseColor: '{neutral.50}',
                    hoverColor: '{neutral.800}',
                    activeColor: '{neutral.800}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                },
                surface: {
                    0: '{neutral.950}',
                    50: '{neutral.900}',
                    100: '{neutral.800}',
                    200: '{neutral.700}',
                    300: '{neutral.600}',
                    400: '{neutral.500}',
                    500: '{neutral.400}',
                    600: '{neutral.300}',
                    700: '{neutral.200}',
                    800: '{neutral.100}',
                    900: '{neutral.50}',
                    950: '{neutral.0}'
                }
            }
        },
        focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{primary.color}',
            offset: '1px'
        }
    },
    components: {
        card: {
            colorScheme: {
                light: {
                    root: {
                        background: '{surface.50}',
                        color: '{surface.700}'
                    },
                    subtitle: {
                        color: '{surface.500}'
                    }
                },
                dark: {
                    root: {
                        background: '{surface.200}',
                        color: '{surface.500}'
                    },
                    subtitle: {
                        color: '{surface.400}'
                    }
                }
            }
        },
        toolbar: {
            colorScheme: {
                light: {
                    root: {
                        background: '{surface.50}',
                        color: '{surface.700}'
                    },
                    border: {
                        color: '{surface.300}'
                    }
                },
                dark: {
                    root: {
                        background: '{surface.200}',
                        color: '{surface.500}'
                    },
                    border: {
                        color: '{surface.300}'
                    }
                }
            }
        }
    }
})

// Configuration of PrimeVue
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: true
        }
    }
});

app.mount('#app')