<template>
    <cube-form
            :model="model"
            :schema="schema"
            :immediate-validate="false"
            :options="options"
            @validate="validateHandler"
            @submit="submitHandler">
    </cube-form>
</template>

<script type="text/ecmascript-6">
    import {login} from '../request/api';
import {mapActions} from 'vuex';
    export default {
        data() {
            return {
                validity: {},
                valid: undefined,
                model: {
                    username: '',
                    password: '',
                },
                schema: {
                    groups: [
                        {
                            legend: '登录开启宝藏',
                            fields: [
                                {
                                    type: 'input',
                                    modelKey: 'username',
                                    label: '账号：',
                                    props: {
                                        placeholder: '请输入账号'
                                    },
                                    rules: {
                                        required: true,
                                        min: 2
                                    },
                                    messages: {
                                        required: '不能为空啊',
                                        min: "至少输入 2 位字符"
                                    },
                                    // validating when blur
                                    trigger: 'blur'
                                },
                                {
                                    type: 'input',
                                    modelKey: 'password',
                                    label: '密码：',
                                    props: {
                                        placeholder: '请输入密码',
                                        type: 'password',
                                        eye: {
                                            open: false
                                        }
                                    },
                                    rules: {
                                        required: true,
                                        min: 6
                                    },
                                    messages: {
                                        required: '不能为空啊',
                                        min: "至少输入 6 位字符"
                                    },
                                    // validating when blur
                                    trigger: 'blur'
                                },
                            ]
                        },

                        {
                            fields: [
                                {
                                    type: 'submit',
                                    label: '快来抓我呀'
                                },
                            ]
                        }
                    ]
                },
                options: {
                    scrollToInvalidField: true,
                    layout: 'standard' // classic fresh
                }
            }
        },
        methods: {
            ...mapActions([
                'setIsAuthenticated',
                'setUser'
            ]),
            submitHandler(e,model) {
                e.preventDefault();
                this.showToast()
                //console.log( model)
                login(model).then(res=>{

                    this.toast.hide();
                    const {token,userId,cname,name,role,avatar}=res.data;
                    const userInfo={
                        userId:userId,cname:cname,name:name,role:role,avatar:avatar
                    };
                   // console.log(JSON.stringify(userInfo))
                    //储存到本地
                    localStorage.setItem('eleToken', token);
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));

                    //token user存储到vuex中
                    this.setIsAuthenticated(!this.isEmpty(token));
                    this.setUser(userInfo);

                    //跳转到首页
                    this.$router.push("/");
                }).catch(err=>{})
            },
            validateHandler(result) {
                this.validity = result.validity
                this.valid = result.valid
                // console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
            },
            showToast() {
                 this.toast = this.$createToast({
                    time: 100000,
                    txt: '加载中...'
                }).show()
            },
            isEmpty(value){
                return (
                    value === undefined || value === null ||
                    (typeof value === "object" && Object.keys(value).length===0) ||
                    (typeof value === "string" && value.trim().length===0)

                )
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .cube-form_groups >>> .cube-form-group-legend
        text-align: center
        color: #000
</style>