<template>
    <div>
        <create-modal
                v-if="createModal"
                :visible.sync="createModal"
        />

        <update-modal
                v-if="updateModal"
                :visible.sync="updateModal"
                :type="companyType"
        />
    </div>
</template>
<script type="text/babel">
    import CreateModal from './CreateModal';
    import UpdateModal from './UpdateModal';

    export default {
        name: 'CompanyTypesModals',
        inject: ['$companyTypes'],
        components: {
            CreateModal,
            UpdateModal,
        },
        data() {
            return {
                companyType: null,
                createModal: false,
                updateModal: false,
            };
        },
        created() {
            this.$companyTypes.$on('show-create-company-type-modal', this.showCreateModal);
            this.$companyTypes.$on('show-update-company-type-modal', this.showUpdateModal);
        },
        methods: {
            showCreateModal(bool = true) {
                this.createModal = bool;
            },
            showUpdateModal(type, bool = true) {
                this.companyType = type;
                this.updateModal = bool;
            },
        },
    };
</script>
