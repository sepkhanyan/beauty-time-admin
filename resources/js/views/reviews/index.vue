<template>
  <div class="app-container">
    <reviews-filters/>

    <reviews-table/>

  </div>
</template>

<script>
  import Vue from 'vue';
  import ReviewsTable from '@/views/reviews/table/index';
  import ReviewsFilters from '@/views/reviews/filters/index';

  export default {
    name: 'Reviews',
    provide() {
      return {
        $reviewsList: new Vue(),
      };
    },
    components: {
      ReviewsFilters,
      ReviewsTable,
    },
  };
</script>
<style>
  .sortable-ghost {
    opacity: .8;
    color: #fff !important;
    background: #42b983 !important;
  }
</style>

<style scoped>
  .drag-handler {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .show-d {
    margin-top: 25px;
    margin-top: 25px;
  }
</style>
