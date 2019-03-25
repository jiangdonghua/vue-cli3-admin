<template>
    <div class="cartview-cartview" @click="toggleList">
        <transition name="fade">
        <div class="cartview-cartmask" style="z-index: 10;" v-if="selectFoods.length>0" v-show="!listFold"></div>
        </transition>

        <div class="cartview-cartbody cartview-cartbodyOpen" style="z-index: 11;"  >

            <section class="discount-tip-discountTip" v-show="listFold1">
                <span style="color: #333333;" :class="" v-html="payDesc"></span>
            </section>
            <transition name="move" @after-leave="afterLeave">
            <div  v-show="!listFold">
                <section class="discount-tip-discountTip">
                    <span style="color: #333333;" :class="" v-html="payDesc"></span>
                </section>
                <div class="cartview-cartheader">
                    <div class="cartview-headerText">
                        <span>已选商品</span>
                    </div>
                    <a href="javascript:"  class="cartview-cartheaderRemove" @click="empty"><svg><use xlink:href="#cart-remove"></use></svg> <span>清空</span></a>
                </div>
                <div class="entityList-cartbodyScroller" >
                    <ul class="entityList-cartlist">
                     <template v-for="food in selectFoods">
                     <template v-for="specfood of food.specfoods" v-if="specfood.food_id>0">
                            <li class="entityList-entityrow" v-if="food.attrSelecteds&&attr.count" v-for="attr of food.attrSelecteds">
                                    <span class="entityList-entityname"><em class="entityList-name">{{food.name}}</em>
                                        <p class="entityList-entityspecs"> {{attr.Selected}}</p>
                                    </span>
                                    <span class="entityList-entitytotal" style="color: rgb(255, 83, 57);">
                                             <del class="entityList-entitytotalOriginal" v-if="specfood.original_price">{{specfood.original_price}}</del>
                                            <span class="entityList-entitytotalDiscount">{{specfood.price}}</span>
                                     </span>
                            <Cart-Control :food="food" @add="add" :batch_shop="batch_shop" :count="attr.count" :Selected="attr.Selected"></Cart-Control>
                            </li>
                            <li class="entityList-entityrow"v-if="!food.attrSelecteds">
                                <span class="entityList-entityname"><em class="entityList-name">{{food.name}}</em>
                                    <p class="entityList-entityspecs"></p>
                                </span>
                                    <span class="entityList-entitytotal" style="color: rgb(255, 83, 57);">
                                      <del class="entityList-entitytotalOriginal" v-if="specfood.original_price">{{specfood.original_price}}</del>
                                    <span class="entityList-entitytotalDiscount">{{specfood.price}}</span>
                                </span>
                                    <Cart-Control :food="food" @add="add" :batch_shop="batch_shop"></Cart-Control>
                            </li>
                            </template>
                            </template>
                        </ul>
                    <div class="entityList-entityrow entityList-packingfee" v-if="selectFoods.length>0">
                        <span class="entityList-entityname">餐盒</span>
                        <span class="entityList-entitytotal" style="color: rgb(255, 83, 57);">{{totalPacking_fee}}</span>
                        <span class="entityList-entitycartbutton"></span>
                    </div>
                </div>

            </div>
            </transition>
        </div>

        <div class="bottomNav-cartfooter" style="z-index: 11;" >
            <span role="button" aria-label="购物车"  class="bottomNav-carticon " :class="payClassCart">
<i class="icon-shopping_cart"></i><span v-show="totalCount>0">{{totalCount}}</span>
            </span>
            <div role="button"  class="bottomNav-cartInfo">
                <p class="bottomNav-carttotal">
                    <span :class="totalPrice>0?'':'bottomNav-carttotalOriginal'">{{totalOriginPrice}}</span>
                    <del class="bottomNav-carttotalOriginal"  v-if="totalPrice>0" style="margin-left: 0.2rem">¥{{totalPrice}}</del>
                   </p>
                <p class="bottomNav-cartdelivery">另需配送费{{formatFloat(deliveryPrice)}}元</p>
            </div>
            <a role="button" href="javascript:;" class="submit-btn-submitbutton" :class="payClass" @click="goPay">
                <span>{{payDescBtn}}</span></a>
        </div>

        <div class="ball-container">
            <div v-for="ball of balls">
                <transition
                @before-enter="beforeDrop"
                @enter="dropping"
                @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import CartControl from '../cart-control/cart-control';
    import {mapActions} from 'vuex';
    import {formatFloat} from '../../util/util'
    const BALL_LEN=10;
    const innerClsHook='inner-hook';
    function createBalls() {
        let balls=[];
        for(let i=0;i<BALL_LEN;i++){
            balls.push({show:false})
        }
        return balls
        
    }
    export default {
        name:"shop-cart",
        props:{
            selectFoods:{
                type:Array,
                default(){
                    return []
                }
            },
            deliveryPrice:{
                type:Number,
                default:0
            },
            minPrice:{
                type:Number,
                default:0
            },
            fold:{
                type:Boolean,
                default:true
            },
            batch_shop:{
                type:Object
            },
            shake:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                listFold:this.fold,
                listFold1:true,
                balls:createBalls(),
                shakeCart:this.shake
            }

        },
        created(){
            this.dropBalls=[]
        },
       computed:{
            //总价
            totalPrice(){
                let total=0;
                this.selectFoods.forEach((food)=>{
                    food.specfoods.forEach((item)=>{
                        if(item.food_id>0){
                            total+=(food.count)*item.price+(food.count)*item.packing_fee
                        }
                    })
                })
                return this.formatFloat(total);
            },
           //总数量
           totalCount(){
               let count=0;
               this.selectFoods.forEach((food)=>{
                       count+=(food.count)
               });
               return count;
           },
           //实际价格
           totalOriginPrice(){
               if(this.totalPrice===0){
                   return `未选购商品`
               }else if(this.totalPrice<32){
                   return `${this.formatFloat(this.totalPrice-5)}`
               }else if(this.totalPrice<=56){
                   let diff=this.totalPrice-10;
                   return `${this.formatFloat(diff)}`
               }
               else{
                   return `${this.formatFloat(this.totalPrice-17)}`
               }
           },
           //打包费
           totalPacking_fee(){
               let total=0;
               this.selectFoods.forEach((food)=>{
                   food.specfoods.forEach((item)=>{
                       if(item.food_id>0){
                           total+=(food.count)*item.packing_fee
                       }
                   })
               })
               return total;
           },
           //文案
           payDesc(){
                if(this.totalPrice===0){
                    return `满32减5元，满56减12元`
                }else if(this.totalPrice<this.minPrice){
                    let diff=this.minPrice-this.totalPrice
                    return `还差<span style="color: #FF5339;">${diff}</span>元起送`
                }else if(this.totalPrice<=56){
                    let diff=56-this.totalPrice;
                    return `已减10元,再买<span style="color: #FF5339;">${diff}</span>元减17元`
               }
                else{
                    return '已减17元'
                }
           },
           //按钮文案
           payDescBtn(){
               if(this.totalPrice===0){
                   return `¥${this.minPrice}起送`
               }else if(this.totalPrice<this.minPrice){
                   let diff=this.minPrice-this.totalPrice
                   return `还差${diff}元起送`
               }else{
                   return '去结算'
               }
           },
           payClassCart(){
               if(!this.totalCount){
                   return 'bottomNav-empty'
               }else if(this.shakeCart){
                   return 'bottomNav-shake'
               }
               else{
                   return ''
               }
           },
           payClass(){
                if(!this.totalCount||this.totalPrice<this.minPrice){
                    return 'submit-btn-disabled'
                }else{
                    return ''
                }
           }
       },
        watch:{
            totalCount(count) {
                if(count===0){
                    this.listFold=true
                }
            }
        },
        methods:{
            ...mapActions([
                'setAllGoods'
            ]),
            add(el){
               // console.log(el)
                this.drop(el)
            },
            empty(e){
               this.recommendsInMenu()
               this.setAllGoods(this.batch_shop)
                e.stopPropagation()
            },
            recommendsInMenu() {
                this.batch_shop.menu.forEach((good, index) => {
                    good.foods.forEach((rec, index) => {
                        if(rec.attrSelecteds){
                            this.$delete(rec, 'attrSelecteds')
                        }
                        if (rec.count) {
                            this.$set(rec, 'count', 0)
                        }
                    })
                });
                this.batch_shop.recommend.forEach((good, index) => {
                    good.items.forEach((rec, index) => {
                        if(rec.attrSelecteds){
                            this.$delete(rec, 'attrSelecteds')
                        }
                        if (rec.count) {
                            this.$set(rec, 'count',0)
                        }
                    })
                })
            },
            toggleList(){
                //console.log(this.selectFoods)
                if(this.listFold){
                    if(!this.totalCount){
                        return
                    }
                    this.listFold=false
                }else{
                    this.listFold=true;
                }
               // this.listFold = !this.listFold;
                if(this.listFold1){
                    this.listFold1=false
                }
            },
            afterLeave(){
                this.listFold1=true
            },
            formatFloat(f){
              return formatFloat(f,2);
            },
            goPay(e){
                e.stopPropagation()
            },
            drop(el){
                for(let i=0,len=this.balls.length;i<len;i++){
                    const ball=this.balls[i];
                    if(!ball.show){
                        ball.show=true
                        ball.el=el
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            beforeDrop(el){
                this.shakeCart=true
                const ball=this.dropBalls[this.dropBalls.length-1];
                const rect=ball.el.getBoundingClientRect();
                const x=rect.left-128
                const y=-(window.innerHeight-rect.top-32)
                el.style.display=''
                el.style.transform=el.style.webkitTransform=`translate3d(0,${y}px,0)`;
                const inner=el.getElementsByClassName(innerClsHook)[0]
                inner.style.transform=inner.style.webkitTransform=`translate3d(${x}px,0,0)`
            },
            dropping(el,done){
                this._reflow=document.body.offsetHeight
                el.style.transform=el.style.webkitTransform=`translate3d(0,0,0)`;
                const inner=el.getElementsByClassName(innerClsHook)[0]
                inner.style.transform=inner.style.webkitTransform=`translate3d(0,0,0)`
                el.addEventListener('transitionend',done)
            },
            afterDrop(el){
                this.shakeCart=false
                const ball=this.dropBalls.shift()
                if(ball){
                    ball.show=false
                    el.style.display='none'
                }
            }
        },
        components:{
            CartControl
        }

    }
</script>

<style lang="stylus" scoped>
    .fade-enter, .fade-leave-active
        opacity: 0
    .fade-enter-active, .fade-leave-active
        transition: all .3s ease-in-out
    .move-enter, .move-leave-active
        transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
        transition: all .3s ease-in-out
    .ball-container
        .ball
            position: fixed
            left: 32px
            bottom: 22px
            z-index: 200
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            .inner
                width: 16px
                height: 16px
                border-radius: 50%
                background: #00a0dc
                transition: all 0.4s linear
    .cartview-cartview
        font-size: .426667rem

    .cartview-cartbody
        position: absolute
        left: 0
        width: 100%
        transition: -webkit-transform .3s ease
        transition: transform .3s ease
        transition: transform .3s ease,-webkit-transform .3s ease
        -webkit-transform: translate3d(0,100%,0)
        transform: translate3d(0,100%,0)
        bottom: 1.813333rem

    .cartview-cartbody.cartview-iPhoneXMode
        bottom: 2.266667rem

    .cartview-cartbodyNoTip
        bottom: 1.28rem

    .cartview-cartbodyNoTip.cartview-iPhoneXMode
        bottom: 1.733333rem

    .cartview-cartbodyOpen
        -webkit-transform: translateZ(0)
        transform: translateZ(0)
        bottom: 1.28rem

    .cartview-cartbodyOpen.cartview-iPhoneXMode
        bottom: 1.733333rem

    .cartview-cartbodyEnterActive,.cartview-cartbodyLeave
        -webkit-transform: translateZ(0)
        transform: translateZ(0)
    

    .cartview-cartbodyEnter,.cartview-cartbodyLeaveActive
        -webkit-transform: translate3d(0,100%,0)
        transform: translate3d(0,100%,0)
    

    .cartview-cartmask
        position: fixed
        top: 0
        right: 0
        bottom: 0
        left: 0
        background-color: #000
        opacity: .4
        transition: opacity .3s ease
    

    .cartview-cartmaskEnterActive,.cartview-cartmaskLeave
        opacity: .4
    

    .cartview-cartmaskEnter,.cartview-cartmaskLeaveActive
        opacity: 0
    

    .cartview-cartheader
        padding: 0 .4rem
        border-bottom: .013333rem solid #ddd
        background-color: #eceff1
        color: #666
        height: 1.066667rem
    

    .cartview-cartheader,.cartview-headerText
        display: -webkit-flex
        display: flex
        -webkit-align-items: center
        align-items: center
    

    .cartview-headerText
        -webkit-flex: 1
        flex: 1
    

    .cartview-maxDiscountText,.cartview-weight
        font-size: .32rem
        color: #999
        margin-left: .08rem

    .cartview-weight
        -webkit-flex: none
        flex: none
    

    .cartview-maxDiscountText
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    

    .cartview-cartheaderRemove
        -webkit-flex: none
        flex: none
        display: -webkit-flex
        display: flex
        -webkit-align-items: center
        align-items: center
        padding-left: .4rem
        color: #666
        text-decoration: none
        font-size: .346667rem
        line-height: .4rem

    .cartview-cartheaderRemove svg
        width: .4rem
        height: .4rem
        fill: #ddd
        margin-right: .08rem

    .discount-tip-discountTip
        background-color: #fffad6
        border-top: .013333rem solid #f9e8a3
        opacity: .96
        line-height: .533333rem
        font-size: .266667rem
        text-align: center

    .bottomNav-cartfooter
        position: fixed
        right: 0
        bottom: 0
        left: 0
        display: -webkit-flex
        display: flex
        -webkit-align-items: center
        align-items: center
        padding-left: 2.106667rem
        background-color: rgba(61,61,63,.9)
        -webkit-backdrop-filter: blur(.266667rem)
        height: 1.28rem

    .bottomNav-iPhoneXMode
        height: 1.733333rem
        padding-bottom: .453333rem

    .bottomNav-iPhoneXMode>.bottomNav-carticon
        bottom: .653333rem

    .bottomNav-carticon
        position: absolute
        left: .32rem
        bottom: .2rem
        width: 1.333333rem
        height: 1.333333rem
        line-height: 1.333333rem
        box-sizing: border-box
        border-radius: 100%
        background-color: #3190e8
        border: .133333rem solid #444
        box-shadow: 0 -.08rem .053333rem 0 rgba(0,0,0,.1)
        will-change: transform
        text-align :center
        display :flex
        align-items :center
        justify-content :center
        .icon-shopping_cart
            font-size: 0.78rem
            padding-left: 0.08rem
            color: #fff

    .bottomNav-carticon:before
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        background-size: .6rem
        content: ""

    .bottomNav-carticon.bottomNav-empty
        background-image: radial-gradient(circle,#363636 .626667rem,#444 0)
        .icon-shopping_cart
            color: #999
    .bottomNav-carticon.bottomNav-empty:before,
    .bottomNav-carticon.bottomNav-empty:after
        visibility: hidden

    .bottomNav-carticon>span
        position: absolute
        right: -.12rem
        top: -.133333rem
        line-height: 1
        background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%)
        color: #fff
        border-radius: .32rem
        padding: .053333rem .133333rem
        font-size: .266667rem

    .bottomNav-carticon.bottomNav-shake
        -webkit-animation: bottomNav-shake .5s ease-in-out
        animation: bottomNav-shake .5s ease-in-out

    @-webkit-keyframes bottomNav-shake
        0% 
            -webkit-transform: scale(1)
            transform: scale(1)
        

        25% 
            -webkit-transform: scale(.8)
            transform: scale(.8)
        

        50% 
            -webkit-transform: scale(1.1)
            transform: scale(1.1)
        

        75% 
            -webkit-transform: scale(.9)
            transform: scale(.9)
        

        to 
            -webkit-transform: scale(1)
            transform: scale(1)
        
    

    @keyframes bottomNav-shake
        0% 
            -webkit-transform: scale(1)
            transform: scale(1)
        

        25% 
            -webkit-transform: scale(.8)
            transform: scale(.8)
        

        50% 
            -webkit-transform: scale(1.1)
            transform: scale(1.1)
        

        75% 
            -webkit-transform: scale(.9)
            transform: scale(.9)
        

        to 
            -webkit-transform: scale(1)
            transform: scale(1)
        
    

    .bottomNav-cartInfo
        -webkit-flex: 1
        flex: 1
    

    .bottomNav-carttotal
        font-size: .48rem
        line-height: normal
        color: #fff
    

    .bottomNav-carttotalOriginal
        font-size: .8em
        color: #999
    

    .bottomNav-cartdelivery
        color: #999
        font-size: .266667rem
    

    .bottomNav-cartextra
        border-left: .013333rem solid #666
        border-left: .133333vw solid #666
        margin-left: .133333rem
        padding-left: .133333rem
        font-size: .32rem
        color: #999
        display: table

    .bottomNav-cartextra em
        font-style: normal

    .submit-btn-submitbutton
        height: 100%
        width: 2.8rem
        background-color: #38ca73
        color: #fff
        text-align: center
        text-decoration: none
        font-size: .4rem
        font-weight: 700
        -webkit-user-select: none
        user-select: none
        line-height: 1.28rem

    .submit-btn-iPhoneXMode
        width: auto
        height: 1.04rem
        line-height: 1.04rem
        margin: .16rem .333333rem 0 0
        padding: 0 .333333rem
        border-radius: .053333rem


    .submit-btn-submitbutton small
        font-size: .293333rem
        display: block

    .submit-btn-submitbutton.submit-btn-disabled
        background-color: #535356


    .submit-btn-submitbutton.submit-btn-multiLine
        display: flex
        flex-direction: column
        justify-content: center
        line-height: 1.3


    .entityList-cartbodyScroller
        background-color :#fff
        overflow: auto
        -webkit-overflow-scrolling: touch
        max-height: 8rem

    ul.entityList-cartlist
        margin: 0
        padding: 0

    .entityList-entityrow
        display: flex
        align-items: center
        padding: .2rem .333333rem .2rem 0
        min-height: 1.466667rem
        margin-left: .333333rem

    .entityList-entityrow:not(:last-child)
        border-bottom: .013333rem solid #eee

    .entityList-entityrow.entityList-packingfee
        border-top: .013333rem solid #eee

    .entityList-entityname
        -webkit-flex: 5.5
        flex: 5.5
        line-height: normal

    .entityList-entityname.entityList-hasstocktip .entityList-name
        max-width: 2.666667rem

    .entityList-entityname .entityList-name
        display: inline-block
        font-style: normal
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        vertical-align: middle
        max-width: 4.666667rem


    .entityList-entityname .entityList-stocktip
        font-style: normal
        display: inline-block
        vertical-align: middle
        padding: 0 .066667rem
        line-height: .373333rem
        font-size: .28rem
        background-color: rgba(255,76,13,.15)
        border-radius: .026667rem
        color: #ff4c0d

    .entityList-entityspecs
        width: 100%
        line-height: .333333rem
        color: #999
        font-size: .266667rem


    .entityList-entitytotal
        -webkit-flex: 2.5
        flex: 2.5
        color: #ff5339
        text-align: right
        white-space: nowrap
        font-weight: 700

    .entityList-entitytotalDiscount
        margin-right: 0.9rem
    .entityList-entitytotalDiscount:before
        content: "\A5"
        font-size: .266667rem
        color: currentColor


    .entityList-entitytotalOriginal
        margin-right: .133333rem
        font-size: .266667rem
        color: #999
        font-weight: 400


    .entityList-entitycartbutton
        -webkit-flex: 3
        flex: 3
        text-align: right

    .entityList-piecewiseTips
        padding: .133333rem 0
        margin-left: .333333rem
        font-size: .266667rem
        color: #999
        border-bottom: .013333rem solid #eee

    .entityList-piecewiseTips b
        display: inline-block
        margin-right: .066667rem
        padding: 0 .066667rem
        font-weight: 400
        color: #ff461d
        border: .013333rem solid #ff461d
        border-radius: .053333rem
        font-size: .266667rem

    .entityList-weight
        font-size: .32rem
        color: #666
</style>