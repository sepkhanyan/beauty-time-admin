<template>
      <div class="components-container">
          <h2>{{ category.title }} ({{ category.number_of_services }})</h2>

          <category-services />

          <category-modals />
      </div>
</template>

<script>
  import CategoryServices from './services';
  import CategoryModals from './modals';
  import Vue from 'vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Show',
    components: {
      CategoryServices,
      CategoryModals,
    },
    provide() {
      return {
        $c_show: new Vue(),
      };
    },
    computed: {
      ...mapGetters(['category']),
    },
    created() {
      this.getCategory();
    },
    methods: {
      getCategory(){
        this.$store.dispatch('category/get', this.$route.params.id);
      },
    },
  };
</script>
