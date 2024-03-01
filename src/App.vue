<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpenses />
    <ExpenseHistory />
    <AddTransactions />
  </div>
</template>

<script>
  //importing components
  import Header from './components/Header.vue';
  import Balance from './components/Balance.vue';
  import IncomeExpenses from './components/IncomeExpenses.vue';
  import ExpenseHistory from './components/ExpenseHistory.vue';
  import AddTransactions from './components/AddTransactions.vue';

  export default {
    //exporting components
    components: {
      Header,
      Balance,
      IncomeExpenses,
      ExpenseHistory,
      AddTransactions,
    },
  };
</script>

