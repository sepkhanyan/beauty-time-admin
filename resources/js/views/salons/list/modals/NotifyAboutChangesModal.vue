<template>
    <div>
        <el-dialog :title="$t('table.notifyTooltip')" :visible="visible" @update:visible="close">
            <el-form ref="notifyForm" :rules="rules" :model="form">
                <el-form-item style="width: 370px; margin-bottom: 30px">
                    <el-radio-group v-model="form.title">
                        <el-radio class="radio-option-item" label="Company Information is not filled"/>

                        <el-radio class="radio-option-item" label="Fill in all required fields"/>

                        <el-radio class="radio-option-item"
                                  label="Add employees, services, positions, working schedule"/>

                        <el-radio class="radio-option-item" label="Upload high quality images"/>
                    </el-radio-group>
                </el-form-item>

                <el-button type="primary" style=" margin-bottom: 30px" @click="typeMessage = true">
                    {{ $t('table.typeMessage') }}
                </el-button>

                <el-form-item v-if="typeMessage" prop="message">
                    <Tinymce ref="editor" v-model="form.message" :height="400"/>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="close">Cancel</el-button>

                <el-button :loading="loading" type="primary" @click="sendData">
                    {{ $t('table.confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import UserResource from '@/api/user';
    import Tinymce from '@/components/Tinymce';

    const userResource = new UserResource();
    export default {
        name: 'NotifyAboutChanges',
        components: {Tinymce},
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            user: {
                type: Number,
                default: null,
            },
        },
        data() {
            return {
                loading: false,
                dialogNotifyFormVisible: false,
                form: {
                    id: this.user,
                    title: 'Company Information is not filled',
                    message: '',
                },
                rules: {
                    title: [{required: true, message: 'Please select option', trigger: 'blur'}],
                },
                typeMessage: false,
            };
        },
        methods: {
            close() {
                this.$emit('update:visible', false);
            },
            sendData() {
                this.loading = true;
                userResource.sendNotification(this.form).then(() => {
                    this.close();
                    this.loading = false;
                    this.$notify({
                        title: 'Success',
                        message: 'Sent successfully',
                        type: 'success',
                        duration: 2000,
                    });
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    .radio-option-item {
        margin: 10px 0;
    }
</style>
