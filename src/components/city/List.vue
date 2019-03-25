<template>
    <my-scroll class="list"  ref="scrollRef"
               :data="cities&&hot"
               :probeType="probeType"
               :listen-scroll="listenScroll"
               @scroll="scroll" >
        <div>
            <div class="area" ref="area1">
                <div class="title border-topbottom">当前城市</div>
                <div class="button-list">
                    <div class="button-wrapper">
                        <div class="button">{{this.currentCity}}</div>
                    </div>
                </div>
            </div>
            <div class="area" ref="area2">
                <div class="title border-topbottom">热门城市</div>
                <div class="button-list">
                    <div class="button-wrapper"
                         v-for="item of hot"
                         :key="item.id"
                         @click="handleCityClick(item.name)"
                    >
                        <div class="button">{{item.name}}</div>
                    </div>

                </div>
            </div>
            <!-- 滚动固定标题实现 -->
            <div ref="fixedTitleRef" v-show="fixedTitle" class="list-fixed">
                <h1 class="fixed-title">{{ fixedTitle }}</h1>
            </div>
            <div ref="leftRef">
                <div class="area"
                     v-for="(item, key) of cities"
                     :key="key"
                     :ref="key"

                >
                    <div class="title border-topbottom">{{key}}</div>
                    <div class="item-list">
                        <div class="item border-bottom"
                             v-for="innerItem of item"
                             :key="innerItem.id"
                             @click="handleCityClick(innerItem.name)"
                        >
                            {{innerItem.name}}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </my-scroll>
</template>

<script >
    const RIGHT_ONEWORD_HEIGHT = 18
    const TITLE_HEIGHT = 29
    import MyScroll from '../mycroll/my-scroll'
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'CityList',
        components: {MyScroll},
        data(){
            return {
                touchStatus: false,
                startY: 0,
                timer: null,
                currentIndex:0,
                scrollY: -1,
                // 标题上推y值（热门标题 - A 标题）
                diff: -1
            }
        },
        props: {
            hot: Array,
            cities: Object,
            letter: String,
        },
        created(){
            this.touch = {}
            this.listenScroll = true
            this.leftListHeight = []
            this.probeType = 3 // better-scroll 滚动组件 不截留
        },
        computed: {
            ...mapState({
                currentCity: 'city'
            }),
            fixedTitle() {
                let _height;
                if(this.$refs.area1&&this.$refs.area2){
                    _height=this.$refs.area1.offsetHeight+this.$refs.area2.offsetHeight

                }
                if (this.scrollY > 0) {
                    return ''
                }else if(-this.scrollY>_height){
                    return Object.keys(this.cities)[this.currentIndex] ? Object.keys(this.cities)[this.currentIndex] : ''
                }else{
                    return ''
                }

            }
        },
        methods: {
            // 对父提供的刷新 better-scroll 方法
            refresh() {
                this.$refs.scrollRef.refresh()
            },
            scroll(pos) {
                this.scrollY = pos.y
                // console.log(this.scrollY)

            },
            _scrollTo(index) {
                // console.log(index)
                // 超出范围不能点击和拖动
                if (!index) {
                    return
                }
                if (index < 0) {
                    index = 0
                } else if (index > this.leftListHeight.length - 2) {
                    index = this.leftListHeight.length - 2
                }
                this.currentIndex = Number(index)
                this.$refs.scrollRef.scrollToElement(this.$refs.leftRef[index], 0)
            },
            // 计算 leftListHeight 的高度
            _caclHeight() {
                // 初始化
                let height = 0
                this.leftListHeight = []
                this.leftListHeight.push(height)
                let list = this.$refs.leftRef.children

                for (let i = 0; i < list.length; i++) {
                    height += list[i].clientHeight
                    this.leftListHeight.push(height)
                }
                // console.log(this.leftListHeight)
            },
            handleCityClick (city) {
                // this.$store.dispatch('changeCity',city)
                // this.$store.commit('changeCity',city)
                this.changeCity(city)
                this.$router.push('/')
            },
            ...mapActions(['changeCity'])
        },
        mounted () {

            setTimeout(() => {
                this._caclHeight()
            }, 20)
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._caclHeight()
                }, 20)
            },
            // 监听 scrollY 落在 leftListHeight 的哪个区间，实现高亮联动
            scrollY(newY) {
                this._height=this.$refs.area1.offsetHeight+this.$refs.area2.offsetHeight;
                //console.log('newY:'+newY+'|'+this._height)
                const leftListHeight = this.leftListHeight
                // 当滚动到顶部，newY > 0
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                // 在中间部分滚动
                 this.onOff=true
                if(this.onOff){
                    for (let i = 0; i < leftListHeight.length - 1; i++) {
                        let height1 = leftListHeight[i]
                        let height2 = leftListHeight[i + 1]
                        if (-newY >= height1 && -newY < height2) {
                            this.currentIndex = i
                            this.diff = height2 + newY
                            this.onOff=false
                        }

                    }
                }

                // 当滚动到底部，且-newY大于最后一个元素的上限
                if(-newY >=leftListHeight[leftListHeight.length]){
                    this.currentIndex = leftListHeight.length - 2
                }
                this.$emit('index',this.currentIndex)

            },
            diff(newVal) {

                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixedTitleRef.style.transform = `translate3d(0, ${fixedTop}px, 0)`
            },
            letter () {
                if (this.letter) {
                    const element = this.$refs[this.letter][0]

                    this.$refs.scrollRef.scrollToElement(element,0)
                }
            }
        }
    }
</script>


<style lang="stylus" scoped>

    .border-topbottom
        &:before
         border-color: #ccc
        &:after
         border-color: #ccc
        .border-bottom
        &:before
         border-color: #ccc
    .list
        overflow: hidden
        position: absolute
        top: 1.58rem
        left: 0
        right: 0
        bottom: 0

        .title
            line-height: .64rem
            background: #eee
            padding-left: .2rem
            color: #666
            font-size: 14px
        .button-list
            overflow: hidden
            padding: .1rem .6rem .1rem .1rem
            .button-wrapper
                float: left
                width: 33.33%
                .button
                    margin: .1rem
                    padding: .1rem 0
                    text-align: center
                    border: .02rem solid #ccc
                    border-radius: .06rem
        .item-list
            .item
                line-height: 1.2rem
                padding-left: .2rem
    .list-fixed
        position: absolute
        top: -1px
        left: 0
        width: 100%
        .fixed-title
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: 14px
            color: #333
            background: #00bcd4
</style>