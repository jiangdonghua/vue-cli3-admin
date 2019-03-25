<template>
<cube-scroll ref="scroll" class="ratings" :options="scrollOptions">
<div class="ratings-content">
        <section class="overview-wrap">

                <div class="overview-base overview-base-left">
                    <div class="overview-base-common">
                        <p class="overview-rate-num">{{formatFloat(sRating.shop_score)}}</p>
                    </div>
                    <div class="overview-base-common overview-base-1">
                        <span>商家评分</span>
                        <Star-Easy :percent="formatFloat(sRating.shop_score/5*100)"></Star-Easy>
                    </div>
                </div>
                <div class="overview-base overview-base-right">
                    <div class="overview-base-common overview-base-2">
                        <div>
                            <span>味道</span>
                            <p>{{formatFloat(sRating.taste_score)}}</p>
                        </div>
                        <div>
                            <span>包装</span>
                            <p>{{formatFloat(sRating.package_score)}}</p>
                        </div>
                    </div>
                    <div class="overview-base-common overview-base-3">
                        <span>配送</span>
                        <p>{{formatFloat(sRating.overall_score)}}</p>
                    </div>
                </div>

        </section>
        <Rating-Type
            :tags="sTags"
            @select="onSelect"
            @toggle="onToggle"
            :only-content="onlyContent"
            :selectType="selectType"
        ></Rating-Type>
    <div class="rating-wrapper">
        <ul>
            <li class="comment-block-li" v-for="comments of computedRatings">
                <div class="comment-block-Mh">
                    <div class="index-18Ili comment-block-avatar" style="width: 0.9936rem; height:0.9936rem;">
                        <span style="background-position: 0px 4.968rem; background-size: 100%;" v-if="comments.avatar"
                              :style="{'backgroundImage':'url(//fuss10.elemecdn.com/'+imgurl(comments.avatar)+'?imageMogr/format/webp/thumbnail/!51.2x51.2r/gravity/Center/crop/51.2x51.2/)'}">
                           </span>
                        <span style="background-position: 0px 4.968rem; background-size: 100%;" v-else></span>
                    </div>
                    <div class="comment-block-content">
                        <div class="comment-block-id">
                            <h3 class="comment-block-tel">{{comments.username}}</h3><small class="comment-block-date">{{comments.rated_at}}</small>
                        </div>
                        <div class="comment-block-attitude">
                            <Star-Easy :percent="formatFloat((comments.rating/5)*100)"></Star-Easy>
                            <span class="comment-block-like" :style="ratingDescColor(comments.rating)">{{ratingDesc(comments.rating)}}</span>
                        </div>

                        <div class="comment-block-comment">
                            <template v-if="Object.keys(comments.highlights_v2).length >0" >
                               <span v-html="highlights(comments.highlights_v2,comments.rating_text)"></span>
                            </template>
                            <template v-else>{{comments.rating_text}}</template>
                        </div>
                        <div class="comment-block-reply" v-if="comments.reply">
                            {{comments.reply.content}}
                        </div>
                        <ul class="comment-block-imgs comment-block-img" v-if="comments.order_images">
                            <li v-for="order_image of comments.order_images">
                                <img :src="'//fuss10.elemecdn.com/'+imgurl(order_image.image_hash)+'?imageMogr/format/webp/thumbnail/300x/'">
                            </li>
                        </ul>
                        <div class="comment-block-loveType">
                            <svg class="comment-block-loveTypeIcon"><use xlink:href="#like"><svg viewBox="0 0 17 17" id="like" width="100%" height="100%"><path fill="#999" d="M15.744 7.319a1.705 1.705 0 0 0-1.382-.79.476.476 0 0 0-.085-.008l-2.837-.003c.216-.612.303-1.227.303-1.911 0-.444-.08-.942-.267-1.333C11.11 2.504 10.427 2 9.636 2a1.655 1.655 0 0 0-1.658 1.792c-.05 1.745-1.438 3.16-3.186 3.284v.01l-2.144.005a.569.569 0 0 0-.643.56L2 14.435a.569.569 0 0 0 .663.558H5.02a.477.477 0 0 0 .171 0l7.953.002v.003c.311 0 .628-.085.91-.26.268-.167.469-.4.602-.66a.543.543 0 0 0 .083-.176l1.239-5.39a.551.551 0 0 0 .017-.192 1.618 1.618 0 0 0-.25-1.001zm-12.627.869l1.651-.004v5.71H3.113l.004-5.706zm11.768.053a1.065 1.065 0 0 0-.002.07l-1.205 5.244-.015.028a.552.552 0 0 1-.2.224l-.006.003a.589.589 0 0 1-.313.087l-7.263-.002V7.986a4.481 4.481 0 0 0 3.21-4.163c0-.047-.001-.095-.006-.142a.55.55 0 0 1 .551-.583.74.74 0 0 1 .432.143c.16.114.3.287.402.501.099.207.16.538.16.865 0 .592-.077 1.085-.24 1.55a1.08 1.08 0 0 0 .143.997c.208.29.546.462.906.462l2.793.003.084.006a.592.592 0 0 1 .49.284c.077.12.086.247.08.332z"></path></svg></use></svg>
                            <span class="comment-block-love_Type" v-for="food_rate in comments.food_ratings">{{food_rate.rate_name}}</span>
                        </div>
                    </div>
                </div>
            </li>
           </ul>
    </div>

</div>

</cube-scroll>
</template>

<script type="text/ecmascript-6">
import StarEasy from '../../components/star/star-easy'
import RatingType from '../../components/rating-type/rating-type'
import comments from '../../assets/batch_shop_comments'
import {formatFloat,imgurl} from '../../util/util'

const ALL='全部';
const NEW='最新';
const GOOD='好评';
const BAD='差评';
const HAS_IMAGE="有图";
    export default {
        name:'ratings',
        data () {
            return {
                ratings: [],
                selectType:ALL,
                onlyContent:true,
                scrollOptions: {
                    click: false,
                    directionLockThreshold: 0
                }
            }
        },
        computed:{
            sRating(){
                return this.ratings.rating
            },
            sTags(){
                return this.ratings.tags
            },
            sComments(){
                return this.ratings.comments
            },
            computedRatings(){
                let ret=[];
               // console.log('重新计算')
                this.sComments.forEach(rating=>{
                    if(this.onlyContent&&!rating.rating_text){
                        return
                    }
                    if(this.selectType===NEW){
                        ret= this.sComments.slice(0,10)
                    }
                    if(this.selectType===ALL||this.selectType===GOOD&&rating.rating>1||this.selectType===BAD&&rating.rating<2||this.selectType===HAS_IMAGE&&(rating.order_images)){
                        ret.push(rating)
                    }
                })
                //console.log(ret)
                //console.log(ret.length)
                return ret;
            }
        },
        watch: {
            selectType () {
                this.$nextTick(() => {
                    this.$refs.scroll.refresh()
                })
            }
        },
        created(){
            this.ratings=comments;
            console.log(this.ratings)

        },
        methods:{
            fetch () {
                if (!this.fetched) {
                    this.fetched = true
                    // getRatings({
                    //     id: this.seller.id
                    // }).then((ratings) => {
                    //     this.ratings = ratings
                    // })
                }
            },
            onSelect(type) {
                this.selectType = type
            },
            onToggle() {
                this.onlyContent = !this.onlyContent
            },
            formatFloat(num){
                return formatFloat(num,1)
            },
            imgurl(url){
                return imgurl(url)
            },
            //高亮点赞的商品
            highlights(keyword,text){

                let str=[];

                for(let av in keyword){
                    //转义字符串中的特殊字符 例如（）
                    str.push(av.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"))
                }

                var re=new RegExp(str.join('|'),'g');

                if(re.exec(text)){text=text.replace(re, "<mark class='mark'>$&</mark>")}

                // Object.keys(keyword).forEach((key,index)=>{
                //     var re=new RegExp(key.replace('|'),'ig')
                //         if(re.test(text)){
                //             text=text.replace(re, "<mark class='mark'>"+key+"</mark>")
                //         }
                //
                // })
                return text
            },
            ratingDesc(rating){
                if(rating===5) {
                    return '超赞'
                }else if(rating===4){
                    return '满意'
                }else if(rating===3){
                    return '一般'
                }else{
                    return '吐槽'
                }
            },
            ratingDescColor(rating){
                if(rating===5) {
                    return 'color: rgb(255, 96, 0);'
                }else if(rating===4){
                    return 'color: rgb(251, 154, 11);'
                }else if(rating===3){
                    return 'color: rgb(251, 154, 11);'
                }else{
                    return 'color: rgb(137, 159, 188);'
                }
            },
        },
        components:{
            StarEasy,
            RatingType
        }
    }

</script>

<style lang="stylus" scoped>
    .ratings
        border-top: 1px solid #f5f5f5
        background-color: #f5f5f5
        -webkit-overflow-scrolling: touch
    .overview-wrap
        margin-bottom: .213333rem
        padding: .533333rem 0 .8rem .64rem
        background-color: #fff

    .overview-wrap,.overview-base
        display: flex

    .overview-base
        justify-content: center
        align-items: center
        color: #666

    .overview-base.overview-base-left
        width: 3.36rem

    .overview-base.overview-base-left,.overview-base.overview-base-right
        justify-content: space-between

    .overview-base.overview-base-right
        flex: 1

    .overview-base-common
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center

    .overview-base-common span
        font-size: .32rem
        margin-bottom: .133333rem

    .overview-base-common p
        font-size: .533333rem

    .overview-base-common .overview-rate-num
        font-size: 1.013333rem
        color: #ff6000


    .overview-base-common.overview-base-1
        align-items: flex-start

    .overview-base-common.overview-base-2
        display: flex
        flex-direction: row
        justify-content: space-between
        flex: 1
        padding: 0 .72rem

    .overview-base-common.overview-base-2>div
        display: flex
        flex-direction: column
        align-items: center

    .overview-base-common.overview-base-3
        width: 2.293333rem
        border-left: 1px solid #ddd

    //----------list-----------------
    .rating-wrapper
        padding: .533333rem 0.32rem .8rem .64rem
        background-color: #fff
    .comment-block-li
        padding: .4rem 0 .32rem
        padding: 4vw 0 3.2vw
        border-bottom: .013333rem solid #eee
        border-bottom: .133333vw solid #eee


    .comment-block-li:last-child
        border-bottom: none

    .comment-block-Mh
        position: relative
        padding-left: 1.066667rem
        padding-left: 10.666667vw

    .index-18Ili
        border-radius: 50%

    .index-18Ili>img,.index-18Ili>span
        border-radius: 50%
        width: 100%
        height: 100%


    .index-18Ili>span
        display: inline-block
        background: url(//shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png)

    .comment-block-comment
        color: #333
        font-size: .373333rem
        word-break: break-word
        margin: .213333rem 0
        white-space :normal


    .comment-block-comment >>>mark
        background-color: transparent
        color: #5082b1


    .comment-block-avatar
        position: absolute
        top: 0
        left: 0
        width: .8rem
        width: 8vw
        height: .8rem
        height: 8vw
        border-radius: 50%


    .comment-block-date
        font-size: .293333rem
        color: #999


    .comment-block-content
        font-size: .346667rem


    .comment-block-id
        display: -webkit-flex
        display: flex
        -webkit-align-items: center
        align-items: center
        -webkit-justify-content: space-between
        justify-content: space-between


    .comment-block-tel
        font-size: .346667rem
        margin-top: 0
        color: #333
        margin-right: .16rem
        margin-right: 1.6vw


    .comment-block-rYfog
        font-size: .266667rem
        color: #999
        vertical-align: middle


    .comment-block-reply
        position: relative
        margin: .266667rem 0
        margin: 2.666667vw 0
        padding: .266667rem
        padding: 2.666667vw
        background: #f3f3f3
        border-radius: .106667rem
        border-radius: 1.066667vw
        word-break: break-all
        white-space: normal


    .comment-block-reply:after
        content: " "
        position: absolute
        bottom: 100%
        left: .4rem
        left: 4vw
        width: 0
        height: 0
        border-style: solid
        border-width: 0 .213333rem .213333rem
        border-width: 0 2.133333vw 2.133333vw
        border-color: transparent transparent #f3f3f3


    .comment-block-loveType
        display: -webkit-flex
        display: flex
        -webkit-align-items: center
        align-items: center
        -webkit-flex-wrap: wrap
        flex-wrap: wrap
        margin-bottom: -.106667rem
        margin-bottom: -1.066667vw


    .comment-block-loveType .comment-block-love_Type
        display: -webkit-inline-flex
        display: inline-flex
        -webkit-align-items: center
        align-items: center
        height: .64rem
        height: 6.4vw
        margin-right: .106667rem
        margin-right: 1.066667vw
        margin-bottom: .106667rem
        margin-bottom: 1.066667vw
        font-size: .293333rem
        color: #6d7885
        padding: 0 .16rem
        padding: 0 1.6vw
        border-radius: .053333rem
        border-radius: .533333vw
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        background-color: #ebf5ff


    .comment-block-imgs
        margin-top: .106667rem
        margin-top: 1.066667vw
        margin-bottom: .32rem
        margin-bottom: 3.2vw


    .comment-block-imgs li
        display: inline-block
        margin: 0 .053333rem
        margin: 0 .533333vw


    .comment-block-imgs img
        width: 2.613333rem
        width: 26.133333vw
        height: 2.613333rem
        height: 26.133333vw


    .comment-block-imgs.comment-block-img img
        width: 4rem
        width: 40vw
        height: 4rem
        height: 40vw


    .comment-block-like
        font-size: .293333rem
        margin-left: .106667rem
        margin-left: 1.066667vw


    .comment-block-attitude
        display: -webkit-flex
        display: flex
        -webkit-align-items: center
        align-items: center
        margin: .16rem 0 .053333rem
        margin: 1.6vw 0 .533333vw


    .comment-block-loveTypeIcon
        width: .453333rem
        width: 4.533333vw
        height: .453333rem
        height: 4.533333vw
        margin-right: .16rem
        margin-right: 1.6vw


    .comment-intense-1KtmN
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 101
        background: rgba(0,0,0,.5)
        transition: all .2s ease-out


    .comment-intense-210O7
        background: #000


    .comment-intense-1ZVuu
        position: fixed
        top: 0
        left: 0
        width: 1.893333rem
        width: 18.933333vw
        height: 1.893333rem
        height: 18.933333vw
        background: transparent
        transition: all .32s


    .comment-intense-3OjQa
        top: 0!important
        left: 0!important
        width: 100%
        height: 100%


    .comment-intense-3anpN
        width: 100%
        position: relative
        left: 50%
        top: 50%
        -webkit-transform: translate(-50%,-50%)
        transform: translate(-50%,-50%)


    .comment-intense-Gu5PO
        transition: all .35s
        display: block


    .comment-intense-3uhfy
        left: 0
        top: 0


    .comment-intense-3-TVc
        position: absolute
        bottom: .466667rem
        bottom: 4.666667vw
        left: .266667rem
        left: 2.666667vw
        font-size: .266667rem
        color: #fff


    .comment-intense-1nZDy
        position: fixed
        right: .266667rem
        right: 2.666667vw
        top: .266667rem
        top: 2.666667vw
        color: #fff
        width: .533333rem
        width: 5.333333vw
        height: .533333rem
        height: 5.333333vw


</style>