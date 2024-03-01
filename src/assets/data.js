import { reactive } from 'vue';

// Define shared data object using Vue's reactive function
export const sharedData = reactive({
  // Initialize arrays for expenses and income
  expensesArray: [],
  incomeArray: [],

  // Method to add expense to expensesArray
  addExpense(expense) {
    this.expensesArray.push(expense);
  },

  // Method to add income to incomeArray
  addIncome(income) {
    this.incomeArray.push(income);
  },

  // Method to get expenses array
  getExpenses() {
    return this.expensesArray;
  },

  // Method to get income array
  getIncome() {
    return this.incomeArray;
  }
});
