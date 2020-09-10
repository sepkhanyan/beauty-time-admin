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

            <el-table-column :label="$t('table.salonName')">
                <template slot-scope="{row}">
                    <span class="link-type" @click="showSalon(row)">{{ row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.directorName')">
                <template slot-scope="{row}">
                    <span class="link-type" @click="showSalon(row)">{{ row.user.name }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('user.phoneNumber')" width="150px">
                <template slot-scope="{row}">
                    <span class="link-type" @click="showSalon(row)">{{ row.phone_number }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('user.email')">
                <template slot-scope="{row}">
                    <span class="link-type" @click="showSalon(row)">{{ row.user.email }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.date')" width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at | parseTime('{d}-{m}-{y}') }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
                <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter">
                        {{ row.status }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding">
                <template slot-scope="{row}">
                    <el-button v-if="listQuery.status == 'all'" type="primary" @click="showSalon(row)">
                        {{ $t('table.view') }}
                    </el-button>

                    <el-button v-if="listQuery.status != 'all' && row.status == 'in review'" :disabled="buttonDisable"
                               type="success" @click="handleModifyStatus(row,'active')">
                        {{ $t('table.activate') }}
                    </el-button>

                    <el-button v-if="row.status != 'disabled'" type="primary" @click="handleUpdate(row)">
                        {{ $t('table.edit') }}
                    </el-button>

                    <el-button v-if="listQuery.status != 'all' && row.status == 'invited'" :disabled="buttonDisable"
                               type="info" plain @click="reInvite(row.user_id)">
                        {{ $t('table.reInvite') }}
                    </el-button>

                    <el-tooltip class="item" effect="dark" :content="$t('table.notifyTooltip')" placement="bottom">
                        <el-button v-if="listQuery.status != 'all' && row.status == 'in review'" plain type="info"
                                   @click="handleNotifyAbout(row)">
                            {{ $t('table.notify') }}
                        </el-button>
                    </el-tooltip>

                    <el-button v-if="listQuery.status != 'all' && row.status == 'active'" :disabled="buttonDisable"
                               type="danger" @click="handleModifyStatus(row,'disabled')">
                        {{ $t('table.disable') }}
                    </el-button>

                    <el-dropdown v-if="listQuery.status != 'all' && row.status == 'disabled'" trigger="click">
                        <el-button type="primary">
                            {{ $t('table.changeStatus') }}
                            <i class="el-icon-arrow-down el-icon--right"/>
                        </el-button>

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleModifyStatus(row,'active')">
                                <el-link type="success" :underline="false">active</el-link>
                            </el-dropdown-item>

                            <el-dropdown-item class="el-tag--warning"
                                              @click.native="handleModifyStatus(row,'in review')">
                                <el-link type="warning" :underline="false">in review</el-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-button v-if="listQuery.status != 'all' && row.status == 'disabled'" :disabled="buttonDisable"
                               type="danger" @click="handleDelete(row)">
                        {{ $t('table.delete') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"
        />
    </div>
</template>

<script>
    import SalonResource from '@/api/salon';
    import UserResource from '@/api/user';
    import waves from '@/directive/waves';
    import Pagination from '@/components/Pagination';

    const userResource = new UserResource();
    const salonResource = new SalonResource();

    export default {
        name: 'SalonsTable',
        components: {Pagination},
        inject: ['$salonsList'],
        directives: {waves},
        filters: {
            statusFilter(status) {
                const statusMap = {
                    active: 'success',
                    disabled: 'danger',
                    deleted: 'danger',
                    invited: 'info',
                    'in review': 'warning',
                };
                return statusMap[status];
            },
        },
        props: {status},
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
                    salon_name: undefined,
                    sort: '+id',
                    status: this.status,
                },
            };
        },
        created() {
            this.$salonsList.$on('search-salon', this.handleFilter);
            this.$salonsList.$on('update-salons-list', this.listUpdate);
            this.$salonsList.$on('update-salon', this.salonUpdate);
            this.$salonsList.$on('filter-tab', this.tabFilter);
            this.getList();
        },
        methods: {
            async getList() {
                this.listLoading = true;
                const {data} = await salonResource.list(this.listQuery);
                this.list = data.salons;
                this.total = data.total;
                this.listLoading = false;
            },
            listUpdate(salon) {
                this.list.push(salon);
            },
            salonUpdate(salon) {
                for (const v of this.list) {
                    if (v.id === salon.id) {
                        const index = this.list.indexOf(v);
                        this.list.splice(index, 1, salon);
                        break;
                    }
                }
            },
            showSalon(row) {
                this.$store.dispatch('user/setSalon', row);
                this.$router.push('/show-salon');
            },
            tabFilter(name) {
                this.listQuery.status = name;
                this.getList();
            },
            reInvite(id) {
                this.buttonDisable = true;
                userResource.reInvite(id).then(() => {
                    this.buttonDisable = false;
                    this.$notify({
                        title: 'Success',
                        message: 'Sent successfully',
                        type: 'success',
                        duration: 2000,
                    });
                });
            },
            handleFilter(name) {
                this.listQuery.salon_name = name;
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
            handleNotifyAbout(row) {
                this.$salonsList.$emit('show-notify-about-changes-modal', row.user_id);
            },
            handleModifyStatus(row, status) {
                this.buttonDisable = true;
                salonResource.update(row.id, {status: status, status_update: true}).then(() => {
                    this.buttonDisable = false;
                    this.$message({
                        message: 'Successful operation',
                        type: 'success',
                    });
                    row.status = status;
                    this.getList();
                });
            },
            handleUpdate(row) {
                this.$salonsList.$emit('show-update-salon-modal', row);
            },
            handleDelete(row) {
                if (row.id) {
                    this.buttonDisable = true;
                    salonResource.destroy(row.id).then(() => {
                        this.$notify({
                            title: 'Success',
                            message: 'Deleted successfully',
                            type: 'success',
                            duration: 2000,
                        });
                        this.buttonDisable = false;
                        const index = this.list.indexOf(row);
                        this.list.splice(index, 1);
                    });
                }
            },
        },
    };
</script>
