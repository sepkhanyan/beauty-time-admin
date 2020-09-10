<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="avatar" style="float: left">
        Your roles:
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
      </pan-thumb>
      <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">{{ roles.join('|') }}'s Dashboard</span>
      </div>
    </div>
    <div>
      <!--<img :src="emptyGif" class="emptyGif">-->
      <el-button v-if="salon.status === 'invited'" type="text" @click="dialogFormVisible = true">Create a password</el-button>

      <el-dialog title="Create password" :visible.sync="dialogFormVisible" width="20%" @close="resetForm">
        <el-form ref="passwordForm" :rules="rules" :model="passwordForm">
          <el-form-item label="Password" prop="password" :class="{customValidation: msg.password}">
            <el-input v-model="passwordForm.password" type="password" autocomplete="off" />
            <div v-if="msg.password" class="el-form-item__error">
              {{ msg.password[0] }}
            </div>
          </el-form-item>
          <el-form-item label="Confirm password" prop="confirm_password" :class="{customValidation: msg.password_confirmation}">
            <el-input v-model="passwordForm.password_confirmation" type="password" autocomplete="off" />
            <div v-if="msg.password_confirmation" class="el-form-item__error">
              {{ msg.password_confirmation[0] }}
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="createData">Confirm</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import UserResource from '@/api/user';
import { mapGetters } from 'vuex';
import PanThumb from '@/components/PanThumb';
import GithubCorner from '@/components/GithubCorner';

const userResource = new UserResource();

export default {
  name: 'DashboardEditor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: 'https://media.giphy.com/media/Ai8iZqHx2i0fK/giphy.gif',
      dialogFormVisible: false,
      passwordForm: {
        password: '',
        password_confirmation: '',
      },
      rules: {
        password: [
          { required: true, message: 'Password is required.', trigger: 'blur' },
          { min: 6, max: 12, message: 'Length should be 6 to 12.', trigger: 'blur' },
        ],
        password_confirmation: [
          { required: true, message: 'Password confirmation is required.', trigger: 'blur' },
          { min: 6, max: 12, message: 'Length should be 6 to 12.', trigger: 'blur' },
        ],
      },
      msg: [],
    };
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'userId',
      'salon',
    ]),
  },
  methods: {
    resetForm(){
      this.passwordForm = {
        password: '',
        password_confirmation: '',
      };
      this.msg = {};
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?').then(() => {
        done();
      }).catch(_ => {});
    },
    createData(){
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          userResource.createPassword(this.userId, this.passwordForm).then(() => {
            this.salon.status = 'in review';
            this.resetForm();
            this.dialogFormVisible = false;
            this.$notify({
              title: 'Success',
              message: 'Created successfully',
              type: 'success',
              duration: 2000,
            });
          }).catch((error) => {
            this.msg = error.response.data.errors;
          });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
