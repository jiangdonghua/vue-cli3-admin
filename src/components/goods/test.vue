<template>
    <div class="cube-page scroll-nav-side" >
        <div class="wrapper">
            <div class="view-wrapper">
                <cube-scroll-nav
                        ref="scrollNav"
                        :side="true"
                        :data="allGoods.menu"
                        :current="current"
                        @change="changeHandler"
                        @sticky-change="stickyChangeHandler"
                        :options="{click:false}"

                v-if="allGoods.menu">
                    <template slot="bar" slot-scope="props">
                        <cube-scroll-nav-bar
                                direction="vertical"
                                :labels="props.labels"
                                :txts="barTxts"
                                :current="props.current"
                        >
                            <template slot-scope="props">
                                <div class="text" :class="props.txt.type==1?'no-icon':''">
                                    <span class="name"><img :src="'https://fuss10.elemecdn.com/'+imgurl(props.txt.icon_url)+'?imageMogr/format/webp/thumbnail/26x/'" alt="" v-if="props.txt.type>1" class="icon">{{props.txt.name}}</span>
                                    <span class="num" v-if="props.txt.count">{{props.txt.count}}</span>
                                </div>
                            </template>
                        </cube-scroll-nav-bar>
                    </template>
                    <cube-scroll-nav-panel
                            v-for="item in allGoods.menu"
                            :key="item.name"
                            :label="item.name"
                            :title='"<strong>"+item.name+"</strong><span>"+item.description+"</span>"'
                    >
                        <ul>
                            <li v-for="food in item.foods" class="menuitem" @click="selectFood(food)">
                                <div  class="fooddetails-root">

                                    <span class="fooddetails-logo">
                                        <template v-for="attribute in food.attributes">
                                        <span class="attrTag-attrTag mini-tag-tag fooddetails-attrTag" >{{attribute.icon_name}}
                                            <span class="attrTag-attrGhost mini-tag-ghost" :style="{'backgroundColor':'#'+attribute.icon_color}">{{attribute.icon_name}}</span>
                                        </span>
                                        </template>
                                        <img :alt="food.name" :title="food.name" :src="'https://fuss10.elemecdn.com/'+imgurl(food.image_path)+'?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'">
                                    </span>
                                    <section class="fooddetails-info">
                                        <p class="fooddetails-name">
                                            <span class="fooddetails-nameText">{{food.name}}</span>
                                        </p>
                                        <p class="fooddetails-desc">{{food.description}}</p>
                                        <p class="fooddetails-sales">
                                            <span>月售{{food.month_sales}}份</span> <span v-if="food.satisfy_rate>0">好评率{{food.satisfy_rate}}%</span>
                                        </p>
                                        <template v-for="specfood in food.specfoods">
                                            <div class="fooddetails-activityRow">
                                            <span class="foodcommon-activity" v-if="specfood.original_price">
                                                <span class="mini-tag-tag">{{Math.round((specfood.price/specfood.original_price)*100)/10}}折<span class="foodcommon-rateGhost mini-tag-ghost">{{Math.round((specfood.price/specfood.original_price)*100)/10}}折</span></span>
                                            </span>
                                            </div>
                                            <span class="salesInfo-price fooddetails-salesInfo" style="color: rgb(255, 83, 57);">
                                            <span>{{specfood.price}}</span>
                                            <del class="salesInfo-originPrice" v-if="specfood.original_price">¥{{specfood.original_price}}</del>
                                        </span>
                                        </template>

                                        <div class="fooddetails-button">
                                            <Cart-Control :food="food" @add="add" :batch_shop="allGoods"></Cart-Control>
                                        </div>
                                    </section>
                                </div>
                            </li>
                        </ul>
                    </cube-scroll-nav-panel>
                </cube-scroll-nav>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from "vuex";
    import CartControl from '../cart-control/cart-control';
    import {imgurl} from '../../util/util'
    import Food from '../../components/food/food'
    export default {

        data() {
            return {
                current: '',
                scrollEvents: ['scroll'],
                scrollY: 0,
                selectedFood:{}
            }
        },
        mounted(){

        },
        updated(){
            this.$refs.scrollNav.refresh();
        },
        components:{
            CartControl,Food
        },
        computed:{
            ...mapGetters(['allGoods']),
            barTxts(){
                let ret=[];
                this.allGoods.menu.forEach((good)=>{
                    const {type, name, foods,icon_url,grey_icon_url} = good
                    let count=0
                    foods.forEach((food)=>{
                       count+=food.count||0
                    })
                    ret.push({
                        type,name,count,icon_url,grey_icon_url
                    })
                })

                return ret;
            }
        },
        methods: {
            refresh(){
                console.log('refresh')
                this.$refs.scrollNav.refresh();
            },
            add(e){
                this.$parent.$parent.$parent.$parent.drop(e)
            },
            selectFood(food){
                console.log(food)
                this.selectedFood=food
                this._showFood()
            },
            _showFood(){
                this.foodComp=this.foodComp||this.$createFood({
                    $props:{
                        food:'selectedFood'
                    },
                    $events:{
                        add:(target)=>{
                            this.$parent.$parent.$parent.$parent.drop(target)
                        },
                        leave:()=>{

                        }
                    }
                })
                this.foodComp.show()
            },
            imgurl(url){
                return imgurl(url)
            },
            changeHandler(label) {
                console.log('changed to:', label)
                //this.$refs.scrollNav.refresh();
            },
            stickyChangeHandler(current) {
                console.log('sticky-change', current)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .cube-page
        position: relative
        z-index: 10
        top: 0
        left: 0
        bottom :0
        width: 100%
        padding-bottom: 1.813333rem
        background: #efeff4
        >.wrapper
            //height: calc(100% - 688px)
            overflow-x: hidden
            overflow-y: auto
            -webkit-overflow-scrolling: touch

    .scroll-nav-side
        background-color: #fff
        width: 100%
        width :10rem
        .view-wrapper
            position: absolute
            top: 0.2rem
            bottom: 0.8rem
            left: 0
            width: 100%
        >>>.cube-scroll-nav-main
            background-color: #efeff4
        >>>.cube-sticky-fixed
            background-color: #efeff4

        >>>.cube-scroll-nav-bar
            width:  2.053333rem
            padding-bottom: 10.666667vw
            background-color: #f8f8f8
        >>>.cube-scroll-nav-bar-item
            position: relative
            padding: .466667rem .2rem
            font-size: .32rem
            color: #333
            //background-color: #fff
            .icon
                max-width 100%
                width: .346667rem
                height: .346667rem
                vertical-align: top
                margin-right: .1rem
           .name
                line-height: 1.2em
                overflow: hidden
                text-overflow: ellipsis
                display: -webkit-box
                -webkit-line-clamp: 3
                word-wrap: break-word
                word-break: break-all
                white-space :normal
            .num
                position: absolute
                right: .08rem
                top: .08rem
                color: #fff
                background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%)
                border-radius: .2rem
                font-size: .266667rem
                font-weight: 700
                text-align: center
                min-width: .373333rem
                padding: 0 .106667rem
                line-height: .373333rem
        >>>.cube-scroll-nav-bar-item_active
            background-color: #fff
        >>>.cube-scroll-nav-panels
            background-color: #fff
    >>>.cube-scroll-nav-panel
            .menuitem
                position: relative
                margin: 0
                min-height: 3.066667rem
                padding-left: .266667rem
            .fooddetails-root
                position: relative
                display: flex
                padding: .266667rem 0
                margin-bottom: .013333rem
                min-height: 2.746667rem
            .fooddetails-logo
                position: relative
                width: 2.533333rem
                height: 2.533333rem
                flex: none
                margin-right: .266667rem
                img
                    width: 100%
                    border-radius: .053333rem
            .attrTag-attrTag
                width: .64rem
                height: .346667rem
            .mini-tag-tag
                position: relative
                font-size: .266667rem
                color: transparent
                white-space: nowrap
            .fooddetails-attrTag
                position: absolute
                left: 0
                top: 0
                border-top-left-radius: .053333rem
                border-bottom-right-radius: .053333rem
            .attrTag-attrGhost
                color: #fff
                //background-image: linear-gradient(135deg,#ffae1b,#f57751)
            .mini-tag-ghost
                position: absolute
                left: 0
                top: 0
                right: -100%
                bottom: -100%
                -webkit-transform: scale(.5)
                transform: scale(.5)
                -webkit-transform-origin: 0 0
                transform-origin: 0 0
                display: -webkit-flex
                display: flex
                -webkit-align-items: center
                align-items: center
                -webkit-justify-content: center
                justify-content: center
                font-size: .533333rem
            .fooddetails-info
                flex: 1
                position: relative
                padding-bottom: .666667rem
                padding-right: .4rem
            .fooddetails-name
                position: relative
                padding-right: .4rem
                display: flex
                align-items: start
            .fooddetails-nameText
                font-weight: 700
                overflow: hidden
                font-size: .4rem
                white-space: nowrap
                width: 4rem
                text-overflow: ellipsis
            .fooddetails-desc
                margin: .133333rem 0
                font-size: .266667rem
                color: #999
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                width: 4.266667rem

            .fooddetails-sales
                margin: .173333rem 0!important;
                color: #999
                font-size: .266667rem
                line-height: 1
                min-height: 1em
                &>span
                    vertical-align :middle
                    &:not(:first-child)
                        margin-left: .106667rem
                        vertical-align: middle
            .fooddetails-activityRow
                display: flex
                .foodcommon-activity
                    display: flex
                    &>span
                        height: .4rem
                        padding: 0 .08rem
                .foodcommon-rateGhost
                    border-radius: .026667rem
                    border: .013333rem solid hsla(8,79%,62%,.3)
                    color: #eb6551
            .salesInfo-price span:first-child, .salesInfo-price0:before
                margin-right: .026667rem
            .salesInfo-price
                font-size: .48rem
                line-height: .426667rem
                color: #ff5339
                padding-bottom: .093333rem
                display: flex;
                align-items: baseline
                &::before
                    content: "\A5"
                    font-size: .373333rem
                    display: inline-block
            .salesInfo-originPrice
                font-size: .32rem
                color: #999
                margin-left: .16rem
            .fooddetails-salesInfo
                position: absolute
                bottom: 0
            .fooddetails-button
                position: absolute
                right: .4rem
                bottom: .066667rem
            .cartbutton-entitybutton
                display: inline-flex
                font-size: .346667rem
                align-items: center
                a
                    display: inline-block
                    vertical-align: middle
                    text-decoration: none
                svg
                    width: .586667rem
                    height: .586667rem
                    vertical-align: middle
                    fill: #2396ff
            .cartbutton-entityquantity
                display: inline-block
                text-align: center
                color: rgba(0,0,0,.87)
                vertical-align: middle
                font-size: .373333rem
                width: .693333rem
                overflow: hidden
        >>>.cube-scroll-nav-panel-title
            display: flex
            -webkit-align-items: center
            align-items: center
            overflow: hidden
            position: relative
            margin-left: .266667rem
            padding: .2rem .8rem .2rem 0
            &>strong
                margin-right: .133333rem
                font-weight: 700
                font-size: .32rem
                color: #666
                -webkit-flex: none
                flex: none
            &>span
                flex: 1;
                color: #999;
                font-size: .266667rem
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis


</style>