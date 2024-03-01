<!-- template for displaying Income and Expenses -->
<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <!-- Display total income -->
            <p id="money-plus" class="money plus"> {{ totalIncome }}</p>
        </div>
        <div>
            <h4>Expenses</h4>
            <!-- Display total expenses -->
            <p id="money-minus" class="money minus"> {{ totalExpenses }}</p>
        </div>
    </div>
</template>

<script>
// Importing sharedData object from data.js file
import { sharedData } from '../assets/data.js'

export default {
    data() {
        // Initialize arrays to store income and expenses
        return {
            expensesArray: [],
            incomeArray: []
        }
    },

    computed: {
        // Calculate total expenses
        totalExpenses() {
            let total = 0.00;
            if (this.expensesArray.length > 0) {
                for (let expense of this.expensesArray) {
                    total += parseFloat(expense.amount);
                }
            }
            // Format total expenses as currency
            return total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });;
        },
        // Calculate total income
        totalIncome() {
            let total = 0.00;
            if (this.incomeArray.length > 0) {
                for (let income of this.incomeArray) {
                    total += parseFloat(income.amount);
                }
            }
            // Format total income as currency
            return total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });;
        }
    },
    created() {
        // Initialize expensesArray and incomeArray with data from sharedData object when component is created
        this.expensesArray = sharedData.getExpenses();
        this.incomeArray = sharedData.getIncome();
    }
}
</script>
