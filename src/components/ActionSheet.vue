<template>
    <div>
        <transition  name="fade">
            <div class="actionsheet-bg" @click.self="closeFunc" v-show="open"></div>
        </transition>
        <transition name="move">
            <div class="actionsheet" v-show="open" >
                <div class="actionsheet-wrap" >
                    <h2 class="actionsheet-head">
                        <span class="cart">{{title}}</span>

                    </h2>
                    <div class="actionsheet-content">
                        <slot>content</slot>
                    </div>

                    <span class="close" @click="closeFunc"><i class="cubeic-close"></i></span>
                </div>
            </div>
        </transition>
    </div>




</template>

<script type="text/ecmascript-6">

    export default {
        'name': 'actionsheet',
        props: {
            open: {
                type: Boolean,
                default: false
            },
            title:''

        },
        methods: {
            closeFunc: function () {
                this.$emit('show')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .fade-enter, &.fade-leave-active
        opacity: 0
    .fade-enter-active, &.fade-leave-active
        transition: all .3s ease-in-out
    .move-enter, .move-leave-active
        transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
        transition: all .3s ease-in-out
   // .fade-enter-active, .fade-leave-active
      //  transition: all .4s ease
    //.fade-enter
       // transform: translate3d(0, 100%, 0)
       // opacity: 0
    //.fade-leave-to
     //   opacity: 0
    .actionsheet
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 99
        .actionsheet-wrap
            position: absolute;
            background-color: #f5f5f5
            box-shadow: 0 -1px 5px 0 rgba(0,0,0,.4)
            bottom: 0
            left: 0
            right: 0
            z-index: 100
            padding: .533333rem .693333rem
            box-sizing: border-box
            transition: -webkit-transform .2s
            transition: transform .2s
            transition: transform .2s,-webkit-transform .2s
            will-change: transform
            .actionsheet-head
                width: 100%
                text-align: center
                font-size: .453333rem
                font-weight: 600;
                margin-bottom: .413333rem
            .actionsheet-content
                height: 5.08rem
                overflow-y: scroll
            .close
                position: absolute
                height: .64rem
                width: .64rem
                right: .266667rem
                top: .266667rem
                font-size: 26px
                .cubeic-close
                    position :absolute
                    top:0
                    left:0
        .actionsheet-bg
            position: absolute
            width: 100%
            height: 100%
            top: 0
            left: 0
            background-color: rgba(0,0,0,.5)  



</style>