<template>
    <div class="filter-container">
        <el-input v-model="title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item"
                  @keyup.enter.native="filter"/>

        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="filter">
            {{ $t('table.search') }}
        </el-button>

        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="create">
            {{ $t('table.add') }}
        </el-button>
    </div>
</template>
<script>
    import waves from '@/directive/waves';

    export default {
        name: 'Filters',
        inject: ['$categoriesList'],
        directives: {waves},
        data() {
            return {
                title: undefined,
            };
        },
        methods: {
            filter() {
                this.$categoriesList.$emit('search-category', this.title);
            },
            create() {
                this.$categoriesList.$emit('show-create-category-modal');
            },
        },
    };
</script>
