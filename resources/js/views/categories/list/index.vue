<template>
    <div class="app-container">
        <categories-filters/>

        <categories-table/>

        <categories-modals/>
    </div>
</template>
<script>
    import Vue from 'vue';
    import CategoriesTable from './table/index';
    import CategoriesFilters from './filters/index';
    import CategoriesModals from './modals/index';

    export default {
        name: 'Categories',
        provide() {
            return {
                $categoriesList: new Vue(),
            };
        },
        components: {
            CategoriesTable,
            CategoriesFilters,
            CategoriesModals,
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .documentation-container {
        margin: 50px;

        .document-btn {
            float: left;
            margin-left: 50px;
            display: block;
            cursor: pointer;
            background: black;
            color: white;
            height: 60px;
            width: 200px;
            line-height: 60px;
            font-size: 20px;
            text-align: center;
        }
    }
</style>
