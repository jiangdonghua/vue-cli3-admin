<template>
    <div class="goods" >
        <div class="posters" v-if="allGoods.rst">
            <img :src="'https://fuss10.elemecdn.com/'+imgurl(allGoods.rst.posters[0].image_hash)+'?imageMogr/format/webp/thumbnail/686x/'" :alt="allGoods.rst.posters[0].name">
        </div>
        <div class="recommend" v-if="allGoods.recommend" id="recommend">
            <template v-for="rec in allGoods.recommend">
            <h2 class="recommend-title">{{ rec.name}}</h2>

            <div class="recommend-wrap">
                <cube-scroll
                        ref="scrollRsc"
                        :data="rec.items"
                        direction="horizontal"
                        nest-mode="native"
                        @before-scroll-start="onscroll"
                        @scroll-end="onscrollEnd"
                        :options="options"
                        :scrollEvents="['before-scroll-start','scroll-end']"
                        class="horizontal-scroll-list-wrap">
                    <ul class="list-wrapper">
                        <li v-for="item in rec.items" class="list-item">
                            <div class="recommend-item">
                                <img alt="" class="recommend-img" :src="'//fuss10.elemecdn.com/'+imgurl(item.image_path)+'?imageMogr/format/webp/thumbnail/240x/'">
                                <div>
                                    <p class="food-card-1"> {{item.name}}</p>
                                    <p class="food-card-2">月售{{item.month_sales}} 好评率{{item.satisfy_rate}}%</p>
                                    <div class="food-card-3">
                                        <p class="food-card-3p" style="color: rgb(255, 83, 57);"><small>¥</small>{{item.specfoods[0].price}}</p>
                                        <span>
                                            <Cart-Control :food="item" @add="add" :batch_shop="allGoods"></Cart-Control>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll>
            </div>
            </template>
        </div>
        <div class="recommend" style="padding-bottom: 0.6rem;" >
            <h2 class="recommend-title">更多美味~ 去点餐吧</h2>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import CartControl from '../cart-control/cart-control';
    import {imgurl} from '../../util/util'
    import { mapGetters} from 'vuex'
    export default {
        name:'goods',
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data(){
            return{
                batch_shop:{},
                goods:{},
                recommends:[],
                menu:[],
                current: '',
                options:{
                    directionLockThreshold:5,
                    click: false,
                    freeScroll:true,
                    eventPassthrough:'vertical'
                }
            }
        },
        computed:{
            ...mapGetters(['allGoods']),
            restaurant(){
                return this.data.seller
            },
        },
        created(){
        },
        mounted(){
        },
        methods:{
            fetch(){
                // if(!this.fetched){
                //     this.fetched=true
                //     console.log(this.data)
                //     batch_shop_other({sellerId: this.restaurant.id}).then(res => {
                   // this.setAllGoods(res)
                //         this.goods = res;
                //         this.recommends=this.goods.recommend;
                //         console.log(this.recommends)
                //
                //     })
                // }
            },
            add(e){
                this.$parent.$parent.$parent.$parent.drop(e)

            },
            onscroll(){
                //console.log('开始前');
                this.$nextTick(()=>{
                    this.$refs.scrollRsc[0].enable();
                    this.$refs.scrollRsc[0].refresh();
                });
                this.$emit("disabledScroll",true)
            },
            onscrollEnd(){
               // console.log('结束')
                this.$emit("disabledScroll",false)
            },
            changeHandler(label) {
                console.log('changed to:', label)
            },
            stickyChangeHandler(current) {
                console.log('sticky-change', current)
            },
            imgurl(url){
                return imgurl(url)
            }


        },
        components:{
            CartControl
        }
    }
</script>

<style lang="stylus" scoped>
        .goods
            background: #efeff4
        .posters
            background: #fff
            padding: .186667rem 0 0
            img
                width: 9.146667rem
                height: 2.346667rem
                border-radius: .08rem
                display: block
                margin: 0 auto;
                max-width :100%
        .recommend
            padding-top: .426667rem
            background-color: #fff
            .recommend-title
                padding-left: .426667rem
                color: #333
                font-size: .426667rem
                font-weight: 700
                margin-bottom: .266667rem
            .list-wrapper
                white-space: nowrap
            .list-item
                display: inline-block
            .recommend-item
                flex: none
                width: 3.2rem
                margin-right: .266667rem
                padding-bottom: .426667rem
                margin-left: .426667rem
                .recommend-img
                    display: block
                    width: 3.2rem
                    height: 3.2rem
                    border-top-left-radius: .08rem
                    border-top-right-radius: .08rem
                    max-width :100%
                .food-card-1
                    color: #333;
                    font-size: .373333rem
                    margin: .186667rem 0 .093333rem
                    white-space: nowrap
                    text-overflow: ellipsis
                    overflow: hidden
                .food-card-2
                    color: #999;
                    font-size: .266667rem;
                    margin-bottom: .186667rem;
                    min-height: 1em;
                .food-card-3
                    display: flex
                    align-items: center
                    justify-content: space-between
                    padding-right: .026667rem
                    .food-card-3p
                        font-size: .48rem
                        color: rgb(255, 83, 57)
        >>>.cube-scroll-content
            display :inline-block
            /*width: 100%*/
</style>