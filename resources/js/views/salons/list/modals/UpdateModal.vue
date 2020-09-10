<template>
    <div>
        <el-dialog :title="'Update'" :visible="visible" @update:visible="close">
            <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" label-width="150px"
                     style="width: 400px; margin-left:50px;">
                <el-form-item :label="$t('table.salonName')" prop="salon.name">
                    <el-input v-model="form.salon.name"/>
                </el-form-item>

                <el-form-item :label="$t('table.directorName')" prop="user.name">
                    <el-input v-model="form.user.name"/>
                </el-form-item>

                <el-form-item :label="$t('user.email')" prop="user.email" :class="{customValidation: msg.email}">
                    <el-input v-model="form.user.email"/>

                    <div v-if="msg.email" class="el-form-item__error">
                        {{ msg.email }}
                    </div>
                </el-form-item>

                <el-form-item :label="$t('user.phoneNumber')" prop="salon.phone_number"
                              :class="{customValidation: msg.phone_number}">
                    <el-input v-model="form.salon.phone_number" maxlength="8" @keydown.native="validateNumber($event)">
                        <template slot="prepend">+374</template>
                    </el-input>

                    <div v-if="msg.phone_number" class="el-form-item__error">
                        {{ msg.phone_number }}
                    </div>
                </el-form-item>
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
    import SalonResource from '@/api/salon';
    import UserResource from '@/api/user';
    import { validEmail } from '@/utils/validate';

    const salonResource = new SalonResource();
    const userResource = new UserResource();
    export default {
        name: 'CreateModal',
        inject: ['$salonsList'],
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            salon: {
                type: Object,
                default: null,
            },
        },
        data() {
            const validateEmail = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('Email is required'));
                } else {
                    if (!validEmail(value)) {
                        callback(new Error('Please enter the correct email'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                loading: false,
                form: {
                    user: {
                        id: this.salon.user.id,
                        name: this.salon.user.name,
                        email: this.salon.user.email,
                    },
                    salon: {
                        id: this.salon.id,
                        phone_number: this.salon.phone_number,
                        name: this.salon.name,
                    },
                },
                msg: {},
                rules: {
                    salon: {
                        name: [{required: true, message: 'Salon name is required', trigger: 'blur'}],
                        phone_number: [{required: true, message: 'Phone number is required', trigger: 'blur'}],
                    },
                    user: {
                        name: [{required: true, message: 'Director name is required', trigger: 'blur'}],
                        email: [{required: true, trigger: 'blur', validator: validateEmail}],
                    },
                },
            };
        },
        methods: {
            close() {
                this.$emit('update:visible', false);
            },
            validateNumber(e) {
                if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true) ||
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    return;
                }
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        userResource.update(this.form.user.id, this.form.user).then((response) => {
                            this.msg = {};
                            const user = response.data;
                            salonResource.update(this.form.salon.id, this.form.salon).then((response) => {
                                this.msg = {};
                                const salon = response.data.salon;
                                salon.user = user;
                                this.$salonsList.$emit('update-salon', salon);
                                this.close();
                                this.dialogFormVisible = false;
                                this.loading = false;
                                this.$notify({
                                    title: 'Success',
                                    message: 'Updated successfully',
                                    type: 'success',
                                    duration: 2000,
                                });
                            }).catch((error) => {
                                this.msg.phone_number = error.response.data.errors.phone_number ? error.response.data.errors.phone_number[0] : '';
                                this.loading = false;
                            });
                        }).catch((error) => {
                            this.msg.email = error.response.data.errors.email ? error.response.data.errors.email[0] : '';
                            this.loading = false;
                        });
                    }
                });
            },
        },
    };
</script>
