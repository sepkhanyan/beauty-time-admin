<template>
  <div class="components-container">
    <el-button type="primary" size="small" @click="dialogTableVisible = true" >
      Open
    </el-button>
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="Shipping address" @dragDialog="handleDrag">
      <el-select ref="select" v-model="value" placeholder="Select option">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'; // base on element-ui
  export default {
    name: 'DragDialog',
    directives: { elDragDialog },
    inject: ['$userList'],
    data() {
      return {
        dialogTableVisible: false,
        options: [
          { value: 'Option 1', label: 'Milk Cake' },
          { value: 'Option 2', label: 'Sandwid' },
          { value: 'Option 3', label: 'Pepper Steak' },
          { value: 'Option 4', label: 'Vegetable Sandwich' },
        ],
        value: '',
        gridData: [{
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District',
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District',
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District',
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District',
        }],
      };
    },
    created() {
      this.$userList.$on('show-dialog', this.showDialog);
    },
    methods: {
      showDialog(row) {
        console.log(row);
       this.dialogTableVisible = true;
      },
      // v-el-drag-dialog onDrag callback function
      handleDrag() {
        this.$refs.select.blur();
      },
    },
  };
</script>
