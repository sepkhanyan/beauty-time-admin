<template>
    <div>
        <el-dialog :title="'Update'" :visible="visible" @update:visible="close">
            <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" label-width="150px"
                     style="width: 400px; margin-left:50px;">
                <el-form-item :label="$t('table.title')" prop="title" :class="{customValidation: msg.title}">
                    <el-input v-model="form.title"/>

                    <div v-if="msg.title" class="el-form-item__error">
                        {{ msg.title[0] }}
                    </div>
                </el-form-item>

                <el-form-item :label="$t('table.description')" prop="description"
                              :class="{customValidation: msg.description}">
                    <el-input v-model="form.description"/>

                    <div v-if="msg.description" class="el-form-item__error">
                        {{ msg.description[0] }}
                    </div>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="close">
                    {{ $t('table.cancel') }}
                </el-button>

                <el-button type="primary" :disabled="buttonDisable" @click="updateData">
                    {{ $t('table.confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import CompanyTypeResource from '@/api/company-type';

    const companyTypeResource = new CompanyTypeResource();
    export default {
        name: 'UpdateModal',
        inject: ['$companyTypes'],
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            type: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                buttonDisable: false,
                form: {
                    id: this.type.id,
                    title: this.type.title,
                    description: this.type.description,
                },
                msg: {},
                rules: {
                    title: [{required: true, message: 'Title is required', trigger: 'blur'}],
                    description: [{required: false, message: 'Description is required', trigger: 'blur'}],
                },
            };
        },
        methods: {
            close() {
                this.$emit('update:visible', false);
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.buttonDisable = true;
                      companyTypeResource.update(this.form.id, this.form).then((response) => {
                            this.$companyTypes.$emit('update-company-type', response.data.type);
                            this.close();
                            this.$notify({
                                title: 'Success',
                                message: 'Updated successfully',
                                type: 'success',
                                duration: 2000,
                            });
                            this.buttonDisable = false;
                        }).catch((error) => {
                            this.buttonDisable = false;
                            this.msg = error.response.data.errors;
                        });
                    }
                });
            },
        },
    };
</script>
