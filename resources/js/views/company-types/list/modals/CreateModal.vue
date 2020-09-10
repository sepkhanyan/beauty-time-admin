<template>
    <div>
        <el-dialog :title="'Create'" :visible="visible" @update:visible="close">
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

                <el-button type="primary" :disabled="buttonDisable" @click="createData">
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
        name: 'CreateModal',
        inject: ['$companyTypes'],
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                buttonDisable: false,
                form: {
                    id: undefined,
                    title: '',
                    description: '',
                    number_of_companies: 0,
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
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.buttonDisable = true;
                      companyTypeResource.store(this.form).then((response) => {
                            this.$companyTypes.$emit('update-company-types-list', response.data.type);
                            this.close();
                            this.$notify({
                                title: 'Success',
                                message: 'Created successfully',
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
