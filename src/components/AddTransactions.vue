<!-- template for Adding New Trancsction -->
<template>
    <!-- Form for adding new transaction -->
    <h3>Add New Transaction</h3>
    <form id="form">
        <!-- Input for expense title -->
        <div class="form-control">
            <label for="expenseTitle">Title</label>
            <input type="text" name="expenseTitle" id="expenseTitle" placeholder="Enter expense title"
                v-model="expenseTitle" />
        </div>
        <!-- Input for transaction amount -->
        <div class="form-control">
            <label for="amount">Amount</label>
            <input type="text" name="amount" id="amount" placeholder="Enter amount" maxlength="9" v-model="amount" />
        </div>
        <!-- Select dropdown for transaction type -->
        <div class="form-control">
            <label for="type">Choose Transaction Type:</label>
            <select name="type" id="transType" v-model="selectedType">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
        </div>
        <!-- Button to add transaction -->
        <button class="btn" @click.prevent="addTransaction">Add transaction</button>
    </form>
</template>

<script>
// Importing sharedData object and useToast
import { sharedData } from '../assets/data.js';
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            // Data variables
            expensesArray: sharedData.expensesArray,
            incomeArray: sharedData.incomeArray,
            expenseTitle: '',
            amount: '',
            selectedType: '',
            toastActive: false,
            toast: useToast(),
        };
    },

    methods: {
        // Method to add transaction
        addTransaction() {
            const isValidation = this.fieldValidations();
            if (isValidation) {
                const { expenseTitle, amount, selectedType } = this;
                const transaction = { expenseTitle, amount };

                // Add transaction based on selected type
                if (selectedType === "expense") {
                    sharedData.addExpense(transaction);
                } else {
                    sharedData.addIncome(transaction);
                }

                this.toast.success("Transaction added successfully");

                // Reset fields
                this.resetFields();
            }
        },

        // Method to perform field validations
        fieldValidations() {
            const { expenseTitle, amount, selectedType, toast } = this;
            const expenseTitleRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/; // Regular expression to allow only letters
            let totalBalance = 0.00;
            let totalIncome = 0.00;
            let totalExpenses = 0.00;

            const missingFields = [];
            if (!expenseTitle) missingFields.push("Title");
            if (!amount) missingFields.push("Amount");
            if (!selectedType) missingFields.push("Transaction Type");

            // Check for missing fields
            if (missingFields.length > 0) {
                this.toastError(`Please fill out all the fields: ${missingFields.join(', ')}`);
                this.toastActive = true;
                return false;
            }

            // Validate expense title format
            if (!expenseTitleRegex.test(expenseTitle)) {
                this.toastError("Please enter a valid title with no special characters or numbers");
                this.toastActive = true;
                return false;
            }

            // Validate amount format and value
            if (isNaN(amount) || amount <= 0) {
                this.toastError("Please enter a valid positive number for the Amount");
                this.toastActive = true;
                return false;
            }

            // Calculate total income and expenses
            if (this.expensesArray.length > 0) {
                for (let expense of this.expensesArray) {
                    totalExpenses += parseFloat(expense.amount);
                }
            }
            if (this.incomeArray.length > 0) {
                for (let income of this.incomeArray) {
                    totalIncome += parseFloat(income.amount);
                }
            }
            
            // Calculate total balance
            totalBalance = totalIncome - totalExpenses;

            // Validate balance for expense transaction
            if (selectedType === "expense") {
                if (totalBalance < amount) {
                    this.toastError("Can't add Transaction! Your Balance should be higher than your Expenses. Please add Income and try again.");
                    this.toastActive = true;
                    return false;
                }
            }

            // Clear existing toast if active
            if (this.toastActive) {
                toast.clear();
            }
            return true;
        },

        // Method to display error toast message
        toastError(message) {
            this.clearToast();
            this.toast.error(message);
        },

        // Method to clear toast
        clearToast() {
            if (this.toastActive) {
                this.toast.clear();
                this.toastActive = false;
            }
        },

        // Method to reset form fields
        resetFields() {
            this.expenseTitle = '';
            this.amount = '';
            this.selectedType = '';
        },
    }
}
</script>
