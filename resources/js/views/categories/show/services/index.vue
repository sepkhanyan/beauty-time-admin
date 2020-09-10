<template>
  <div v-loading="listLoading">
    <div v-if="list.length" class="editor-container" style="width: 50%;">
      <draggable :list="list"
                 :options="{group:'service'}"
                 class="dragArea"
                 :disabled="noDraggable"
                 @end="handleDragEnd"
      >
        <div v-for="(element, index) in list" :key="element.sort_id" class="list-complete-item" :class="{noBorder: serviceID === element.id}">
          <div v-if="serviceID !== element.id" class="list-complete-item-handle">
           {{ element.service }}
          </div>
          <el-input v-if="serviceID === element.id"
                    :ref="'service' + index"
                    v-model="service"
                    @keyup.enter.native="updateService(element)"
                    @blur="resetService"
          />

          <div v-if="serviceID !== element.id" style="position:absolute;right:0px;">
            <span style="float: left ;margin-top: -15px;margin-right:5px;" @click="editService(element, index)">
              <i class="el-icon-edit" />
            </span>
            <span style="float: right ;margin-top: -15px;margin-right:5px;" @click="deleteService(element)">
              <i style="color:#ff4949" class="el-icon-delete" />
            </span>
          </div>
        </div>
      </draggable>
    </div>

    <div v-else>
      {{ noServices }}
    </div>

    <el-button v-if="!listLoading"
               type="primary"
               icon="el-icon-plus"
               circle
               @click="addService"/>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import CategoryServicesResource from '@/api/category-service';

  const categoryServicesResource = new CategoryServicesResource();
  export default {
    name: 'CategoryServices',
    components: { draggable },
    inject: ['$c_show'],
    data() {
      return {
        serviceID: null,
        service: '',
        noDraggable: false,
        list: [],
        newList: [],
        oldList: [],
        listLoading: true,
        noServices: '',
      };
    },
    created() {
      this.$c_show.$on('update-services-list', this.listUpdate);
      this.getData();
    },
    methods: {
      getData() {
        categoryServicesResource.list({category_id: this.$route.params.id}).then(response => {
          this.list = response.data.services;
          this.updateData();
          this.listLoading = false;
        });
      },
      listUpdate(services){
        this.list = services;
        this.updateData();
      },
      updateData(){
        this.oldList = this.list.map(v => v.id);
        this.newList = this.oldList.slice();
        this.noServices = !this.list.length ? 'No services' : '';
      },
      deleteService(service) {
        categoryServicesResource.destroy(service.id).then(() => {
          const index = this.list.indexOf(service);
          this.list.splice(index, 1);
          this.updateData();
          this.$notify({
            title: 'Success',
            message: 'Deleted successfully',
            type: 'success',
            duration: 2000,
          });
        });
      },
      editService(service, index){
        this.noDraggable = true;
        this.serviceID = service.id;
        this.service = service.service;
        this.$nextTick(() => {
          const input = this.$refs['service' + index][0];
          input.focus();
        });
      },
      updateService(service){
        if (this.service) {
          categoryServicesResource.update(service.id, {service: this.service}).then((response) => {
            for (const v of this.list) {
              if (v.id === response.data.service.id) {
                const index = this.list.indexOf(v);
                this.list.splice(index, 1, response.data.service);
                break;
              }
            }
            this.resetService();
          });
        } else {
          this.resetService();
        }
      },
      addService(){
        this.$c_show.$emit('show-add-service-modal');
      },
      resetService(){
        this.serviceID = null;
        this.service = null;
        this.noDraggable = false;
      },
      handleDragEnd(evt){
        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
        this.newList.splice(evt.newIndex, 0, tempIndex);
        categoryServicesResource.sort(this.newList);
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .dragArea {
    margin-top: 15px;
    min-height: 50px;
    padding-bottom: 30px;
  }

  .list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    padding: 9px 12px;
    margin-top: 4px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
  }

  .list-complete-item-handle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
  }

  .list-complete-item.sortable-chosen {
    background: #4AB7BD;
  }

  .list-complete-item.sortable-ghost {
    background: #30B08F;
  }

  .noBorder {
    border: none;
    padding: 0;
  }
</style>
