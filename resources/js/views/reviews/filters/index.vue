<template>
  <div class="filter-container">
    <el-input v-model="listQuery.user_name" placeholder="Search" style="width: 200px;" class="filter-item"
              @keyup.enter.native="filter"/>
    <el-select v-model="listQuery.filter" placeholder="Filter By" clearable style="width: 110px" class="filter-item">
      <el-option v-for="item in filterOptions" :key="item" :label="item" :value="item" />
    </el-select>
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="filter">
      {{ $t('table.search') }}
    </el-button>
  </div>
</template>

<script>
  import waves from '@/directive/waves'; // Waves directive

  export default {
    name: 'ReviewsFilters',
    inject: ['$reviewsList'],
    directives: {waves},
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 5,
          filter: undefined,
          user_name: null,
          salon_name: null,
        },
        filterOptions: ['Salon', 'Username'],
      };
    },
    methods: {
      filter() {
        this.$reviewsList.$emit('search-review', this.listQuery.user_name);
      },
    },
  };
</script>

<style scoped>

</style>
