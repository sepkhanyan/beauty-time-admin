<template>
  <div class="filter-container">
    <el-input v-model="listQuery.title" :placeholder="$t('table.name')" style="width: 200px;" class="filter-item"
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
    name: 'Filters',
    inject: ['$ratingsList'],
    directives: {waves},
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 5,
          filter: undefined,
          title: null,
        },
        filterOptions: ['Salon'],
      };
    },
    methods: {
      filter() {
        this.$ratingsList.$emit('search-rating', this.listQuery.title);
      },
    },
  };
</script>

<style scoped>

</style>
