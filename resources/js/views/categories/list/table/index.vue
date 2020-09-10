<template>
  <div>
    <el-table
      ref="dragTable"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      row-key="sort_id"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('table.id')" prop="id" sortable align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.title')">
        <template slot-scope="{row}">
          <span class="link-type" @click="showCategory(row)">{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.servicesNumber')" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.number_of_services }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding">
        <template slot-scope="{row}">
          <el-button type="primary" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
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
  import CategoryResource from '@/api/category';
  import waves from '@/directive/waves';
  import Pagination from '@/components/Pagination';
  import Sortable from 'sortablejs';

  const categoryResource = new CategoryResource();

  export default {
    name: 'CategoriesTable',
    components: {Pagination},
    inject: ['$categoriesList'],
    directives: {waves},
    data() {
      return {
        loading: false,
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          sort: '+id',
          number_of_services: 0,
        },
        sortable: null,
        oldList: [],
        newList: [],
      };
    },
    created() {
      this.$categoriesList.$on('search-category', this.handleFilter);
      this.$categoriesList.$on('update-categories-list', this.listUpdate);
      this.$categoriesList.$on('update-category', this.categoryUpdate);
      this.getList();
    },
    methods: {
      async getList() {
        this.listLoading = true;
        const {data} = await categoryResource.list(this.listQuery);
        this.list = data.categories;
        this.total = data.total;
        this.listLoading = false;
        this.oldList = this.list.map(v => v.id);
        this.newList = this.oldList.slice();
        this.$nextTick(() => {
          this.setSort();
        });
      },
      setSort() {
        const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost',
          setData: function(dataTransfer) {
            dataTransfer.setData('Text', '');
          },
          onEnd: evt => {
            const targetRow = this.list.splice(evt.oldIndex, 1)[0];
            this.list.splice(evt.newIndex, 0, targetRow);
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
            this.newList.splice(evt.newIndex, 0, tempIndex);
            categoryResource.sort(this.newList);
          },
        });
      },
      listUpdate(category) {
        this.list.push(category);
        this.oldList = this.list.map(v => v.id);
        this.newList = this.oldList.slice();
      },
      categoryUpdate(category) {
        for (const v of this.list) {
          if (v.id === category.id) {
            const index = this.list.indexOf(v);
            this.list.splice(index, 1, category);
            break;
          }
        }
      },
      showCategory(row) {
        this.$router.push({path: '/category-show/' + row.id });
      },
      handleFilter(title) {
        this.listQuery.title = title;
        this.listQuery.page = 1;
        this.getList();
      },
      sortChange(data) {
        const {prop, order} = data;
        if (prop === 'id') {
          this.sortByID(order);
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id';
        } else {
          this.listQuery.sort = '-id';
        }
        this.handleFilter();
      },
      handleUpdate(row) {
        this.$categoriesList.$emit('show-update-category-modal', row);
      },
    },
  };
</script>
<style>
  .sortable-ghost {
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>
