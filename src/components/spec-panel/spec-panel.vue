<template>
    <transition name="fade">
        <cube-popup :mask-closable=true
                    :visible="brand.showInfo"
                    @mask-click="maskClick"
                    position="bottom"
                    type="shop-cart-spec"
                    :z-index=90>
            <transition name="move">
                <div v-show="brand.showInfo">
                    <div class="specpanel-root">
                        <div class="specpanel-main">
                            <a href="javascript:;" role="button" aria-label="关闭" class="specpanel-close" @click.stop="maskClick"><i class="cubeic-close"></i></a>
                                <template v-for="specfood in brand.specfoods" v-if="specfood.food_id>0">
                            <div class="specpanel-header">
                                <img alt="" class="specpanel-pic" :src="'//fuss10.elemecdn.com/'+imgurl(brand.image_path)+'?imageMogr/format/webp/thumbnail/95x/'">

                                    <div class="specpanel-info"><p class="specpanel-name">{{brand.name}}</p>
                                        <p class="specpanel-total">已选：{{selectedAttr}}</p>
                                        <p class="specpanel-price" style="color: rgb(255, 83, 57);">
                                            <small>¥</small>
                                           {{specfood.price}}
                                            <small class="specpanel-extraText" style="display: none;">起</small>
                                        </p>

                                    </div>
                            </div>
                            <cube-scroll class="specpanel-body">
                                    <div v-if="specfood.specifications">
                                        <template v-for="spec in specfood.specifications">
                                        <p class="specpanel-colTitle">{{spec.name}}</p>
                                        <div class="specpanel-colBody">
                                            <template v-for="(value,index) in spec.values">
                                                <span class="panel-item-item" :class="{'panel-item-active':index===typeIndex}" @click="handleTypeClick($event,index,'typeIndex')">{{value}}</span>
                                            </template>
                                        </div>
                                        </template>
                                    </div>

                                    <div>
                                        <template v-for="(attr,index) in brand.attrs">
                                            <p class="specpanel-colTitle" :index="index" ref="attrType">{{attr.name}}</p>
                                            <div class="specpanel-colBody">
                                                <template v-for="(value,index) in attr.values">
                                                <span class="panel-item-item" :class="{'panel-item-active':index===currentIndex}" @click="handleTypeClick($event,index,'currentIndex')">{{value}}</span>
                                                </template>

                                            </div>
                                        </template>
                                    </div>
                            </cube-scroll>
                                </template>

                            <button class="specpanel-doneBtn" :style="isActive?'background-color: rgb(35, 149, 255);':'background-color: rgb(187, 187, 187);'" @click="handleDoneBtn">选好了</button>
                        </div>
                    </div>
                </div>
            </transition>
        </cube-popup>
    </transition>
</template>

<script type="text/ecmascript-6">
import {mapActions,mapGetters} from 'vuex'
import {imgurl} from '../../util/util'
Array.prototype.pushNoRepeat=function () {
    for(var i=0;i<arguments.length;i++){
        var ele=arguments[i];
        if(this.indexOf(ele)===-1){
            this.push(ele)
        }
    }
}
    export default {
        name: 'specpanel',
        props: {
            brand: {
                type: Object
            },
            showP:{
                type:Boolean,
                default:false
            },
        },
        data(){
            return{
                show:false,
                currentIndex:0,
                typeIndex:0,
                isActive:true,
                selectedAttr:'冷'
            }
        },
        created(){
          this.show=this.showP;
        },
        mounted(){
            this.selectedAttrInit();
            console.log()
        },
        computed:{
            ...mapGetters(['allGoods'])
        },
        methods:{
            ...mapActions([
                'clearSpecInfo',
                'setAllGoods'
            ]),
            //初始化选择的attrs
            selectedAttrInit(){
                if(this.selectedAttr){
                    return;
                }
                const ActiveNodes=document.querySelectorAll(".panel-item-active");
                let str='';
                for(let i=0,len=ActiveNodes.length;i<len;i++){
                    str+=ActiveNodes[i].innerText+'/'
                }
                this.selectedAttr=str.substring(0,str.length-1);
            },
            //关闭面板
            maskClick(){
                this.show=false
                this.$set(this.brand,"showInfo",false)
                this.clearSpecInfo();
            },
            //获取选择的内容
            handleTypeClick($event,index,type){
                if(index===this[type]){
                    this[type]=999999
                    this.isActive=false
                }else {
                    this[type]=index;
                    this.isActive=true;
                    this.selectedAttr=$event.target.innerText
                }
            },
            //选好提交
            handleDoneBtn(){
              if(!this.isActive){
                  return false;
              }
             // console.log( this.currentIndex+"|"+this.typeIndex+"|"+this.selectedAttr)
               const currentIndex=this.currentIndex;
               const attrType= document.querySelector('.specpanel-colTitle').getAttribute('index')
                //选取的attrs类型
                this.brand.attrs.map((item,index)=>{
                    if(Number(attrType)===index){
                       item.values.map((type,index)=>{
                           if(currentIndex===index){
                               this.attrSelected=type
                           }
                       })
                    }
                });
                //添加数量
                if (!this.brand.count&&!this.brand.attrSelecteds) {
                    this.$set(this.brand, 'count', 1);
                    this.$set(this.brand, 'attrSelecteds', [{Selected:this.attrSelected,count:1}])
                } else {

                    var bool = false,index;
                    for(let i=0,len=this.brand.attrSelecteds.length;i<len;i++){
                         if(this.brand.attrSelecteds[i].Selected==this.attrSelected){
                             bool=true;
                             index=i
                         }
                    }
                    if(bool){
                        this.brand.attrSelecteds[index].count++
                    }else{
                        this.brand.attrSelecteds.push({Selected:this.attrSelected,count:1})
                    }
// console.log(this.brand)
                    let num=0;
                    this.brand.attrSelecteds.forEach(item=>{
                        num+=item.count
                    });
                    this.$set(this.brand, 'count', num);
                    // this.brand.count++

                }

                this.recommendsInMenu()

                this.maskClick();
                this.$emit('shake',true)
            },
            //同步recommends和Menu数据
            recommendsInMenu(){
                //console.log(this.brand.count)
                this.allGoods.menu.forEach((good,index)=>{
                    good.foods.forEach((rec,index)=>{
                        if(rec.name===this.brand.name){
                            this.$set(rec,'count',this.brand.count)
                            this.$set(rec,'attrSelecteds',this.brand.attrSelecteds)
                        }
                    })
                });
               // console.log(this.allGoods)
                //更新数据
                this.allGoods.recommend.forEach((good,index)=>{
                    good.items.forEach((rec,index)=>{
                        if(rec.name===this.brand.name){
                            this.$set(rec,'count',this.brand.count)
                            this.$set(rec,'attrSelecteds',this.brand.attrSelecteds)
                        }
                    })
                })
                this.setAllGoods(this.allGoods)
            },
            //图片拼接
            imgurl(url){
              return imgurl(url)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .cube-shop-cart-list
        bottom: 48px
        &.fade-enter, &.fade-leave-active
            opacity: 0
        &.fade-enter-active, &.fade-leave-active
            transition: all .3s ease-in-out
        .move-enter, .move-leave-active
            transform: translate3d(0, 100%, 0)
        .move-enter-active, .move-leave-active
            transition: all .3s ease-in-out
    .specpanel-swipeActiveEnter
        transition: bottom .3s


    .specpanel-swipeEnter
        bottom: -14.666667rem!important

    .specpanel-root
        //position: fixed
        //bottom: 0
        //left: 0
        width: 100%
        //height: 14.666667rem
        //z-index: 14
        background: #fff

    .specpanel-main
        position: relative
        display: -webkit-flex
        display: flex
        -webkit-flex-direction: column
        flex-direction: column
        padding: .426667rem
        height: 100%
        box-sizing :border-box

    .specpanel-mask
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: rgba(0,0,0,.4)
        z-index: 1


    .specpanel-doneBtn
        width: 100%
        height: 1.066667rem
        color: #fff
        font-size: .426667rem
        font-weight: 700
        border-radius: .053333rem
        background-color: #2396ff


    .specpanel-pic
        -webkit-flex: none
        flex: none
        width: 2.533333rem
        height: 2.533333rem


    .specpanel-header
        padding-bottom: .533333rem
        display: -webkit-flex
        display: flex


    .specpanel-name
        color: #333
        font-size: .453333rem
        font-weight: 700
        max-width: 5.333333rem
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        margin-bottom: .213333rem


    .specpanel-info
        padding-left: .266667rem

        display: -webkit-flex
        display: flex
        -webkit-flex-direction: column
        flex-direction: column


    .specpanel-total
        -webkit-flex: 1
        flex: 1
        color: #666
        font-size: .293333rem


    .specpanel-price
        font-size: .64rem
        color: #2396ff
        font-weight: 500


    .specpanel-body
        -webkit-flex: 1
        flex: 1
        max-height: 317px
        overflow: hidden
        -webkit-overflow-scrolling: touch
        margin-bottom :0.4rem


    .specpanel-colTitle
        color: #666
        font-size: .373333rem
        margin-bottom: .32rem

    .specpanel-colBody
        display: -webkit-flex
        display: flex
        -webkit-flex-wrap: wrap
        flex-wrap: wrap
        margin: 0 -.24rem

    .specpanel-close
        display: block
        position: absolute
        top: .4rem
        right: .4rem
        background-size: cover
        font-size :0.8rem

    .specpanel-tabContainer
        overflow-x: auto
        display: -webkit-flex
        display: flex
        margin-bottom: .48rem
        border-bottom: .013333rem solid #e5e5e5
        -webkit-overflow-scrolling: touch


    .specpanel-tabContainer:-webkit-scrollbar
        display: none

    .specpanel-tab
        display: -webkit-flex
        display: flex
        color: #666
        font-size: .4rem
        line-height: 1.5


    .specpanel-tabItem
        max-width: 10em
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        margin-right: .533333rem


    .specpanel-tabItem.specpanel-active
        color: #333
        border-bottom: .08rem solid #2396ff
        border-bottom: .8vw solid #2396ff


    .specpanel-extraText
        font-size: .293333rem
        color: #999


    .panel-item-item
        display: inline-block
        min-width: 2.773333rem
        padding: 0 .266667rem
        min-height: .853333rem
        border-radius: .053333rem
        background-color: #f5f5f5
        color: #333
        font-size: .346667rem
        text-align: center
        margin: 0 .213333rem .32rem
        line-height: .853333rem

    .panel-item-item.panel-item-active
        color: #2396ff
        font-weight: 700
        background-color: rgba(35,150,255,.2)


    .panel-item-img
        display: block
        margin: .266667rem auto 0
        width: .906667rem
        height: .906667rem

</style>