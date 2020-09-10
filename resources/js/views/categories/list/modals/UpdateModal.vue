<template>
  <div>
    <el-dialog :title="'Update'" :visible="visible" @update:visible="close">
      <el-form ref="dataForm" :rules="rules" :model="form" label-position="top"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="Company Types" prop="types">
          <el-select v-model="form.types"
                     value-key="id"
                     placeholder="Select types"
                     :loading="companyTypesLoading"
                     multiple
          >
            <el-option
              v-for="type in companyTypes"
              :key="type.id"
              :label="type.title"
              :value="type"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.title')" prop="title" :class="{customValidation: msg.title}">
          <el-input v-model="form.title" placeholder="Category title"/>

          <div v-if="msg.title" class="el-form-item__error">
            {{ msg.title[0] }}
          </div>
        </el-form-item>

        <el-form-item :label="$t('table.services')" :loading="servicesLoading">
          <el-input v-for="item in services" :key="item.index"
                    v-model="item.service"
                    placeholder="Service"
                    style="margin-bottom: 10px;"
          >
            <i v-if="services.length > 1"
               slot="suffix"
               class="el-icon-remove"
               style="cursor: pointer;"
               @click="removeService(item)"
            />
          </el-input>
        </el-form-item>

        <i class="el-icon-circle-plus"
           style="cursor: pointer"
           @click="addService"
        />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">
          {{ $t('table.cancel') }}
        </el-button>

        <el-button type="primary" :loading="loading" @click="updateData">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CategoryResource from '@/api/category';
  import CategoryServicesResource from '@/api/category-service';
  import CompanyTypeResource from '@/api/company-type';

  const categoryResource = new CategoryResource();
  const categoryServicesResource = new CategoryServicesResource();
  const companyTypeResource = new CompanyTypeResource();
  export default {
    name: 'UpdateModal',
    inject: ['$categoriesList'],
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      category: {
        type: Object,
        default: null,
      },
    },
    data() {
      const validateTypes = (rule, value, callback) => {
        if (!value.length) {
          callback(new Error('Please select company type'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        servicesLoading: false,
        form: {
          id: this.category.id,
          title: this.category.title,
          number_of_services: this.category.number_of_services,
          types: this.category.types,
        },
        services: [],
        companyTypesLoading: true,
        companyTypes: [],
        msg: {},
        rules: {
          title: [{required: true, message: 'Title is required', trigger: 'blur'}],
          types: [{required: true, trigger: 'blur', validator: validateTypes}],
        },
      };
    },
    created() {
      this.getCompanyTypes();
      this.getServices();
    },
    methods: {
      getServices(){
        this.servicesLoading = true;
        categoryServicesResource.list({category_id: this.category.id}).then((response) => {
          this.servicesLoading = false;
          this.services = response.data.services;
        });
      },
      close() {
        this.$emit('update:visible', false);
      },
      addService(){
        const lastService = this.services[this.services.length - 1];
        this.services.push({
          index: this.services.indexOf(lastService) + 1,
          service: '',
        });
      },
      removeService(item){
        if (item.id){
          categoryServicesResource.destroy(item.id).then(() => {
            this.form.number_of_services = this.category.number_of_services - 1;
            categoryResource.update(this.category.id, this.form).then((response) => {
              this.$categoriesList.$emit('update-category', response.data.category);
            });
          });
        }
        const index = this.services.indexOf(item);
        this.services.splice(index, 1);
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            const services = this.services.filter(item => item.service);
            this.form.number_of_services = services.length;
            categoryResource.update(this.category.id, this.form).then((response) => {
              if (services.length){
                const servicesForm = services.map((item) => {
                  return {
                    id: item.id ? item.id : null,
                    service: item.service,
                    category_id: this.category.id,
                  };
                });
                categoryServicesResource.store(servicesForm);
              }
              this.$categoriesList.$emit('update-category', response.data.category);
              this.close();
              this.$notify({
                title: 'Success',
                message: 'Updated successfully',
                type: 'success',
                duration: 2000,
              });
              this.loading = false;
            }).catch((error) => {
              this.loading = false;
              this.msg = error.response.data.errors;
            });
          }
        });
      },
      getCompanyTypes(){
        companyTypeResource.list()
          .then((response) => {
            this.companyTypes = response.data.types;
            this.companyTypesLoading = false;
          });
      },
    },
  };
</script>
