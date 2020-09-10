<template>
  <div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.index }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Username">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Phone Number">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Salon">
        <template slot-scope="scope">
          <span>{{ scope.row.salon_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Review">
        <template slot-scope="scope">
          <span>{{ scope.row.review }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Rating">
        <template slot-scope="scope">
          <span>{{ scope.row.rating }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
  import ReviewsResource from '@/api/reviews';

  const reviewsResource = new ReviewsResource();

  export default {
    name: 'ReviewsTable',
    components: {Pagination},
    inject: ['$reviewsList'],
    data() {
      return {
        loading: false,
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 5,
          salon_name: null,
          user_name: null,
        },
      };
    },
    created() {
      this.$reviewsList.$on('search-review', this.handleFilter);
      this.getList();
    },
    methods: {
      async getList() {
        this.listLoading = true;
        const {data} = await reviewsResource.list(this.listQuery);
        this.list = data.reviews;
        this.total = data.total;
        this.listLoading = false;
      },
      handleFilter(name) {
        this.listQuery.user_name = name;
        this.listQuery.salon_name = name;
        this.listQuery.page = 1;
        this.getList();
      },
    },
  };
</script>

<style scoped>

</style>
