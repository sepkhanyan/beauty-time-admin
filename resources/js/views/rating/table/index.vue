<template>
  <div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.index }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Salon Name">
        <template slot-scope="scope">
          <span>{{ scope.row.salon_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Number of reviews">
        <template slot-scope="scope">
          <span>{{ scope.row.reviews }}</span>
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
  import RatingsResource from '@/api/rating';

  const ratingsResource = new RatingsResource();

  export default {
    name: 'RatingsTable',
    components: {Pagination},
    inject: ['$ratingsList'],
    data() {
      return {
        loading: false,
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 5,
          salon_name: null,
        },
      };
    },
    created() {
      this.$ratingsList.$on('search-rating', this.handleFilter);
      this.getList();
    },
    methods: {
      async getList() {
        this.listLoading = true;
        const {data} = await ratingsResource.list(this.listQuery);
        this.list = data.ratings;
        this.total = data.total;
        this.listLoading = false;
      },
      handleFilter(salon_name) {
        this.listQuery.salon_name = salon_name;
        this.listQuery.page = 1;
        this.getList();
      },
    },
  };
</script>

<style scoped>

</style>
