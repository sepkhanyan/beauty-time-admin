<template>
    <div class="app-container">
        <salons-filters :status="status"/>

        <salons-table :status="status"/>

        <salons-modals/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import SalonsTable from './table/index';
    import SalonsFilters from './filters/index';
    import SalonsModals from './modals/index';

    export default {
        name: 'Salons',
        provide() {
            return {
                $salonsList: new Vue(),
            };
        },
        components: {
            SalonsTable,
            SalonsFilters,
            SalonsModals,
        },
        props: {status},
    };
</script>
