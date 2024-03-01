<!-- template for displaying Balance -->
<template>
    <h4>Your Balance</h4>
    <h1 id="balance">{{ totalBalance }}</h1>
</template>

<script>
// Importing sharedData object from data.js file
import { sharedData } from '../assets/data.js'

export default {
    data() {
        // Initializing arrays to store expenses and income
        return {
            expensesArray: [],
            incomeArray: [],
        }
    },

    computed: {
        // Calculating total expenses
        totalExpenses() {
            let total = 0.00;
            // Summing up expenses if array is not empty
            if (this.expensesArray.length > 0) {
                for (let expense of this.expensesArray) {
                    total += parseFloat(expense.amount);
                }
            }
            return total;
        },

        // Calculating total income
        totalIncome() {
            let total = 0.00;
            if (this.incomeArray.length > 0) {
                for (let income of this.incomeArray) {
                    total += parseFloat(income.amount);
                }
            }
            return total;
        },

        // Calculating total balance by subtracting total expenses from total income
        totalBalance() {
            // Calculating balance with 2 decimal points
            const balance = parseFloat((this.totalIncome - this.totalExpenses).toFixed(2));
            // Formatting balance as currency in Indian Rupees
            return balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
        }
    },

    created() {
        // Fetching expenses and income arrays from shared data when component is created
        this.expensesArray = sharedData.getExpenses();
        this.incomeArray = sharedData.getIncome();
    }
}
</script>
