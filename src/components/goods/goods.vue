<template>
    <div class="cube-page scroll-nav-side">
<div class="wrapper">
            <div class="view-wrapper">
                <cube-scroll-nav
                        :side="true"
                        :data="data"
                        :current="current"
                        @change="changeHandler"
                        @sticky-change="stickyChangeHandler">
                    <div class="prepend-header" slot="prepend" >
                        <div class="posters">
                            <img :src="'https://fuss10.elemecdn.com/'+imgurl(rst.posters[0].image_hash)+'?imageMogr/format/webp/thumbnail/686x/'" :alt="rst.posters[0].name" >
                        </div>
                        <div class="recommend" v-if="recommend" >
                            <h2 class="recommend-title">{{recommend[0].name}}</h2>
                            <div class="recommend-wrap">
                                <cube-scroll
                                        ref="scroll"
                                        :data="recommend[0].items"
                                        direction="horizontal"
                                        nest-mode="none"
                                        @before-scroll-start="onscroll"
                                        @scroll-end="onscrollEnd"
                                        :scrollEvents="['before-scroll-start','scroll-end']"
                                        class="horizontal-scroll-list-wrap">
                                    <ul class="list-wrapper">
                                        <li v-for="item in recommend[0].items" class="list-item">
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
                    </div>
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
                                    <span class="num" v-if="props.txt.count">
                </span>
                                </div>
                            </template>
                        </cube-scroll-nav-bar>
                    </template>
                    <cube-scroll-nav-panel
                            v-for="item in data"
                            :key="item.name"
                            :label="item.name"
                            :title='"<strong>"+item.name+"</strong><span>"+item.description+"</span>"'
                    >
                        <ul>
                            <li v-for="food in item.foods" class="menuitem">
                                <div  class="fooddetails-root">
                                    <span class="fooddetails-logo">
                                        <span class="attrTag-attrTag mini-tag-tag fooddetails-attrTag">招牌
                                            <span class="attrTag-attrGhost mini-tag-ghost">招牌</span>
                                        </span>
                                        <img alt="醇香拿铁(热)" title="醇香拿铁(热)" src="//fuss10.elemecdn.com/f/cc/6b120ff0660a80fff1b842b5fb432jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/">
                                    </span>
                                    <section class="fooddetails-info">
                                        <p class="fooddetails-name">
                                            <span class="fooddetails-nameText">醇香拿铁(热)</span>
                                        </p>
                                        <p class="fooddetails-desc">Latte，奎克咖啡自家配方，中深烘焙，口感滑顺、风味香醇。
                                    拿铁本身为无糖，需要另外附糖请于"温馨提醒"选择喔
                                    主要原料: 咖啡</p>
                                        <p class="fooddetails-sales">
                                            <span>月售74份</span> <span>好评率100%</span>
                                        </p>
                                        <div class="fooddetails-activityRow">
                                            <span class="foodcommon-activity">
                                                <span class="mini-tag-tag">6.7折<span class="foodcommon-rateGhost mini-tag-ghost">6.7折</span></span>
                                            </span>
                                        </div>
                                        <span class="salesInfo-price fooddetails-salesInfo" style="color: rgb(255, 83, 57);">
                                            <span>35</span>
                                            <del class="salesInfo-originPrice">¥52</del>
                                        </span>
                                        <div class="fooddetails-button">
                                            <span>
                                                <span class="cartbutton-entitybutton">
                                                <a href="javascript:" role="button" aria-label="删减商品"><svg style="fill: rgb(35, 149, 255);"><use xlink:href="#cart-add"><svg viewBox="0 0 44 44" id="cart-add" width="100%" height="100%"><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clip-rule="evenodd"></path></svg></use></svg></a>
                                                    <span role="button" aria-label="已选1份" class="cartbutton-entityquantity">1</span>
                                                    <a href="javascript:" role="button" aria-label="添加商品"><svg style="fill: rgb(35, 149, 255);"><use xlink:href="#cart-minus"><svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg></use></svg></a>
                                                </span>
                                            </span>
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
    import goodsData from '../../assets/batch_shop'
    console.log(goodsData)
    const {bought_list,menu,recommend,redpack,rst,shop_sign} = goodsData;

    export default {

        data() {
            return {
                data: menu,
                rst:rst,
                recommend:recommend,
                bought_list:bought_list,
                redpack:redpack,
                shop_sign:shop_sign,
                current: menu[0].name,
                scrollEvents: ['scroll'],
                scrollY: 0,
            }
        },
        mounted(){
        },
        components:{

        },
        computed:{
            barTxts(){
                let ret=[];
                this.data.forEach((good)=>{
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
            imgurl(url) {
                if (url) {
                    let type = url.slice(-3) === 'png' ? 'png' : url.slice(-4) === 'jpeg' ? 'jpeg' : 'png';
                    let param = url.substring(0, 1) + '/' + url.substring(1, 3) + '/' + url.substring(3);
                    return `${param}.${type}`;
                }

            },
            scrollHandler({ y }) {
                this.scrollY = -y
            },
            onscroll(){
                console.log('开始前')
                this.$emit("disabledScroll",true)
            },
            onscrollEnd(){
                console.log('结束')
                this.$emit("disabledScroll",false)
            },
            changeHandler(label) {
                console.log(this.$refs.scroll)
                console.log('changed to:', label)
            },
            stickyChangeHandler(current) {
                console.log('sticky-change', current)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .cube-page
        position: absolute
        z-index: 10
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: #efeff4
        >.wrapper
            //height: calc(100% - 688px)
            overflow-x: hidden
            overflow-y: auto
            -webkit-overflow-scrolling: touch

    .horizontal-scroll-list-wrap>.cube-scroll-content
        display :inline-block
    .posters
        background: #fff
        padding: .186667rem 0 0
        width: 10rem
        text-align :center
        img
            width: 9.146667rem
            height: 2.346667rem
            border-radius: .08rem
            margin: 0 auto
            max-width :100%
    .recommend
        width: 10rem
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



    .scroll-nav-side
        background-color: #fff
        width: 10rem!important
        .view-wrapper
            position: absolute
            top:1rem
            bottom: 1.813333rem!important
            left: 0
            width: 100%
        >>>.cube-scroll-nav-main
            background-color: #efeff4
        >>>.cube-sticky-fixed
            background-color: #efeff4
            top:-2px
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
                background-image: linear-gradient(135deg,#ffae1b,#f57751)
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