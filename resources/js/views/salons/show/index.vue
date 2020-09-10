<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="General Info" name="ge">General Info</el-tab-pane>
      <el-tab-pane label="Users" name="us">Users</el-tab-pane>
      <el-tab-pane label="Categories & Services" name="cs">Categories & Services</el-tab-pane>
      <el-tab-pane label="Branches" name="br">Branches</el-tab-pane>
      <el-tab-pane label="Masters" name="mr">Masters</el-tab-pane>
      <el-tab-pane label="Photos" name="ph">Photos</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SalonDetails',
  data(){
    return {
      activeName: 'ge',
    };
  },
  computed: {
    ...mapGetters({
      salon: 'salon',
    }),
  },
};
</script>
