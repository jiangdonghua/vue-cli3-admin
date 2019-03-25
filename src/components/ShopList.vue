<template>
    <section>
        <section v-for="(shop,index) in restaurants" :class="['index-container',`shop-${index}`]" ref="container" :key="index">
            <template v-for="(restaurant,index) in shop">
                <div class="index-shopInfo">
                    <router-link :to="'/about/'+restaurant.id" class="logo-container" target="div">
                        <div class="logo-main">
                            <img :alt="restaurant.name" class="logo-logo"
                                 :src="imgurl(restaurant.image_path)">
                        </div>
                    </router-link>
                    <div class="index-main">
                        <section class="index-line">
                            <router-link class="index-shopname"  :to="'/about/'+restaurant.id" target="h3">
                                <i v-if="restaurant.is_premium" content="品牌" class="index-premium">品牌</i>
                                <span>{{restaurant.name}}</span></router-link>
                            <ul class="index-supportWrap" @click="dislike(restaurant.id)">
                                <span class="index-omit">···</span>
                            </ul>
                        </section>
                        <router-link class="index-line"  :to="'/about/'+restaurant.id" target="section">
                            <div class="index-rateWrap">
                                <div class="Rating-wrapper index-stars">
                                    <div class="Rating-gray">
                                        <img
                                                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+">
                                    </div>
                                    <div class="Rating-actived" :style="{width: (restaurant.rating/5)*100+'%'}">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=">
                                    </div>
                                </div>
                                <span class="index-rate">{{restaurant.rating}}</span>
                                <span>月售{{restaurant.recent_order_num}}单</span></div>
                            <div class="delivery-delivery" v-if="restaurant.delivery_mode">
                                <div :content="restaurant.delivery_mode.text" :alt="restaurant.delivery_mode.text"
                                     class="delivery-icon-hollow">
                                    {{restaurant.delivery_mode.text}}
                                </div>
                            </div>
                        </router-link>
                        <router-link class="index-line"  :to="'/about/'+restaurant.id" target="section">
                            <div class="index-moneylimit">
                                <span>¥{{restaurant.float_minimum_order_amount}}起送</span>
                                <span>配送费¥{{restaurant.float_delivery_fee}}</span>
                            </div>
                            <div class="index-timedistanceWrap">
                                <span class="index-distanceWrap">{{restaurant.distance<1000?restaurant.distance+'m':(restaurant.distance/1000).toFixed(2)+'km'}}</span>
                                <span>{{restaurant.order_lead_time}}分钟</span></div>
                        </router-link>
                    </div>
                </div>
                <div class="index-activityWrap">
                    <section class="index-tagLine">
                        <span v-for="flavor in restaurant.flavors" class="mini-tag-tag index-tag">{{flavor.name}}
                            <span
                                    class="index-tagGhost mini-tag-ghost"
                                    style="color: rgb(102, 102, 102); border-color: rgb(221, 221, 221);">
                                {{flavor.name}}
                            </span>
                        </span>
                        <span class="index-recommendTag" v-if="restaurant.is_star">
                            <img src="https://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/webp/thumbnail/!20x20r/gravity/Center/crop/20x20/">
                            <span>口碑人气好店</span>
                        </span>
                    </section>
                    <span>
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgLjI1TDI4MCAwIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjEiLz48L3N2Zz4="
                         class="index-dashedline">
                    </span>
                    <section class="index-activities">
                        <div class="index-activityList">
                            <div class="index-actRow" v-for="(activity,index) in restaurant.activities"
                                 v-show="show?restaurant.activities.length:index<2">
                                 <span class="index-iconWrap">
                                    <span class="index-icon" :style="{'backgroundColor': '#'+(activity.icon_color)}">{{activity.icon_name}}</span>
                                </span>
                                <span class="index-desc">{{activity.description}}</span>
                            </div>
                        </div>
                        <div class="index-activityBtn" @click="toggleShowHide">
                            <span>{{restaurant.activities.length}}个活动</span>
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"
                                 :class="[show?'index-open':'']"></div>
                    </section>
                </div>
                <div class="index-dislikeModal" v-show="disliked" @click.self="closeModal(restaurant.id)" :key="restaurant.id" :id="restaurant.id" ref="dislikeModal" >
                    <div class="index-dislike" @click.stop.prevent="handleDislike(restaurant.id)">不喜欢</div>
                </div>
            </template>
        </section>
    </section>
</template>

<script type="text/ecmascript-6">

    export default {
        name: 'shoplist',
        props: {
            restaurants: {
                type: Array,
                required: true,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                show: false,
                disliked: false
            }
        },
        computed: {},
        methods: {
            imgurl(url) {
                let type = url.slice(-3) === 'png' ? 'png' : url.slice(-4) === 'jpeg' ? 'jpeg' : 'png';
                let param = url.substring(0, 1) + '/' + url.substring(1, 3) + '/' + url.substring(3);
                return `https://fuss10.elemecdn.com/${param}.${type}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`;
            },
            toggleShowHide() {
                this.show = !this.show;
            },
            dislike(id) {
                this.$refs.dislikeModal.map(item=>{
                    item.style.display='none'
                })
                document.getElementById(id).style.display='flex';
            },
            closeModal(id){
                document.getElementById(id).style.display='none';
            },
            handleDislike(id){
                this.closeModal(id);
                const toast = this.$createToast({
                    time: 1000,
                    type: 'txt',
                    txt: '已将商家放到最后'
                })
                toast.show()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    >>> .index-container
        position: relative
        border-bottom: .013333rem solid #eee
        border-bottom: .133333vw solid #eee
        background-color: #fff
        color: #666
        padding: .4rem 0
        list-style: none
        font-size: .293333rem
        line-height: norma

        .index-shopInfo
            display: flex
            justify-content: flex-start
            align-items: stretch
            padding: 0 .266667rem

        .logo-container
            position: relative;
            flex: none
            z-index: 0

            .logo-main
                position: relative
                width: 1.733333rem
                height: 1.733333rem

                .logo-logo
                    -webkit-box-sizing: border-box
                    box-sizing: border-box;
                    display: block
                    width: 100%
                    height: 100%
                    border-radius: .053333rem
                    border: .013333rem solid rgba(0, 0, 0, .08)

        .index-container
            flex-grow: 1
            flex-direction: column
            user-select: none
            padding-left: .266667rem

        .index-main
            flex-grow: 1
            flex-direction: column
            user-select: none
            padding-left: .266667rem

        .index-line, .index-main
            display: flex
            justify-content: space-between
            overflow: hidden

        .index-line, .index-shopname
            align-items: center

        .index-shopname
            display: flex
            margin: 0
            padding: 0
            color: #333
            font-weight: 700
            font-size: .4rem
            overflow: hidden

        .index-shopname span
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap

        .index-premium
            position: relative
            margin-right: .133333rem
            padding: .026667rem .066667rem
            color: transparent
            text-align: center
            white-space: nowrap
            font-weight: 700
            font-size: .293333rem
            font-style: normal
            line-height: normal

        .index-premium:after
            display: block
            position: absolute
            left: 0
            top: 0
            z-index: 0
            content: attr(content)
            padding: .053333rem .133333rem
            color: #6f3f15
            font-weight: 700
            font-size: .586667rem
            border-radius: .106667rem
            background-image: -webkit-linear-gradient(229deg, #fff100, #ffe339)
            background-image: linear-gradient(-139deg, #fff100, #ffe339)
            white-space: nowrap;
            -webkit-transform: scale(.5)
            transform: scale(.5)
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0

        .index-rateWrap
            display: flex
            align-items: center

        .index-rate, .index-stars
            margin-right: .106667rem

        .Rating-wrapper
            position: relative
            overflow: hidden
            display: inline-block
            vertical-align: middle

        .Rating-actived, .Rating-gray
            display: flex

        .Rating-actived img, .Rating-gray img
            width: 1.493333rem
            height: .266667rem
            flex: none;
            max-width: none

        .Rating-actived
            position: absolute
            top: 0
            left: 0
            overflow: hidden

        .delivery-delivery
            display: flex
            align-items: center

        .delivery-icon-delivery, .delivery-icon-hollow
            position: relative
            padding: 0 .04rem
            color: transparent
            white-space: nowrap
            font-size: .266667rem
            border: .013333rem solid transparent
            border-radius: .04rem
            line-height: 1.2

        .delivery-icon-delivery:after, .delivery-icon-hollow:after
            position: absolute
            left: 0
            top: 0
            z-index: 0
            white-space: nowrap
            content: attr(content)
            font-size: .533333rem
            padding: 0 .053333rem
            border-radius: .08rem
            transform: scale(.5);
            transform-origin: 0 0

        .delivery-icon-delivery:after
            color: #0097ff
            border: .013333rem solid #0097ff

        .delivery-icon-hollow:after
            color: #fff
            border: .013333rem solid #0097ff
            background-image: -webkit-linear-gradient(45deg, #0085ff, #0af)
            background-image: linear-gradient(45deg, #0085ff, #0af)

        .delivery-icon-hollow
            margin-left: .106667rem

        .mini-tag-tag
            position: relative
            font-size: .266667rem
            color: transparent
            white-space: nowrap

        .mini-tag-ghost
            position: absolute
            left: 0
            top: 0
            right: -100%
            bottom: -100%
            transform: scale(.5)
            transform-origin: 0 0
            font-size: .533333rem

        .mini-tag-ghost, .NoDataTip-wrapper
            display: flex
            align-items: center
            justify-content: center

        .index-tagGhost
            border: .026667rem solid #ddd
            border-radius: .053333rem
            padding: 0 .213333rem

        .index-tag
            padding: 0 .106667rem

        .index-recommendTag
            display: flex
            align-items: center
            border-radius: .013333rem
            font-size: .266667rem
            height: .4rem
            padding: 0 .106667rem
            color: #e8470b

        .index-recommendTag img
            margin-top: .04rem
            height: .266667rem
            width: .266667rem
            margin-right: .08rem

        .index-timedistanceWrap
            display: flex
            align-items: center
            color: #999

        .index-timedistanceWrap span:after
            margin: 0 .08rem
            color: #ddd
            content: "|"

        .index-timedistanceWrap span:last-child:after
            display: none

        .index-distanceWrap > span
            display: inline-block
            -webkit-transform: scale(.85)
            transform: scale(.85)

        .index-moneylimit
            display: flex
            align-content: center

        .index-moneylimit span + span:before
            margin: 0 .08rem;
            color: #ddd;
            content: "|"

        .index-moneylimit span:nth-of-type(2)
            overflow: hidden;
            max-width: 2.666667rem;
            text-overflow: ellipsis;
            white-space: nowrap

        .index-dashedline
            width: 100%;
            height: .013333rem
            padding-right: .266667rem

        .index-activityWrap
            padding-left: 2.266667rem

        .index-tagLine, .index-tagsSlot
            margin: .266667rem .266667rem 0 0

        .index-tagLine
            display: flex
            flex-wrap: wrap
            align-items: center

        .index-tagLine > span
            margin-right: .133333rem
            margin-bottom: .106667rem

        .index-activities
            position: relative
            justify-content: space-between
            align-content: stretch
            overflow: hidden

        .index-activityList
            flex: 1;
            padding-right: .266667rem;
            overflow: hidden


        .index-activityList > div:not(:first-child)
            margin-top: .066667rem

        .index-activityBtn
            padding: .08rem .266667rem 0 0
            color: #999
            text-align: right
            font-size: .266667rem
            line-height: 1

        .index-activityBtn span
            vertical-align: middle


        .index-activityBtn img
            width: .173333rem
            opacity: .9
            margin-left: .106667rem
            transition: all .3s ease-in-out
            transform: rotate(0deg)
            fill: currentColor
            will-change: transform
            vertical-align: middle
            position: relative
            z-index: 1

        .index-activityBtn img.index-open
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg)

        .index-actRow
            display: flex
            align-items: center
            font-size: .293333rem
            line-height: .48rem

        .index-actRow .index-iconWrap
            display: inline-block
            position: relative
            margin-right: .16rem
            height: .373333rem
            width: .373333rem
            vertical-align: middle


        .index-actRow .index-icon
            position: absolute
            left: 0
            top: 0
            z-index: 0
            height: .746667rem
            width: .746667rem
            font-size: .56rem
            color: #fff
            display: flex
            align-items: center
            justify-content: center;
            border-radius: .106667rem
            transform: scale(.5)
            transform-origin: 0 0

        .index-actRow .index-desc
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: middle

        .index-activities, .index-supportWrap
            display: flex

        .index-supportWrap
            align-items: center
            margin-left: .266667rem

        .index-supportWrap > li
            position: relative
            height: .346667rem
            width: .346667rem
            margin-left: .08rem

        .index-supportWrap > li:after
            display: flex;
            justify-content: center
            align-items: center
            position: absolute
            left: 0
            top: 0
            z-index: 0
            font-size: .533333rem
            color: #999
            content: attr(content)
            border-radius: .026667rem
            height: .693333rem
            line-height: normal
            border: .013333rem solid #ddd
            transform: scale(.5)
            transform-origin: 0 0

        .index-supportWrap > li:last-child
            margin-right: .013333rem

        .index-supportWrap > li.index-ad
            height: .293333rem
            width: .48rem

        .index-supportWrap > li.index-ad:after
            color: #ccc
            font-size: .373333rem
            width: .96rem
            height: .586667rem
            border: .013333rem solid #eee

        .index-supportWrap .index-omit
            margin-left: .266667rem
            padding: 0 .133333rem

        .index-dislikeModal
            position: absolute
            background: rgba(0, 0, 0, .5)
            width: 100%
            height: 100%
            top: 0
            left: 0
            display: flex
            align-items: center
            justify-content: center

        .index-dislike
            width: 1.333333rem
            height: 1.333333rem
            border-radius: 50%
            background: #fff
            line-height: 1.333333rem
            text-align: center
            color: #333


</style>