<template>
<div class="rating-type">
    <ul class="index-ul">
        <li
                @click="select(tag.name)"
                class="rating-tags-common "
                v-for="(tag,index) in tags"
                :class="[(tag.unsatisfied)?'rating-tags-bad':'',selectType===tag.name?'rating-tags-active':'']">
            {{tag.name}} {{tag.count>0?tag.count:''}}
        </li>
        <!--<li class="rating-tags-common">最新</li>-->
        <!--<li class="rating-tags-common">好评 167</li>-->
        <!--<li class="rating-tags-common rating-tags-bad">差评 3</li>-->
        <!--<li class="rating-tags-common">有图 15</li>-->
    </ul>
    <p class="index-onlyCont "
       @click="toggleContent"
       :class="{'onlyContTrue':onlyContent}"
    >
        <svg><use xlink:href="#select"><svg viewBox="0 0 20 20" id="select" width="100%" height="100%"><path d="M17.595 3.494A9.978 9.978 0 0 0 10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10c0-1.631-.39-3.171-1.083-4.532l-9.973 9.608-4.715-4.714 1.653-1.653 3.062 3.062 8.65-8.277z"></path></svg></use></svg>
        只看有内容的评价
    </p>
</div>
</template>

<script type="text/ecmascript-6">
    const EVENT_TOGGLE = 'toggle'
    const EVENT_SELECT = 'select'
    const ALL='全部'
    export default {
        props:{
            tags:{
                type:Array,
                default(){
                    return []
                }
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            selectType: {
                type: String,
                default: ALL
            },
        },
        data(){
            return{
                show:false,
                currentIndex:0
            }
        },
        methods:{
            select(type){
                this.$emit(EVENT_SELECT,type)
            },
            toggleContent(){
                this.$emit(EVENT_TOGGLE)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .rating-type
        background-color: #fff
        padding: .266667rem .32rem 0
        font-size: .36rem

    .index-onlyCont
        display: -webkit-flex
        display: flex
        -webkit-align-items: center
        align-items: center
        padding-left: .4rem
        padding-left: 4vw
        height: 1.066667rem
        height: 10.666667vw
        color: #666
        border-bottom: .013333rem solid #eee
        border-bottom: .133333vw solid #eee


    .index-onlyCont>svg
        fill: #e8e8e8
        padding-right: .106667rem
        padding-right: 1.066667vw
        width: .373333rem
        width: 3.733333vw
        height: .373333rem
        height: 3.733333vw


    .index-onlyCont.onlyContTrue>svg
        fill: #76d572


    .index-ul
        padding-bottom: .266667rem
        padding-bottom: 2.666667vw
        border-bottom: 1px solid #eee


    .index-1g1Lf
        background-color: #fff
        padding: .266667rem .32rem 0
        padding: 2.666667vw 3.2vw 0
        font-size: .36rem



    .rating-tags-common
        display: inline-block
        padding: 0 .24rem
        padding: 0 2.4vw
        height: .746667rem
        height: 7.466667vw
        line-height: .746667rem
        line-height: 7.466667vw
        margin: .093333rem
        margin: .933333vw
        font-size: .32rem
        border-radius: .053333rem
        border-radius: .533333vw
        color: #6d7885
        background-color: #ebf5ff


    .rating-tags-bad
        color: #aaa
        background-color: #f5f5f5


    .rating-tags-active
        color: #fff
        background-color: #0097ff


    .rating-tags-bad.rating-tags-active
        color: #fff
        background-color: #ccc


</style>