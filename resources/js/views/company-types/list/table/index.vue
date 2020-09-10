<template>
    <div>
        <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
        >
            <el-table-column :label="$t('table.id')" prop="id" sortable align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.title')">
                <template slot-scope="{row}">
                    <span class="link-type" @click="showType(row)">{{ row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.description')">
                <template slot-scope="{row}">
                    <span class="link-type" @click="showType(row)">{{ row.description }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.companiesNumber')" align="center" width="200px">
                <template slot-scope="{row}">
                    <span class="link-type">{{ row.number_of_companies }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding">
                <template slot-scope="{row}">
                    <el-button type="primary" @click="handleUpdate(row)">
                        {{ $t('table.edit') }}
                    </el-button>

                    <el-button type="info" plain :disabled="buttonDisable" @click="handleArchive(row)">
                        {{ $t('table.archive') }}
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
    import CompanyTypeResource from '@/api/company-type';
    import waves from '@/directive/waves';
    import Pagination from '@/components/Pagination';

    const companyTypeResource = new CompanyTypeResource();

    export default {
        name: 'CategoriesTable',
        components: {Pagination},
        inject: ['$companyTypes'],
        directives: {waves},
        data() {
            return {
                buttonDisable: false,
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    title: undefined,
                    sort: '+id',
                    number_of_companies: 0,
                },
                downloadLoading: false,
            };
        },
        created() {
            this.$companyTypes.$on('search-company-type', this.handleFilter);
            this.$companyTypes.$on('update-company-types-list', this.listUpdate);
            this.$companyTypes.$on('update-company-type', this.typeUpdate);
            this.getList();
        },
        methods: {
            async getList() {
                this.listLoading = true;
                const {data} = await companyTypeResource.list(this.listQuery);
                this.list = data.types;
                this.total = data.total;
                this.listLoading = false;
            },
            listUpdate(type) {
                this.list.push(type);
            },
            typeUpdate(type) {
                for (const v of this.list) {
                    if (v.id === type.id) {
                        const index = this.list.indexOf(v);
                        this.list.splice(index, 1, type);
                        break;
                    }
                }
            },
            showType(row) {
                console.log(row);
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
            handleArchive(row) {
                this.buttonDisable = true;
              companyTypeResource.update(row.id, {archived: 1}).then(() => {
                    this.$notify({
                        title: 'Success',
                        message: 'Archived successfully',
                        type: 'success',
                        duration: 2000,
                    });
                    this.buttonDisable = false;
                    const index = this.list.indexOf(row);
                    this.list.splice(index, 1);
                });
            },
            handleUpdate(row) {
                this.$companyTypes.$emit('show-update-company-type-modal', row);
            },
        },
    };
</script>
