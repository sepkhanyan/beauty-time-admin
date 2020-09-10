<template>
    <div class="app-container">
        <company-types-filters/>

        <company-types-table/>

        <company-types-modals/>
    </div>
</template>
<script>
    import Vue from 'vue';
    import CompanyTypesTable from './table/index';
    import CompanyTypesFilters from './filters/index';
    import CompanyTypesModals from './modals/index';

    export default {
        name: 'CompanyTypes',
        provide() {
            return {
                $companyTypes: new Vue(),
            };
        },
        components: {
            CompanyTypesTable,
            CompanyTypesFilters,
            CompanyTypesModals,
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
