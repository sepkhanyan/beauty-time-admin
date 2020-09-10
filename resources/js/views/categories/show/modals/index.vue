<template>
    <div>
        <add-service-modal
            v-if="addServiceModal"
            :visible.sync="addServiceModal"
        />
  </div>
</template>
<script type="text/babel">
  import AddServiceModal from './AddServiceModal';

  export default {
    name: 'CategoryModals',
    inject: ['$c_show'],
    components: {
      AddServiceModal,
    },
    data() {
      return {
        category: null,
        addServiceModal: false,
      };
    },
    created() {
      this.$c_show.$on('show-add-service-modal', this.showAddServiceModal);
    },
    methods: {
      showAddServiceModal(bool = true) {
        this.addServiceModal = bool;
      },
    },
  };
</script>
