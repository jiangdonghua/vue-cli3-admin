<template>

<div class="goods" v-if="goods">
    <div class="posters" v-if="goods.rst">
        <img :src="'https://fuss10.elemecdn.com/'+imgurl(goods.rst.posters[0].image_hash)+'?imageMogr/format/webp/thumbnail/686x/'" :alt="goods.rst.posters[0].name">
    </div>
    <div class="recommend" v-if="goods.recommend" id="recommend">
        <h2 class="recommend-title">{{ goods.recommend[0].name}}</h2>
        <div class="recommend-wrap">
        <cube-scroll
                ref="scroll"
                :data="goods.recommend[0].items"
                direction="horizontal"
                nest-mode="native"
                @before-scroll-start="onscroll"
                @scroll-end="onscrollEnd"
                :scrollEvents="['before-scroll-start','scroll-end']"
                class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper">
                <li v-for="item in goods.recommend[0].items" class="list-item">
                    <div class="recommend-item">
                        <img alt="" class="recommend-img" src="//fuss10.elemecdn.com/d/74/ebe6d4b113b8f77e95ceb61d752b7jpeg.jpeg?imageMogr/format/webp/thumbnail/240x/">
                        <div>
                            <p class="food-card-1">夏威夷香草坚果 </p>
                            <p class="food-card-2">月售1 好评率100%</p>
                            <div class="food-card-3">
                                <p class="food-card-3p" style="color: rgb(255, 83, 57);"><small>¥</small>40</p>
                                <span>
                                    <span class="cartbutton-entitybutton"><a href="javascript:" role="button" aria-label="添加商品"><svg style="fill: rgb(35, 149, 255);"><use xlink:href="#cart-minus"><svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg></use></svg></a></span></span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </cube-scroll>
        </div>
    </div>

    <div class="scroll-nav"  id="scrollNav">
        <!--<div class="scroll-nav-wrapper">-->
        <cube-scroll-nav
                :side="true"
                :data="goods.menu"
                :current="current"
                @change="changeHandler"
                @sticky-change="stickyChangeHandler">
            <cube-scroll-nav-panel
                    v-for="item in goods.menu"
                    :key="item.name"
                    :label="item.name"
                    :title="item.name">
                <ul class="goodsListWrap">
                    <li v-for="food in item.foods">
                        <div>
                            <img :src="'https://fuss10.elemecdn.com/'+imgurl(food.image_path)+'?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'">
                            <p class="name">{{food.name}}</p>
                        </div>
                    </li>
                </ul>
            </cube-scroll-nav-panel>

        </cube-scroll-nav>

    </div>
    <!--</div>-->
</div>

</template>

<script type="text/ecmascript-6">
    import {batch_shop} from '../../request/api';
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
                goods:[],
                current: '热销',
                options:{
                    directionLockThreshold:0,
                    click: false,
                }
            }
        },
        computed:{
            restaurant(){
                return this.data.seller
            }
        },
        created(){

        },
        mounted(){
            console.log(this.$refs.sticky)
        },
        methods:{

            fetch(){
                if(!this.fetched){
                    this.fetched=true
                    console.log(this.restaurant.id)
                    batch_shop({sellerId: this.restaurant.id}).then(res => {
                        this.goods = res;
                        this.current=this.goods.menu[0].name
                    })
                }
            },
            onscroll(){
                console.log('开始前')
                this.$emit("disabledScroll",true)
            },
            onscrollEnd(){
                console.log('结束')
                // console.log(this.$refs.scroll.$parent.$refs.scroll)
                // this.$refs.scroll.$parent.$refs.scroll.enable();
                // this.$refs.scroll.$parent.$refs.scroll.refresh();
                // this.$refs.scroll.$parent.refresh()
                this.$emit("disabledScroll",false)
            },
            changeHandler(label) {
                console.log('changed to:', label)
            },
            stickyChangeHandler(current) {
                console.log('sticky-change', current)
            },
            imgurl(url) {
                if (url) {
                    let type = url.slice(-3) === 'png' ? 'png' : url.slice(-4) === 'jpeg' ? 'jpeg' : 'png';
                    let param = url.substring(0, 1) + '/' + url.substring(1, 3) + '/' + url.substring(3);
                    return `${param}.${type}`;
                }

            },
            // imgurl(url) {
            //     //fuss10.elemecdn.com/f/cc/6b120ff0660a80fff1b842b5fb432jpeg.jpeg
            //     if (url) {
            //         let type = url.slice(-3) === 'png' ? 'png' : url.slice(-4) === 'jpeg' ? 'jpeg' : 'png';
            //         let param = url.substring(0, 1) + '/' + url.substring(1, 3) + '/' + url.substring(3);
            //         return `https://fuss10.elemecdn.com/${param}.${type}?imageMogr/format/webp/thumbnail/686x/`;
            //     }
            //
            // },
        }
    }
</script>

<style lang="stylus" scoped>
.goods
    width: 100%
    position :absolute

    top:7rem
    bottom :0
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
        /*.recommend-wrap*/
        .list-wrapper
            white-space: nowrap
            /*display: flex*/
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
                .cartbutton-entitybutton
                    display: inline-flex
                    font-size: .346667rem
                    -webkit-align-items: center
                    align-items: center
                    a
                        display: inline-block
                        vertical-align: middle
                        text-decoration: none
                        svg
                            width: .586667rem
                            height: .586667rem
                            vertical-align: middle
                            fill: rgb(35, 149, 255)
    >>>.cube-scroll-content
            display :inline-block
            width: 100%

        .scroll-nav
            width: 100%
            background-color :#fff
            height: 100%
            overflow: hidden
            position: absolute;
            top: 0;
            z-index: 1;
            bottom: 0;
        /*.goodsListWrap*/
            /*overflow: scroll*/
    >>> .cube-scroll-nav-panel-title
            background: #f3f5f7;
            border-left: 2px solid #d9dde1
            color: #666
            font-size: 12px
            height: 26px
            line-height: 26px
            padding-left: 14px

        /*.dd*/
            /*height: 1px*/


</style>