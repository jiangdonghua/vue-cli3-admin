<template>
    <ul class="list">
        <li class="item"
            v-for="(item,index) of letters"
            :key="item"
            :ref="item"
            :class="{active:curIndex===index}"
            @touchstart.prevent="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @click="handleLetterClick($event,index)">
            {{item}}

        </li>
    </ul>
</template>

<script >
    export default {
        name: 'CityAlphabet',
        props: {
            cities: Object,
            currentIndex:Number
        },
        computed: {
            letters () {
                const letters = []
                for (let i in this.cities) {
                    letters.push(i)
                }
                return letters
            }
        },
        data () {
            return {
                touchStatus: false,
                startY: 0,
                timer: null,
                curIndex:0
            }
        },
        //通过 updated 生命周期钩子，进行代码优化，不用再每次 handleTouchMove 事件触发时进行计算
        updated () {
            this.startY = this.$refs['A'][0].offsetTop // A 字母距离 header区域下沿 高度
        },
        created(){
            this.curIndex=this.currentIndex

        },
        watch:{
            currentIndex(newVal){
                    this.curIndex=newVal
                   //console.log(this.curIndex)

            }

        },
        methods: {
            handleLetterClick (e,index) {
                this.curIndex=index
                this.$emit('change',e.target.innerText)
            },
            handleTouchStart () {
                this.touchStatus = true
            },
            handleTouchMove (e) {
                if (this.touchStatus) {
                    // 使用函数节流优化性能
                    if (this.timer) {
                        clearTimeout(this.timer)
                    }
                    this.timer = setTimeout(() => {
                        const touchY = e.touches[0].clientY - 79  // 手指距离 header区域下沿 高高度
                        const index = Math.floor((touchY - this.startY) / 20) // 当前字母下标
                        this.curIndex=index
                        if (index >= 0 && index < this.letters.length) {
                            this.$emit('change',this.letters[index])
                        }

                    },16)

                }
            },
            handleTouchEnd () {
                this.touchStatus = false
            }
        }
    }
</script>


<style lang="stylus" scoped>
    .list
        display: flex
        flex-direction: column
        justify-content: center
        position: absolute
        top: 1.58rem
        right: 0
        bottom: 0
        width: .4rem
        .item
            line-height: .5rem
            text-align: center
            color: #00bcd4
            &.active
                color: red
             
</style>