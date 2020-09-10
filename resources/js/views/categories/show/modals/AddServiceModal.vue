<template>
  <div>
    <el-dialog :title="'Add services'"
               :visible="visible"
               width="30%"
               @update:visible="close"
    >
      <el-input v-for="item in services"
                :key="item.index"
                v-model="item.service"
                placeholder="Service"
                style="margin-bottom: 10px;"
      >
        <i v-if="services.length > 1"
           slot="suffix"
           class="el-icon-remove"
           style="cursor: pointer;margin-top: 10px"
           @click="removeService(item)"
        />
      </el-input>

      <i class="el-icon-circle-plus"
         style="cursor: pointer"
         @click="addService"
      />

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">
          {{ $t('table.cancel') }}
        </el-button>

        <el-button type="primary" :loading="loading" @click="createData">
          {{ $t('table.add') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CategoryServicesResource from '@/api/category-service';
  import CategoryResource from '@/api/category';

  const categoryServicesResource = new CategoryServicesResource();
  const categoryResource = new CategoryResource();
  export default {
    name: 'AddServiceModal',
    inject: ['$c_show'],
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        loading: false,
        services: [{
          index: 0,
          service: '',
        }],
      };
    },
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
      addService() {
        const lastService = this.services[this.services.length - 1];
        this.services.push({
          index: lastService.index + 1,
          service: '',
        });
      },
      removeService(item) {
        const index = this.services.indexOf(item);
        this.services.splice(index, 1);
      },
      createData() {
        const services = this.services.filter(item => item.service).map((item) => {
          return {
            id: null,
            service: item.service,
            category_id: this.$route.params.id,
          };
        });
        this.loading = true;
        categoryServicesResource.store(services).then((response) => {
          const services = response.data.services;
          const total = response.data.total;
          const data = {
            number_of_services: total,
            number_update: true,
          };
          categoryResource.update(this.$route.params.id, data).then(() => {
            this.$store.dispatch('category/setNumberOfServices', total);
            this.$c_show.$emit('update-services-list', services);
            this.close();
            this.$notify({
              title: 'Success',
              message: 'Created successfully',
              type: 'success',
              duration: 2000,
            });
            this.loading = false;
          });
        });
      },
    },
  };
</script>
