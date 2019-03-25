<template>
    <div class="modal" v-show="openDialog">
        <transition name="fade">
        <div class="brief-modal" v-show="openDialog">
            <slot>content</slot>
        </div>
        </transition>
        <div class="brief-modal-close" style="background-image: url(&quot;//fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/&quot;);" @click="closeFunc"></div>
        <div class="brief-modal-bg" @click.self="closeFunc"></div>
    </div>

</template>

<script type="text/ecmascript-6">

    export default {
    'name':'Dialog',
        props: {
            openDialog: {
                type: Boolean,
                default: false
            },
            title:''

        },
        methods: {
            closeFunc: function () {
                this.$emit('openDialog')
            }
        }
    }
</script>

<style lang="stylus" scoped>
.modal
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: -webkit-flex
    display: flex
    -webkit-justify-content: center
    justify-content: center
    -webkit-align-items: center
    align-items: center
    z-index: 52
    -webkit-flex-direction: column
    flex-direction: column
    .brief-modal
        position: relative
        width: 80%
        box-sizing: border-box
        max-height: 8.533333rem
        padding: .706667rem .666667rem .746667rem
        border-radius: .106667rem
        overflow: hidden
        background: #fff
        z-index: 99
        display: -webkit-flex
        display: flex
        -webkit-flex-direction: column
        flex-direction: column
        transition: -webkit-transform .2s
        transition: transform .2s
        transition: transform .2s,-webkit-transform .2s
        will-change: transform
    .brief-modal-close
        margin-top: .8rem
        width: .8rem
        height: .8rem
        background-size: 100%
        z-index: 2

    .brief-modal-bg
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: rgba(0,0,0,.5)
        z-index: 1

@-webkit-keyframes bounceIn
    from,
    20%,
    40%,
    60%,
    80%,
    to
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
    0%
        opacity: 0
        -webkit-transform: scale3d(0.3, 0.3, 0.3)
        transform: scale3d(0.3, 0.3, 0.3)
    20%
        -webkit-transform: scale3d(1.1, 1.1, 1.1)
        transform: scale3d(1.1, 1.1, 1.1)
    40%
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
    60%
        opacity: 1
        -webkit-transform: scale3d(1.03, 1.03, 1.03)
        transform: scale3d(1.03, 1.03, 1.03)
    80%
        -webkit-transform: scale3d(0.97, 0.97, 0.97)
        transform: scale3d(0.97, 0.97, 0.97)
    to
        opacity: 1
        -webkit-transform: scale3d(1, 1, 1)
        transform: scale3d(1, 1, 1)


@keyframes bounceIn
    from,
    20%,
    40%,
    60%,
    80%,
    to
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)
    0%
        opacity: 0
        -webkit-transform: scale3d(0.3, 0.3, 0.3)
        transform: scale3d(0.3, 0.3, 0.3)
    20%
        -webkit-transform: scale3d(1.1, 1.1, 1.1)
        transform: scale3d(1.1, 1.1, 1.1)
    40%
        -webkit-transform: scale3d(0.9, 0.9, 0.9)
        transform: scale3d(0.9, 0.9, 0.9)
    60%
        opacity: 1
        -webkit-transform: scale3d(1.03, 1.03, 1.03)
        transform: scale3d(1.03, 1.03, 1.03)
    80%
        -webkit-transform: scale3d(0.97, 0.97, 0.97)
        transform: scale3d(0.97, 0.97, 0.97)
    to
        opacity: 1
        -webkit-transform: scale3d(1, 1, 1)
        transform: scale3d(1, 1, 1)
.fade-enter-active
    transition: all .8s ease
    animation :bounceIn 0.8s
.fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.fade-enter, .fade-leave-to
    opacity: 0
</style>