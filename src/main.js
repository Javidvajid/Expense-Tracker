// Import CSS styles
import './assets/style.css'

// Import Vue related libraries
import { createApp } from 'vue'
import App from './App.vue'

// Import Toast related libraries and styles
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css';

// Create Vue app instance
const app = createApp(App);

// Configure toast options
const toastOptions = {
    // Set toast duration in milliseconds
    timeout: 2000,
};

// Use Toast plugin with configured options
app.use(Toast, toastOptions);

// Mount the app to the specified element
app.mount('#app');
