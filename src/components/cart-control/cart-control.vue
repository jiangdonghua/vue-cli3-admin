<template>
    <div class="cartcontrol">
        <span class="cartbutton-entitybutton">
            <transition name="move">
            <a href="javascript:" role="button" aria-label="删减商品" v-show="food.count>0" @click.stop.prevent="decrease($event,food)"
               class="cart-decrease" :class="food.attrs.length>0&&count===0?'disabled':''">
                <svg :style="{fill:food.attrs.length>0&&count===0? '#ccc!important':'rgb(35, 149, 255)'}" class="inner">
                    <use xlink:href="#cart-add"><svg viewBox="0 0 44 44" id="cart-add" width="100%" height="100%">
                        <path fill-rule="evenodd"
                        d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z"
                        clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clip-rule="evenodd">
                        </path></svg></use></svg>
            </a>
             </transition>
            <span role="button" :aria-label="'已选'+food.count+'份'" class="cartbutton-entityquantity" v-if="count>0"
            >{{count}}
            </span>
            <span role="button" :aria-label="'已选'+food.count+'份'" class="cartbutton-entityquantity"
                  v-show="food.count>0" v-else>{{food.count}}
            </span>
            <a href="javascript:" role="button" aria-label="添加商品" @click.stop.prevent="add($event,food)">
                <svg style="fill: rgb(35, 149, 255);"><use xlink:href="#cart-minus">
                    <svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%">
                        <path fill="none" d="M0 0h44v44H0z"></path>
                        <path fill-rule="evenodd"
                        d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg></use></svg>
            </a>
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions} from 'vuex';

    const EVENT_ADD = 'add'
    export default {
        name: 'cartControl',
        props: {
            food: {
                type: Object
            },
            batch_shop:{
                type:Object
            },
            count:{
                type:Number,
                default:0
            },
            Selected:{
                type:String,
                default:''
            }
        },
        methods: {
            ...mapActions([
                'setSpecInfo',
                'setAllGoods'
            ]),
            add($event, food) {
                if (food.attrs.length > 0) {
                    this.$set(food,"showInfo",true);
                    this.setSpecInfo(food)
                } else {
                    if (!this.food.count) {
                        this.$set(this.food, 'count', 1)
                    } else {

                        this.food.count++
                    }
                    this.recommendsInMenu();
                    this.$emit(EVENT_ADD, event.target)
                }

            },
            decrease($event,food) {
                if(food.attrs.length > 0&&this.count===0){
                    this.showToastTxtOnly();
                    return false;
                }else {
                    if(food.attrSelecteds&&food.attrSelecteds.length>0){
                        food.attrSelecteds.forEach(item=>{
                            console.log(item.Selected===this.Selected)
                            if(item.Selected===this.Selected){
                                item.count--
                            }
                        })
                    }
                    if (this.food.count) {
                        this.food.count--;
                        this.recommendsInMenu();
                    }
                }

            },
            recommendsInMenu(){
                    this.batch_shop.menu.forEach((good,index)=>{
                        good.foods.forEach((rec,index)=>{
                            if(rec.name===this.food.name){
                               this.$set(rec,'count',this.food.count)
                            }
                        })
                    });
                this.batch_shop.recommend.forEach((good,index)=>{
                    good.items.forEach((rec,index)=>{
                        if(rec.name===this.food.name){
                            this.$set(rec,'count',this.food.count)
                        }
                    })
                })
                this.setAllGoods(this.batch_shop)
            },
            showToastTxtOnly() {
                this.toast = this.$createToast({
                    txt: '多规格以及带属性商品只能去购物车删除哦~',
                    type: 'txt'
                })
                this.toast.show()
            }
        }
    }
</script>

<style lang="stylus" scoped>
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
            //fill: #2396ff

        .cart-decrease

            .inner
                transition: all 0.4s linear
                transform: rotate(180deg)
                fill: #2396ff
            &.move-enter-active, &.move-leave-active
                transition: all 0.4s linear

            &.move-enter, &.move-leave-active
                opacity: 0
                transition: translate3d(24px, 0, 0)

                .inner
                    transform: rotate(180deg)

    .cartbutton-entityquantity
        display: inline-block
        text-align: center
        color: rgba(0, 0, 0, .87)
        vertical-align: middle
        font-size: .373333rem
        width: .693333rem
        overflow: hidden
</style>