<template>
    <div>
        <create-modal v-if="createModal"
                      :visible.sync="createModal"
        />

        <update-modal v-if="updateModal"
                      :visible.sync="updateModal"
                      :salon="salon"
        />

        <notify-about-changes-modal v-if="notifyAboutChangesModal"
                                    :visible.sync="notifyAboutChangesModal"
                                    :user="user"
        />
    </div>
</template>

<script type="text/babel">
    import CreateModal from './CreateModal';
    import UpdateModal from './UpdateModal';
    import NotifyAboutChangesModal from './NotifyAboutChangesModal';

    export default {
        name: 'SalonModals',
        inject: ['$salonsList'],
        components: {
            CreateModal,
            UpdateModal,
            NotifyAboutChangesModal,
        },
        data() {
            return {
                salon: null,
                user: null,
                createModal: false,
                updateModal: false,
                notifyAboutChangesModal: false,
            };
        },
        created() {
            this.$salonsList.$on('show-create-salon-modal', this.showCreateModal);
            this.$salonsList.$on('show-update-salon-modal', this.showUpdateModal);
            this.$salonsList.$on('show-notify-about-changes-modal', this.showNotifyModal);
        },
        methods: {
            showCreateModal(bool = true) {
                this.createModal = bool;
            },
            showUpdateModal(salon, bool = true) {
                this.salon = salon;
                this.updateModal = bool;
            },
            showNotifyModal(user, bool = true) {
                this.user = user;
                this.notifyAboutChangesModal = bool;
            },
        },
    };
</script>
