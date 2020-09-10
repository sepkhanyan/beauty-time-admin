<template>
    <div>
        <div class="filter-container">
            <el-input v-model="salon_name" :placeholder="$t('table.salonName')" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="filter"/>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="filter">
                {{ $t('table.search') }}
            </el-button>

            <el-button v-if="status == 'all' || status == 'invited'" class="filter-item" style="margin-left: 10px;"
                       type="primary" icon="el-icon-edit" @click="create">
                {{ $t('table.add') }}
            </el-button>
        </div>

        <div v-if="status == 'all' || status == 'invited'" class="tabs-container">
            <el-tabs v-model="activeName" style="margin-top:15px;" @tab-click="handleTabClick">
                <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key"/>
            </el-tabs>
        </div>

    </div>
</template>
<script>
    import waves from '@/directive/waves'; // Waves directive
    export default {
        name: 'Filters',
        inject: ['$salonsList'],
        directives: {waves},
        props: {status},
        data() {
            return {
                salon_name: undefined,
                tabMapOptions: [
                    {label: 'All', key: 'all'},
                    {label: 'Invited', key: 'invited'},
                ],
                activeName: 'all',
            };
        },
        methods: {
            filter() {
                this.$salonsList.$emit('search-salon', this.salon_name);
            },
            create() {
                this.$salonsList.$emit('show-create-salon-modal');
            },
            handleTabClick(tab) {
                this.$salonsList.$emit('filter-tab', tab.name);
            },
        },
    };
</script>
