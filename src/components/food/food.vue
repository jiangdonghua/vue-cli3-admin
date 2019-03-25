<template>
    <transition
            name="move"
            @after-leave="afterLeave"
    >
        <div class="food" v-show="visible">
            <cube-scroll ref="scroll">
                <div class="food-content">
                    <div class="image-header">
                        <img :alt="food.name" :title="food.name" :src="'https://fuss10.elemecdn.com/'+imgurl(food.image_path)+'?imageMogr/format/webp/thumbnail/!375x375r/gravity/Center/crop/375x375/'">
                        <div class="back" @click="hide">
                            <i class="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div class="content">
                        <h1 class="title">{{food.name}}</h1>
                        <div class="detail">
                            <span class="sell-count">月售{{food.month_sales}}份</span>
                            <span class="rating">好评率{{food.satisfy_rate}}%</span>
                        </div>
                        <div class="price">
                            <template v-for="specfood in food.specfoods">
                                <div class="fooddetails-activityRow">
                                            <span class="foodcommon-activity" v-if="specfood.original_price">
                                                <span class="mini-tag-tag">{{Math.round((specfood.price/specfood.original_price)*100)/10}}折<span class="foodcommon-rateGhost mini-tag-ghost">{{Math.round((specfood.price/specfood.original_price)*100)/10}}折</span></span>
                                            </span>
                                </div>
                                <span class="salesInfo-price fooddetails-salesInfo" style="color: rgb(255, 83, 57);">
                                            <span class="now">¥{{specfood.price}}</span>
                                            <del class="salesInfo-originPrice old" v-if="specfood.original_price">¥{{specfood.original_price}}</del>
                                        </span>
                            </template>
                            <div class="cart-control-wrapper">
                                <cart-control @add="addFood" :food="food" :batch_shop="allGoods" ref="cartControl"></cart-control>
                            </div>
                            <transition name="fade">
                                <div @click="addFirst" class="buy" v-show="!food.count">
                                    加入购物车
                                </div>
                            </transition>
                        </div>

                    </div>

                    <div class="info" v-show="food.description">
                        <h1 class="title">商品信息</h1>
                        <p class="text">{{food.description}}</p>
                    </div>
                </div>
            </cube-scroll>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from "vuex";
    import {mapActions} from 'vuex';
    import CartControl from '../cart-control/cart-control'
    import {imgurl} from '../../util/util'
   // import popupMixin from '../../common/mixins/popup'

    const EVENT_SHOW = 'show'
    const EVENT_ADD = 'add'
    const EVENT_LEAVE = 'leave'
    const EVENT_HIDE = 'hide'
    export default {
        name: 'food',
        // mixins: [popupMixin],
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                visible: false
            }
        },
        computed: {
            ...mapGetters(['allGoods']),

        },
        created() {
            this.$on(EVENT_SHOW, () => {
                this.$nextTick(() => {
                    this.$refs.scroll.refresh()
                })
            })
        },
        methods: {
            ...mapActions([
                'setSpecInfo',
                'setAllGoods'
            ]),
            afterLeave() {
                this.$emit(EVENT_LEAVE)
            },
            addFirst(event) {
               // this.$set(this.food, 'count', 1)
                //这里 去同步
                this.$refs.cartControl.add(event, this.food)
                this.$emit(EVENT_ADD, event.target)
            },
            addFood(target) {
                this.$emit(EVENT_ADD, target)
            },
            imgurl(url){
                return imgurl(url)
            },
            show() {
                this.visible = true
                this.$emit(EVENT_SHOW)
            },
            hide() {
                this.visible = false
                this.$emit(EVENT_HIDE)
            }
        },
        components: {
            CartControl,
        }
    }
</script>

<style lang="stylus" scoped>


    .food
        position: fixed
        left: 0
        top: 0
        bottom: 1.8rem
        z-index: 10
        width: 100%
        background: #fff
        &.move-enter-active, &.move-leave-active
            transition: all 0.3s linear
        &.move-enter, &.move-leave-active
            transform: translate3d(100%, 0, 0)
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
            .back
                position: absolute
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: block
                    padding: 10px
                    font-size: 24px
                    color: #fff

        .content
            position: relative
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 8px
                font-size: 20px
                font-weight: 700
                color:#666
            .detail
                margin-bottom: 18px
                line-height: 10px
                height: 10px
                .sell-count, .rating
                    font-size: 14px
                    color: #666
                .sell-count
                    margin-right: 12px
            .price
                line-height: 24px
                font-weight: 700
                .now
                    margin-right: 8px
                    font-size: 18px
                    color: red
                .old
                    text-decoration: line-through
                    font-size: 14px
                    color: #ccc
            .cart-control-wrapper
                position: absolute
                right: 12px
                bottom: 12px
            .buy
                position: absolute
                right: 0.3rem
                bottom: 0.3rem
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                border-radius: 12px
                font-size: 14px
                color: #fff
                background: rgb(35, 149, 255)
                opacity: 1
                &.fade-enter-active, &.fade-leave-active
                    transition: all 0.3s
                &.fade-enter, &.fade-leave-active
                    opacity: 0
                    z-index: -1
        .info
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 6px
                font-size: 20px
                color: #666
            .text
                line-height: 24px
                padding: 0 8px
                font-size: 14px
                color:#666

</style>
