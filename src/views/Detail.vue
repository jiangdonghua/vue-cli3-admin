<template>
    <div class="detail" v-if="restaurant" @scroll="scrollHandler" style="height: 100%;">
        <div class="shop-header" v-if="restaurant.shop_sign" >
            <nav class="nav-img"
                :style="{'backgroundImage':'url('+imgurl(restaurant.shop_sign.image_hash || '')+')'}">
                <a href="javascript:;" class="back"></a>
            </nav>
            <div class="header-contain">
                <div class="img-wrap">
                    <img class="img" :src="imgurl(restaurant.image_path)">
                </div>
                <div class="header-basic" @click="handleActionSheet('openDialog')">
                    <h2 class="header-title"><span class="name">{{restaurant.name}}</span><i class="icon-arr"></i></h2>
                    <div class="header-message" v-if="restaurant.delivery_mode">
                        <span class="rate">评价{{restaurant.rating}}</span><span class="number">月售{{restaurant.recent_order_num}}单</span><span class="delivery-type">{{restaurant.delivery_mode.text}}<span>约{{restaurant.order_lead_time}}分钟</span></span>
                    </div>
                </div>
                <div class="red-pack" @click="handleActionSheet('openRedPack')">
                    <div class="red_pack_div" >
                        <p class="red_pack_p">
                            <span class="red_pack_val"><small>¥</small>{{restaurant.redpack[0].value}}</span>
                            <span><svg class="red_pack_title"><use
                                    xlink:href="#svip-icon"></use></svg>{{restaurant.redpack[0].title}}
                                </span>
                        </p>
                        <p class="red_pack_btn">领取</p></div>
                </div>
                <div class="activities" @click="handleActionSheet('open')"  v-if="restaurant.activities">
                    <div class="activities-wrap">
                        <div class="activity">
                            <span class="mini-tag" :style="['backgroundColor:' +restaurant.icon_color]">{{iconName(restaurant.activities[0].icon_name)}}<span class="activity-tag">{{iconName(restaurant.activities[0].icon_name)}}</span></span><span class="activity-desc">{{restaurant.activities[0].description}}</span>
                        </div>
                    </div>
                    <div class="count">{{restaurant.activities.length}}个优惠</div>
                </div>
                <div class="promotion_info">{{restaurant.promotion_info}}</div>
            </div>
        </div>
        <Tab class="shop-tab" :tabs="tabs" ref="shopTab" style="height: 100%;" id="shopTab"></Tab>
        <ActionSheet :open="open" title="优惠活动" @show="show('open')">
            <div class="activity-item" v-for="item in restaurant.activities" >
                <span class="activity-item-mini-tag" :style="{backgroundColor:'#'+item.icon_color}" :color="item.icon_color" >
                    {{iconName(item.icon_name)}}
                    <span class="activity-item-mini-tag1" >{{iconName(item.icon_name)}}</span>
                </span>
                <span class="activity-item-desc">{{item.description}}</span>
            </div>
        </ActionSheet>
        <ActionSheet :open="openRedPack" title="店铺专享红包" @show="show('openRedPack')">
            <div class="hongbao-wrap">
                <h4 class="hongbao">
                    <span>超级会员特权</span>
                    <p class="hongbao-p">限<span></span>超<span></span>级<span></span>会<span></span>员<span></span>用<span></span>户<span></span>兑<span></span>换<span></span></p>
                </h4>
                <section class="hongbao-coupon">
                    <div class="coupon-1">
                        <div class="coupon-2">
                            <p><span>9</span></p>
                        </div>
                        <div class="coupon-3">
                            <h3><svg><use xlink:href="#svip-icon"></use></svg>
                                满任意金额可用
                            </h3>
                            <p>限本店使用, 2019-03-09到期</p>
                        </div>
                    </div>
                    <div class="coupon-4">
                        <div class="coupon-5">
                            <p></p>
                            <a href="javascript:;">兑换</a>
                        </div>
                    </div>
                    <div class="coupon-6">新会员专享</div>
                </section>
            </div>

        </ActionSheet>
        <Pop :openDialog="openDialog" @openDialog="show('openDialog')">
<h2 class="pop-title">CuiquCoffee奎克咖啡(189弄店)
</h2>
            <ul class="brief-modal-ul">
                <li class="brief-modal-li">
                    <h3 class="brief-modal-h3">{{restaurant.rating}}</h3>
                    <p class="brief-modal-p">评分</p>
                </li>
                <li class="brief-modal-li">
                    <h3 class="brief-modal-h3">{{restaurant.recent_order_num}}</h3>
                    <p class="brief-modal-p">月售</p>
                </li>
                <li class="brief-modal-li" v-if="restaurant.delivery_mode">
                    <h3 class="brief-modal-h3">{{restaurant.delivery_mode.text}}</h3>
                    <p class="brief-modal-p">约{{restaurant.order_lead_time}}分钟</p>
                </li>
                <li class="brief-modal-li">
                    <h3 class="brief-modal-h3">{{restaurant.float_delivery_fee}}</h3>
                    <p class="brief-modal-p">配送费</p>
                </li>
                <li class="brief-modal-li">
                    <h3 class="brief-modal-h3">{{restaurant.distance<1000?restaurant.distance+'m':(restaurant.distance/1000).toFixed(2)+'km'}}</h3>
                    <p class="brief-modal-p">距离</p>
                </li>
            </ul>
            <h3 class="announce-title">
                <span>公告</span>
            </h3>
            <div class="announce-text">亲爱的顾客，因为系统隐私设置无法查看您真实手机号，建议您在备注留下真实号码，我们将不定期提供专属于您个人的专属福利。</div>
        </Pop>
        <div class="shop-cart-wrapper">
            <Shop-cart></Shop-cart>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import {seller, cart_client} from '../request/api';
    import ActionSheet from '../components/ActionSheet';
    import Pop from '../components/dialog';
    import Tab from '../components/tab'
    import Goods from '../components/goods/goods'
    //import Tests from '../components/goods/test'
    import ShopCart from '../components/shop-cart/shop-cart'

    import Ratings from '../components/ratings/ratings'
    import Seller from '../components/seller/seller'
    export default {
        name: 'detail',
        data() {
            return {
                restaurant: [],
                cartClient: [],
                activities: [],
                open: false,
                openDialog:false,
                openRedPack:false,

            }
        },
        components: {
            ActionSheet,Pop,Tab,ShopCart
        },
        computed:{
            tabs() {
                return [
                    {
                        label: '点餐',
                        component: Goods,
                        data: {
                            seller: this.restaurant
                        }
                    },
                    {
                        label: '评价',
                        component: Ratings,
                        data: {
                            seller: this.restaurant
                        }
                    },
                    {
                        label: '商家',
                        component: Seller,
                        data: {
                            seller: this.restaurant
                        }
                    }
                ]
            }
        },
        created() {
            const sellerId = this.$route.params.id;
            this.getSeller(sellerId);
            this.get_cart_client(sellerId);
        },
        methods: {
            handleActionSheet(type) {
                this[type] = true;
            },
            show(type) {
                this[type] = false;
            },
            iconName(type){
              if(type){
                  switch (type) {
                      case '减':
                          return '满减'
                      case '折':
                          return '折扣'
                      case '首':
                          return '首单'
                      case '新':
                          return '新客'
                      case '特':
                          return '特价'
                      default:
                          return ''
                  }
              }
            },
            scrollHandler(e) {
                // console.log(document.querySelector("#recommend").offsetHeight)
               // console.log(document.querySelector("#scrollNav").offsetTop)
                this.scrollY = e.currentTarget.scrollTop
                let target=document.querySelector("#scrollNav");
                 let _height=document.querySelector("#recommend").offsetHeight;
                let offsetTop=target.offsetTop+_height;
                console.log(this.scrollY+'/'+offsetTop)
                //console.log(e.currentTarget.children[1].children[1].children)
                if( this.scrollY>=offsetTop){
console.log('配置fixed')

                }else{

                }
                //console.log( this.scrollY)
            },
            getSeller(sellerId) {
                seller({sellerId: sellerId}).then(res => {

                    this.restaurant = res.restaurant
                })
            },

            get_cart_client(sellerId) {
                cart_client({sellerId: sellerId}).then(res => {
                    //console.log(res);
                    this.cartClient = res
                })
            },

            imgurl(url) {
                if (url) {
                    let type = url.slice(-3) === 'png' ? 'png' : url.slice(-4) === 'jpeg' ? 'jpeg' : 'png';
                    let param = url.substring(0, 1) + '/' + url.substring(1, 3) + '/' + url.substring(3);
                    return `https://fuss10.elemecdn.com/${param}.${type}?imageMogr/format/webp/thumbnail/750x/`;
                }

            },
        }
    }
</script>

<style lang="stylus" scoped>
   // .detail
        /*position: absolute*/
        /*z-index: 10*/
        /*top: 0*/
        /*left: 0*/
        /*width: 100%*/
        /*height: 100%*/
        /*background: #efeff4*/
        //.shop-tab
            /*position:absolute*/
            /*width: 100%*/
        .shop-header
            position: relative
            color: #333
            font-size: .293333rem
            background-color: #fff
            padding-top: 2.666667rem

            .nav-img
                height: 2.666667rem
                position: absolute
                left: 0
                right: 0
                top: 0
                display: flex;
                -webkit-align-items: justify
                align-items: justify
                background-position: 50%
                background-size: cover
                background-repeat: no-repeat
                padding: .106667rem .266667rem 0

                &::before
                    content: "";
                    position: absolute
                    left: 0
                    right: 0
                    top: 0
                    bottom: 0
                    background-image: linear-gradient(0deg, hsla(0, 0%, 100%, 0), rgba(0, 0, 0, .5))

                .back
                    margin-top: .133333rem
                    margin-left: .133333rem
                    width: .32rem
                    height: .32rem
                    display: inline-block
                    border-bottom: .053333rem solid #fff
                    border-left: .053333rem solid #fff
                    -webkit-transform: rotate(45deg)
                    transform: rotate(45deg)


            .header-contain
                padding: .8rem 0 0
                position: relative
                display: flex
                flex-direction: column
                align-items: center
                background-color: #fff

                .img-wrap
                    width: 2rem
                    height: 2rem
                    position: absolute
                    top: 0
                    left: 50%
                    margin-left: -1rem
                    margin-top: -1.6rem

                    .img
                        width: 100%
                        height: 100%
                        border-radius: .08rem
                        box-shadow: 0 0 .04rem 0 rgba(0, 0, 0, .2)


                .header-basic
                    flex: 1
                    width: 7.2rem

                    .header-title
                        font-size: .546667rem
                        font-weight: 700
                        white-space: nowrap
                        position: relative
                        padding-right: .266667rem
                        display: flex
                        align-items: center
                        justify-content: center

                        .name
                            text-align: left
                            overflow: hidden
                            text-overflow: ellipsis

                        .icon-arr
                            width: .4rem
                            position: relative
                            height: .653333rem

                            &::after
                                content: ""
                                border-style: solid
                                border-width: .146667rem 0 .146667rem .173333rem
                                border-color: transparent transparent transparent rgba(0, 0, 0, .67)
                                position: absolute
                                left: .16rem
                                top: .213333rem

                    .header-message
                        white-space: nowrap
                        height: .32rem
                        margin-top: .173333rem
                        font-size: .293333rem
                        color: #666
                        text-align: center

                        span
                            white-space: nowrap
                            height: .32rem
                            margin-top: .173333rem
                            font-size: .293333rem
                            color: #666
                            text-align: center

                            &:not(:last-child):after
                                content: " \B7 "
                                opacity: .2

                .red-pack
                    display: flex
                    margin: .213333rem auto 0
                    justify-content: center
                    width: 8rem

                .red_pack_div
                    display: flex
                    align-items: center
                    justify-content: space-between
                    position: relative
                    padding-left: .2rem
                    height: .64rem
                    width: 3.84rem
                    font-size: .293333rem
                    color: #594519
                    background: #ffe578

                    &::before, &::after
                        content: ""
                        position: absolute
                        right: .933333rem
                        width: .133333rem
                        height: .066667rem
                        background: #fff
                        transform: translateX(50%);

                    &::before
                        bottom: -1px
                        border-bottom: none
                        border-radius: .133333rem .133333rem 0 0

                    &::after
                        top: -1px
                        border-top: none
                        border-radius: 0 0 .133333rem .133333rem

                    .red_pack_p
                        flex: 1
                        display: flex
                        justify-content: center
                        align-items: center

                        .red_pack_val
                            font-size: .426667rem
                            font-weight: 700
                            margin: 0 .266667rem 0 .133333rem

                            small
                                font-size: .32rem
                                margin-right: .026667rem

                        .red_pack_title
                            margin-right: .066667rem
                            width: .333333rem
                            height: .266667rem

                    .red_pack_btn
                        color: #594519
                        text-align: center
                        width: .933333rem


                .activities
                    display: flex
                    width: 8rem
                    font-size: .293333rem
                    color: #333
                    margin: 0 auto
                    padding-top: .32rem
                    align-items: center

                    .activities-wrap
                        flex: 1
                        overflow: hidden

                        .activity
                            display: flex
                            font-size: .346667rem
                            -webkit-align-items: center
                            align-items: center

                            .mini-tag
                                background-color: rgb(240, 115, 115)
                                position: relative
                                color: transparent
                                white-space: nowrap
                                margin-right: 1.6vw
                                font-size: .24rem
                                padding: .053333rem .12rem
                                height: .346667rem
                                display: inline-block
                                box-sizing: border-box
                                border-radius: .026667rem

                                .activity-tag
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
                                    font-size: .48rem !important
                                    color: #fff

                            .activity-desc
                                flex: 1
                                font-size: .293333rem
                                overflow: hidden
                                white-space: nowrap
                                text-overflow: ellipsis

                    .count
                        width: 16.266667vw
                        -webkit-flex-shrink: 0
                        flex-shrink: 0
                        position: relative
                        padding-right: .293333rem
                        text-align: right
                        color: #999

                        &::after
                            content: ""
                            display: block
                            border-style: solid
                            border-width: .106667rem .093333rem 0
                            border-color: #999 transparent transparent
                            position: absolute
                            top: 50%
                            -webkit-transform: translateY(-50%)
                            transform: translateY(-50%)
                            right: 0

                .promotion_info
                    width: 8rem
                    font-size: .293333rem
                    color: #999
                    overflow: hidden
                    text-overflow: ellipsis
                    margin: 0 auto
                    margin-top .226667rem
                    padding-bottom: .226667rem
                    white-space: nowrap
        .activity-item
            display: flex
            font-size: .346667rem
            align-items: center
            margin-bottom: .306667rem
            .activity-item-mini-tag
                margin-right: .16rem
                font-size: .24rem
                display: inline-block
                box-sizing: border-box
                border-radius: .026667rem
                height: .426667rem
                padding: .053333rem .16rem
                position: relative
                color: transparent
                white-space: nowrap
                .activity-item-mini-tag1
                    position: absolute
                    left: 0
                    top: 0
                    right: -100%
                    bottom: -100%
                    transform: scale(.5)
                    transform-origin: 0 0
                    display: flex
                    align-items: center
                    justify-content: center
                    font-size: .64rem!important
                    color: #fff
            .activity-item-desc
                flex :1
                font-size: .346667rem
                line-height: 1.38
        .pop-title
            font-size: .6rem
            line-height: .666667rem
            color: #333
            text-align: center
            font-weight: bolder
        .brief-modal-ul
            display: flex
            margin: .506667rem -.666667rem 0
            .brief-modal-li
                flex: 1
                text-align: center
            .brief-modal-h3
                font-size: .4rem
                font-weight: 600
                color: #333
                margin-bottom: .16rem
            .brief-modal-p
                font-size: .293333rem
                color: #999
        .announce-title
            position: relative
            text-align: center
            margin: .48rem auto .266667rem
            width: 2.026667rem
            background-image: linear-gradient(90deg,#fff,#333 50%,#fff)
            background-size: 100% 1px
            background-position: 50%
            background-repeat: no-repeat
            span
                font-size: .32rem
                padding: 0 .106667rem
                color: #999
                background-color: #fff
        .announce-text
            font-size: .346667rem
            line-height: 1.54
            color: #333
            max-height: 2.666667rem
            overflow-y: auto
        .hongbao
            display: flex
            padding: 0 .213333rem
            font-size: .32rem
            font-weight: 700
            color: #666
            &>span
                font-size: .32rem
                color: #666
            &>p
                margin-left: .266667rem
                color: #999
                font-size: .293333rem
                &>span
                    color: #ff5339
        .hongbao-wrap
            padding-bottom: .4rem
        .hongbao-coupon
            display: flex
            position: relative
            margin: .266667rem auto 0
            padding-left: .4rem
            height: 2.533333rem
            border-radius: .026667rem
            border: 1px solid #eae5b9
            background: #fff4be
            &::before
                width: 1px
                height: 2.026667rem
                content: ""
                position: absolute
                top: 50%
                right: 2.346667rem
                -webkit-transform: translateY(-50%)
                transform: translateY(-50%)
                border-left: 1px dashed rgba(93,74,29,.2)
        .coupon-1
            position: relative
            display: flex
            flex: 1
            padding-right: .266667rem
            &::before,&::after
                content: ""
                position: absolute
                right: 0
                width: .266667rem
                height: .133333rem
                background: #f5f5f5
                -webkit-transform: translateX(50%)
                transform: translateX(50%)
                z-index: 10
                bottom: -1px
                border-radius: .266667rem .266667rem 0 0
                border: 1px solid #eae5b9
                border-bottom: none
            &::after
                border: 1px solid #eae5b9;
                top: -1px;
                border-top: none;
                border-radius: 0 0 .266667rem .266667rem
        .coupon-2
            display: flex
            justify-content: center
            align-items: center
            font-size: .853333rem
            color: #594519
            &>p
                display: flex
                align-items: flex-start
                font-weight: 700
                &::before
                    margin: .293333rem .08rem 0
                    content: "\A5"
                    font-weight: 400
                    font-size: .426667rem
        .coupon-3
            display: flex
            flex-direction: column
            justify-content: center
            margin-left: .48rem
            word-wrap: break-word
            word-break: break-all
            h3
                font-size: .4rem
                font-weight: 700
                color: #594519
                svg
                    fill: #f8ca45
                    width: .4rem
                    height: .32rem
            p
                font-size: .293333rem
                color: #735b27
                margin-top: .186667rem

        .coupon-4
            position: relative
            display: flex
            justify-content: center
            align-items: center
            flex: 0 0 2.346667rem
            overflow: hidden
        .coupon-5
            display: -webkit-flex
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            font-size: .346667rem
            &>p
                font-size: .293333rem
                color: #735b27
            &>a
                margin-top: .08rem
                display: inline-block
                width: 1.6rem
                height: .693333rem
                color: #fff
                text-align: center
                line-height: .693333rem
                border-radius: .426667rem
                background: #ff5339
                border-top: 1px solid transparent
                border-bottom: 1px solid transparent
        .coupon-6
            border-radius: .026667rem
            background-color: #f76e4d
            font-size: .133333rem
            color: #fff
            position: absolute
            right: -.053333rem
            top: -.053333rem
            padding: .013333rem .026667rem
</style>