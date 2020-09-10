<template>
    <div>
        <create-modal
                v-if="createModal"
                :visible.sync="createModal"
        />

        <update-modal
                v-if="updateModal"
                :visible.sync="updateModal"
                :category="category"
        />
    </div>
</template>
<script type="text/babel">
    import CreateModal from './CreateModal';
    import UpdateModal from './UpdateModal';

    export default {
        name: 'CategoriesModals',
        inject: ['$categoriesList'],
        components: {
            CreateModal,
            UpdateModal,
        },
        data() {
            return {
                category: null,
                createModal: false,
                updateModal: false,
            };
        },
        created() {
            this.$categoriesList.$on('show-create-category-modal', this.showCreateModal);
            this.$categoriesList.$on('show-update-category-modal', this.showUpdateModal);
        },
        methods: {
            showCreateModal(bool = true) {
                this.createModal = bool;
            },
            showUpdateModal(category, bool = true) {
                this.category = category;
                this.updateModal = bool;
            },
        },
    };
</script>
