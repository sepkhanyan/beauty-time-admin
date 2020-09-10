<template>
    <div>
        <el-dialog :title="'Create'" :visible="visible" @update:visible="close">
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

                <el-button type="primary" :loading="loading" @click="createData">
                    {{ $t('table.confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import SalonResource from '@/api/salon';
    import {validEmail} from '@/utils/validate';

    const salonResource = new SalonResource();
    export default {
        name: 'CreateModal',
        inject: ['$salonsList'],
        props: {
            visible: {
                type: Boolean,
                default: false,
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
                    id: null,
                    timestamp: new Date(),
                    user: {
                        id: null,
                        name: '',
                        email: '',
                        password: null,
                    },
                    salon: {
                        phone_number: '',
                        name: '',
                        status: 'invited',
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
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.form.user.password = [...Array(10)].map(_ => (Math.random() * 36 | 0).toString(36)).join``;
                        this.loading = true;
                        salonResource.store(this.form).then((response) => {
                            this.$salonsList.$emit('update-salons-list', response.data.salon);
                            this.close();
                            this.$notify({
                                title: 'Success',
                                message: 'Created successfully',
                                type: 'success',
                                duration: 2000,
                            });
                            this.loading = false;
                        }).catch((error) => {
                            this.msg.phone_number = error.response.data.errors['salon.phone_number'] ? error.response.data.errors['salon.phone_number'][0] : '';
                            this.msg.email = error.response.data.errors['user.email'] ? error.response.data.errors['user.email'][0] : '';
                            this.loading = false;
                        });
                    }
                });
            },
        },
    };
</script>
