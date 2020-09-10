<template>
  <div>
    <el-dialog :title="'Create'" :visible="visible" @update:visible="close">
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

        <el-form-item :label="$t('table.services')">
          <el-input v-for="item in services"
                    :key="item.index"
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

        <el-button type="primary" :loading="loading" @click="createData">
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
    name: 'CreateModal',
    inject: ['$categoriesList'],
    props: {
      visible: {
        type: Boolean,
        default: false,
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
        form: {
          id: undefined,
          title: '',
          number_of_services: 0,
          types: [],
        },
        services: [{
          index: 0,
          service: '',
        }],
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
    },
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
      addService(){
        const lastService = this.services[this.services.length - 1];
        this.services.push({
          index: lastService.index + 1,
          service: '',
        });
      },
      removeService(item){
        const index = this.services.indexOf(item);
        this.services.splice(index, 1);
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            const services = this.services.filter(item => item.service);
            this.form.number_of_services = services.length;
            categoryResource.store(this.form).then((response) => {
              if (services.length){
                 const servicesForm = services.map((item) => {
                 return {
                     id: null,
                     service: item.service,
                     category_id: response.data.category.id,
                 };
                });
                categoryServicesResource.store(servicesForm);
              }
              this.$categoriesList.$emit('update-categories-list', response.data.category);
              this.close();
              this.$notify({
                title: 'Success',
                message: 'Created successfully',
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
            this.total = response.data.total;
          });
      },
    },
  };
</script>
