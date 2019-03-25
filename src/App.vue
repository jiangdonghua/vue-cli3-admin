<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
    import {mapActions} from 'vuex';

    export default {
        name: "app",
        created(){
            const token=localStorage.eleToken;
            const userInfo=JSON.parse(localStorage.getItem("userInfo"));
            if(token){
                //const decoded = jwt_code(token);
                //console.log(this.isEmpty(decoded))
                //token 存储到vuex中
                this.setIsAuthenticated(!this.isEmpty(token))
            }
            if(userInfo){
                //储存用户信息
                this.setUser(userInfo)
            }
        },
        methods: {
            ...mapActions([
                'setIsAuthenticated',// 映射 this.setIsAuthenticated() 为this.$store.dispatch('setIsAuthenticated')]),
                'setUser'
            ]),

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
<style >
#app,html,body{
  height: 100%;
}
</style>
