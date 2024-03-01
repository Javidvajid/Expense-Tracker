<!-- template for displaying Transaction History -->
<template>
  <h3>Transaction History</h3>
  <!-- List of expenses and income -->
  <ul id="list" class="list">
    <li class="minus" v-for="(item, index) in expensesArray">
      {{ item.expenseTitle }} <span> ₹{{ formatIndianCurrency(item.amount) }}</span><button @click="deleteItem('E', index)"
        class="delete-btn">X</button>
    </li>
    <li class="plus" v-for="(item, index) in incomeArray">
      {{ item.expenseTitle }} <span> ₹{{ formatIndianCurrency(item.amount) }}</span><button @click="deleteItem('I', index)"
        class="delete-btn">X</button>
    </li>
  </ul>

  <!-- Popup for delete confirmation -->
  <div v-if="showPopup" class="popup">
    <div class="popup-content">
      <p>Are you sure you want to delete this item?</p>
      <button @click="deleteItemConfirmed">Yes</button>
      <button @click="cancelDelete">No</button>
    </div>
  </div>
</template>

<script>
// Importing sharedData object and useToast
import { sharedData } from '../assets/data.js';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      expensesArray: [],
      incomeArray: [],
      showPopup: false,
      deleteIndex: null,
      deleteType: null,
      expenseType: '',
      arrayIndex: ''
    };
  },
  created() {
    // Initialize expensesArray and incomeArray with shared data on component creation
    this.expensesArray = sharedData.getExpenses();
    this.incomeArray = sharedData.getIncome();
  },

  methods: {
    // Method to initiate item deletion
    deleteItem(expenseType, index) {
      this.expenseType = expenseType;
      this.showPopup = true;
      this.arrayIndex = index;
    },

    // Method to confirm item deletion
    deleteItemConfirmed() {
      const toast = useToast();
      // Remove item from expensesArray or incomeArray based on expenseType
      if (this.expenseType === 'E') {
        this.expensesArray.splice(this.arrayIndex, 1);
      } else {
        this.incomeArray.splice(this.arrayIndex, 1);
      }
      this.hidePopup();

      toast.success("Transaction deleted successfully");
    },

    // Method to cancel item deletion
    cancelDelete() {
      this.hidePopup();
    },

    // Method to hide delete confirmation popup
    hidePopup() {
      // Reset popup state after hiding
      this.showPopup = false;
      this.deleteIndex = null;
      this.deleteType = null;
    },

    // Method to format amount in Indian currency
    formatIndianCurrency(amount) {
      return parseFloat(amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })).toFixed(2);
    }
  }
};
</script>

<style scoped>
/* Styling for popup */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.popup-content button {
  margin: 0 10px;
}
</style>
