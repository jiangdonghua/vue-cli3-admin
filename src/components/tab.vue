<template>
    <div>
        <cube-tab-bar v-model="selectedLabel"
                      show-slider
                      :use-transition="false"
                      ref="tabBar"
                      :data="tabs">
        </cube-tab-bar>
        <div class="slide-wrapper" style="height: 100%;">
            <!--<template v-for="tab in tabs">-->
                <!--<component ref="component" :is="tab.component" :data="tab.data"></component>-->
            <!--</template>-->
            <cube-slide
                    ref="slide"
                    :loop="false"
                    :initial-index="index"
                    :auto-play="false"
                    :show-dots="false"
                    :options="slideOptions"
                    @scroll="onScroll"
                    @change="onChange">
               <cube-slide-item v-for="tab in tabs">
                   <component ref="component" :is="tab.component" :data="tab.data" @disabledScroll="disabled" ></component>
               </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: 'tab',
        props: {
            tabs: {
                type: Array,
                default() {
                    return []
                }
            },
            initialIndex: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                index: this.initialIndex,
                slideOptions: {
                    listenScroll: true, // 是否监控scroll事件
                    probeType: 3, // 0 不派发scroll事件，1：非实时；2：滑动过程中；3：不仅在屏幕滑动的过程中，而且momentum 滚动动画运行过程中实时派发
                    directionLockThreshold: 0,
                    stopPropagation:true
                }
            }
        },
        computed: {
            selectedLabel: {
                get() {
                    return this.tabs[this.index].label
                },
                set(newVal) {
                    this.index = this.tabs.findIndex((value) => {
                        return value.label === newVal
                    })
                }
            }
        },
        mounted(){
            this.onChange(this.index)
        },
        methods:{
            onScroll(pos) {
                const tabBarWidth = this.$refs.tabBar.$el.clientWidth
                const slideWidth = this.$refs.slide.slide.scrollerWidth
                const transform = -pos.x / slideWidth * tabBarWidth
                this.$refs.tabBar.setSliderTransform(transform)
            },
            onChange(current) {
                this.index = current
              //  获取数据
                const instance = this.$refs.component[current]
                console.log(instance)
                if (instance && instance.fetch) {
                    instance.fetch()
                }
            },
            // refresh(){
            //     console.log('refe')
            //     this.$refs.slide.slide.refresh();
            // },
            disabled(status){
                console.log(status)

                if(status){
                    this.$refs.slide.slide.disable() //里面滚动时禁用slide 之后enable
                }else{
                    this.$refs.slide.slide.enable() //里面滚动时禁用slide 之后enable
                }
                this.$refs.slide.slide.refresh();
            }
        }
    }
</script>

<style lang="stylus" scoped>
>>>.cube-tab
    font-size: 0.4rem
>>>.cube-tab-bar
    background-color :#fff
    position: sticky
    top: 0
    z-index: 2
/*>>>.cube-slide-item*/
    /*position: relative;*/

</style>