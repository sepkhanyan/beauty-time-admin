<template>
  <div class="app-container">
    <filters/>

    <ratings-table/>

  </div>
</template>

<script>
  import Vue from 'vue';
  import Filters from './filters/index';
  import RatingsTable from '@/views/rating/table/index';

  export default {
    name: 'Ratings',
    provide() {
      return {
        $ratingsList: new Vue(),
      };
    },
    components: {
      RatingsTable,
      Filters,
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
