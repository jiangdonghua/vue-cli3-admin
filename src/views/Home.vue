<template>
    <div class="home" style="" ref="home">
        <header class="index-header">
            <div class="index-header-wrap" >

                <router-link to="/city" role="button" class="index-2S5Ah_0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31" class="index-okfdP_0">
                        <path fill="#FFF" fill-rule="evenodd"
                              d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path>
                    </svg>
                    <span class="index-header-site" data-spm-anchor-id="a2ogi.12117543.0.i0">{{city}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" class="index-2iXz3_0">
                        <path fill="#FFF" fill-rule="evenodd"
                              d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path>
                    </svg>
                </router-link>
            </div>
        </header>
        <div role="button" class="search"><a class="content">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill-opacity=".38"
                      d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
            </svg>
            <span>搜索旺旺商家、商品名称</span></a></div>
        <cube-slide :data="mainEntries" v-if="mainEntries" :auto-play="false" class="foodEntry">
            <cube-slide-item v-for="(page, index) in pages">

                    <template v-for="item in page">
                    <a :href="item.url">
                        <div class="container">
                            <img :src="item.images"/>
                        </div>
                        <span class="title">{{item.name}}</span>
                    </a>
                    </template>

            </cube-slide-item>
        </cube-slide>
        <div class="wrapper">
            <section id="activity-lego" class="activity-lego">
                <div>
                    <div class="activity-lego-wrap">
                        <h3 class="activity-lego-title">品质套餐</h3>
                        <div class="activity-lego-desc">搭配齐全吃得好</div>
                        <div class="activity-lego-link"><!---->立即抢购 &gt;
                        </div>
                        <img src="https://fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?imageMogr/format/webp/thumbnail/!282x188r/gravity/Center/crop/282x188/">
                    </div><!----><!---->
                </div>
            </section>
            <div class="sVip">
                <div class="sVipWrap">
                    <img alt="" class="" :src="vipEntries.images">
                    <span class="description">{{vipEntries.description}}</span>
                    <span class="title"><b></b>每月领20元红包
                        <!--{{  this.vipEntriesMore.title.text}}-->
                    </span>
                </div>
                <a href="javascript:" class="link"><b class=""></b>立即开通
                    <!--|| {{this.vipEntriesMore.bonus_title.text}}-->
                </a>
            </div>
            <cube-slide :data="items" v-if="items" class="banner"/>
        </div>
        <div id="shoplist-title" class="shoplist-title" style="">推荐商家</div>

        <div class="home-filter">
            <aside class="filter">
                <div class="filter-header">
                    <a  :class="['filter-nav',sortShow?'active':'']" @click="handleOpen('sortShow',
                'selectShow')">
                        <span>综合排序</span>
                        <svg data-v-a5cc4024="" viewBox="0 0 72 32" class="dropdown-icon">
                            <path data-v-a5cc4024="" d="M36 32l36-32h-72z"></path>
                        </svg>
                    </a>
                    <a :class="['filter-nav',sortShow?'active':'']">
                        <span>距离最近</span>
                    </a>
                    <a  :class="['filter-nav',sortShow?'active':'']">
                        <span>品质联盟</span>
                    </a>
                    <a  :class="['filter-nav',selectShow?'active':'']" @click="handleOpen(
                'selectShow','sortShow')">
                        <span>筛选</span>
                        <svg viewBox="0 0 26 26" id="more-filter" width="100%" height="100%"
                             class="filter-nav-more__icon">
                            <path d="M9.001 15.009V23a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7.981l7.788-10.01a1 1 0 0 0-1.578-1.228l-8 10.28a1 1 0 0 0-.21.615V22h-4v-7.324a1 1 0 0 0-.2-.6L4.001 5h14a1 1 0 0 0 0-2H2a1 1 0 0 0-.8 1.6L9 15.009z"></path>
                        </svg>
                    </a>
                </div>
            </aside>
        </div>
        <shopList class="shoplist" :restaurants="restaurants"></shopList>
        <p v-show="loading" class="loading">
            <cube-loading></cube-loading>
            加载中...
        </p>
        <div class="noData" v-if="!next">{{message}}</div>
        <div class="filtermodal" style="" data-spm-anchor-id="a2ogi.12117543.0.i5" v-show="sortShow"  @click="handleClose" ></div>
        <section  :class="['filter-extend' ,'filter-sort' ,sortShow?'open':'']" @click="handleClose" v-show="sortShow">
            <ul><li v-for="item in inside_sort_filter"><span :value="item.value">{{item.name}}</span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkFJREFUSA3tlbtrVFEQxr/JusEkdqYR0mU3EGyECCKCIEIghIgSfBSCCkbwWqTQykoQ41+QbHaRRC0MSDCgjeADO0ERQRBB10YsU/gC89jd8ZuNez17H7gmN2BxT7Fnzpw587vzzbl3gXSkCqQKJKSAJJQnlKb3huawjDkCZj94KIiIukGbAs5P636t4h5J2w1GyHz5ghx1wW3uIgm7b0pPaQ2PHOg3tGEimDsxsKpKbkonqoqbqmivgwRLksFI+by8DoITkXqgqJ1fq7hN4GgDwMQVajxa9uR+w+fOW9zFeuz+ou74UoEl3+2fFyilPPs+BmpxkVLnpnVvflLHTT4/WYSRL+mu1QpecOsPlAseukTorYgjviuU2F4DWcFzytbNqCfSjtPlMfnsn/htsJ+HoLjDS9Tl7ongOuW97Pqi7FDFslzvlUFtHNRVvOkr6Im15dpvb0Ev8sEWglCWWmoFallCFeeLuqdWxVNW0+nCaM9JB8bxE9cIHAvsWaL5kx6OXxGpBfei1iGwBeUmdYTdXSA84x6ijCv+q9K0gcdbuzH89hib1OIISW3n+JV5wMkL5oiBviT0yL9ALW8k2DY+elLidNXsuEEF3mW7METoj7iYOH+k1G4wb+8MKz3j+uq24JNksS/qxodiIxyxFTdie/pxjk/3sLG2mZUu8sszuF5oPYebMM7eeVe3LS3iGS/bAKHfeasPsBWv4uJb8f+1YktiPezIYth6mhEc3ii0lQdriuGfQbbJkS5SBf5HBX4Bvl6o9YDxgOsAAAAASUVORK5CYII=" :alt="item.name" class="selected">
            </li>
               </ul>
        </section>
        <div class="morefilter-3-5h6_0" v-show="selectShow" @click.self="handleClose">
            <dl><dt>商家服务 (可多选)</dt><dd><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><img class="morefilter-2JyrM_0" src="https://fuss10.elemecdn.com/b/9b/45d2f6ff0dbeef3a78ef0e4e90abapng.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/"><span>蜂鸟专送</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><img class="morefilter-2JyrM_0" src="https://fuss10.elemecdn.com/6/7c/417ba499b9ef8240b8014a453bf30png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/"><span>品牌商家</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><img class="morefilter-2JyrM_0" src="https://fuss10.elemecdn.com/c/93/ded991df780906f7471128a226104png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/"><span>新店</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><img class="morefilter-2JyrM_0" src="https://fuss10.elemecdn.com/2/cd/444d002a94325c5dff004fb3b9505png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/"><span>食安保</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><img class="morefilter-2JyrM_0" src="https://fuss10.elemecdn.com/3/d4/5668ffc03151826f95b75249bea31png.png?imageMogr/format/webp/thumbnail/!24x24r/gravity/Center/crop/24x24/"><span>开发票</span></div></div></dd></dl><dl><dt>优惠活动 (单选)</dt><dd><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>首单立减</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>门店新客立减</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>满减优惠</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>下单返红包</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>进店领红包</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>配送费优惠</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>赠品优惠</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>特价商品</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>品质联盟红包</span></div></div></dd></dl><dl><dt>人均消费</dt><dd><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>¥20以下</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>¥20 - ¥40</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>¥40 - ¥60</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>¥60 - ¥80</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>¥80 - ¥100</span></div></div><div class="morefilter-3GXUR_0"><div class="morefilter-l3S4A_0"><!----><span>¥100以上</span></div></div></dd></dl>
            <div class="morefilter-2DLty_0"><span class="morefilter-39NFb_0">清空</span><span class="morefilter-16ilq_0 morefilter-2Dfps_0">确定</span></div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {homeBanner, foodEntries, batch_filter, restaurants} from '../request/api'
    import shopList from '../components/ShopList';
    import {mapGetters} from 'vuex'
    export default {
        name: "home",
        components: {
            shopList
        },
        data() {
            return {
                foodEntries: [],
                items: [],
                mainEntries: [],
                vipEntries: [],
                vipEntriesMore: {},
                batch_filter: [],
                restaurants: [],
                inside_sort_filter:[],
                loading: false,
                next: true,
                page: 1,
                message: '',
                sortShow:false,
                selectShow:false
            }
        },
        created() {
            this.getHomeBanner();
            this.getFoodEntries();
            this.get_batch_filter();
            this.getRestaurants(this.page);
        },
        mounted() {
            window.addEventListener('scroll', () => {
                // let scrollTop = document.documentElement.scrollTop ||
                //     document.body.scrollTop ||
                //     document.querySelector('.home').scrollTop;
                //console.log(scrollTop);
                // console.log(this.getScrollTop())
                //console.log(this.getScrollTop() + this.getWindowHeight()+100,this.getScrollHeight());
                if (this.getScrollTop() + this.getWindowHeight() + 50 > this.getScrollHeight()) {
                    console.log('到底')
                    if (this.next) {
                        this.next = false;
                        this.page += 1;
                        this.getRestaurants(this.page)
                    } else {

                    }
                }
            }, true);
        },
        computed:{
            ...mapGetters(['city']),
            pages(){
                let pages=[];
                this.mainEntries.forEach((item,index)=>{
                    // item%10==0
                    const page=Math.floor(index/10);
                    if(!pages[page]){
                        pages[page]=[]
                    }
                    pages[page].push(item)
                })
                //console.log(pages)
                return pages;
            }
        },
        methods: {

            getHomeBanner() {
                homeBanner().then(res => {
                    this.items = res
                })
            },
            getFoodEntries() {
                foodEntries().then(res => {
                    this.mainEntries = res[0].entries;
                    this.vipEntries = res[1].entries[0];
                    this.vipEntriesMore = JSON.parse(this.vipEntries.more)
                })
            },
            get_batch_filter() {
                batch_filter().then(res => {
                    this.batch_filter = res;
                    const {bar, outside} = this.batch_filter;
                    const {inside_sort_filter, outside_filters, outside_sort_filter} = outside;
                    this.inside_sort_filter=inside_sort_filter;
                })
            },
            getRestaurants(page) {
                this.next = false;
                this.loading = true;
                restaurants({page: page}).then(res => {
                    this.loading = false;
                    this.next = res.data.has_next;
                    this.message = res.message;
                    this.restaurants.push(...res.data.items);
                })
            },
            handleOpen(type,type2){
                console.log(type,type2)
                this[type2]=false;
                const currentY = document.documentElement.scrollTop || document.body.scrollTop;
                document.querySelector('body').style.height=2*this.getWindowHeight()+'px';
                document.querySelector('.home-filter').style.position="fixed";
                document.querySelector('.home-filter').style.width="100%";

                this.$nextTick(()=>{
                    this.scrollAnimation(currentY, 600)
                })
                this[type]=!this[type];
                document.querySelector('body').style.height='100%';
            },
            handleClose(){
               document.querySelector('body').style.height='100%';
                document.querySelector('.home-filter').style.position="sticky";
               this.sortShow=false
                this.selectShow=false

            },
            scrollAnimation(currentY, targetY) {
                // 获取当前位置方法
                // const currentY = document.documentElement.scrollTop || document.body.scrollTop

                // 计算需要移动的距离
                let needScrollTop = targetY - currentY
                let _currentY = currentY
                setTimeout(() => {
                    // 一次调用滑动帧数，每次调用会不一样
                    const dist = Math.ceil(needScrollTop / 10)
                    _currentY += dist
                    window.scrollTo(_currentY, currentY)
                    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
                    if (needScrollTop > 10 || needScrollTop < -10) {
                        this.scrollAnimation(_currentY, targetY)

                    } else {
                       window.scrollTo(_currentY, targetY)


                    }

                }, 1)

            },

            // Math.min Math.max
            getScrollTop() {
                var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                if (document.body) {
                    bodyScrollTop = document.body.scrollTop;
                }
                if (document.documentElement) {
                    documentScrollTop = document.documentElement.scrollTop;
                }
                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                return scrollTop;
            },
            getScrollHeight() {
                var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                if (document.body) {
                    bodyScrollHeight = document.body.scrollHeight;
                }
                if (document.documentElement) {
                    documentScrollHeight = document.documentElement.scrollHeight;
                }
                scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                return scrollHeight;
            },
            getWindowHeight() {
                var windowHeight = 0;
                if (document.compatMode == "CSS1Compat") {
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    windowHeight = document.body.clientHeight;
                }
                return windowHeight;
            },
        }

    };
</script>
<style lang="stylus" scoped>
        .home

            .index-header
                padding: .266667rem .373333rem 0
                background-image: -webkit-gradient(linear, left top, right top, from(#0af), to(#0085ff))
                background-image: -webkit-linear-gradient(left, #0af, #0085ff)
                background-image: linear-gradient(90deg, #0af, #0085ff)
                color: #fff

            .index-header-site
                font-size: 14px
                color: #fff
                margin :0 4px
            .index-3YRkT_0
                padding-top: .853333rem


            .index-header-wrap
                justify-content: space-between
                height: .92rem


            .index-header-wrap, .index-2S5Ah_0
                display: flex;
                align-items: center

            .index-2S5Ah_0
                width: 60%;
                font-weight: 700

            .index-okfdP_0
                width: .346667rem
                height: .413333rem
                fill: #fff


            .index-2iXz3_0
                width: .186667rem
                height: .093333rem
                fill: #fff

            .search
                position: -webkit-sticky
                position: sticky
                z-index: 999
                top: 0
                padding: .2rem .373333rem
                margin: -.013333rem 0

            .search, .search:after, .search:before
                background-image: -webkit-gradient(linear, left top, right top, from(#0af), to(#0085ff))
                background-image: -webkit-linear-gradient(left, #0af, #0085ff)
                background-image: linear-gradient(90deg, #0af, #0085ff)


            .search:after, .search:before
                content: ""
                position: absolute
                width: 100%
                height: 2px
                left: 0


            .search:before
                top: -1px


            .search:after
                bottom: -1px


            .search > .content
                display: flex
                width: 100%
                height: .96rem
                justify-content: center;
                align-items: center;
                border-radius: .026667rem;
                background: #fff;
                color: #999;
                font-size: .373333rem


            .search > .content > svg
                display: inline-block
                width: .426667rem
                height: .426667rem
                margin-right: .133333rem


            .search > .content > span
                font-family: simsun


            .wrapper
                padding 0 10px

            >>> .banner
                margin: 0 auto
                margin-top: 5px
                border-radius: 3px
                width: 100%
                height: 2.346667rem
                position: relative

                .cube-slide-item > a > img
                    width: 100%
                    height: auto
                    margin: 0 auto

            .foodEntry
                height: 4.72rem

                >>> .cube-slide-item
                    & > a
                        position: relative
                        float: left
                        width: 20%
                        height: auto
                        text-align: center
                        margin-top: .293333rem

                    .container
                        position: relative
                        display: inline-block
                        width: 45px
                        height: 45px

                        img
                            width: 100%

                    .title
                        display: block
                        margin-top: 5px
                        color: #666
                        font-size: 12px

            >>> .activity-lego

                & > div
                    display: flex
                    background: -webkit-gradient(linear, left bottom, left top, color-stop(5%, #f4f4f4), color-stop(95%, #fafafa))
                    background: -webkit-linear-gradient(bottom, #f4f4f4 5%, #fafafa 95%)
                    background: linear-gradient(0deg, #f4f4f4 5%, #fafafa 95%)
                    margin-bottom: 0.08rem

                    .activity-lego-wrap
                        position: relative
                        height: 2.993rem
                        flex: 1
                        padding: .32rem 0 0 .4rem
                        box-sizing: border-box

                        .activity-lego-title
                            font-size: .453333rem
                            font-weight: 700
                            margin-bottom: .133333rem
                            color: #333

                        .activity-lego-desc
                            font-size: .346667rem
                            color: #777
                            margin-bottom: .24rem

                        .activity-lego-link
                            font-size: .32rem
                            color: #af8260
                            font-weight: 700

                        img
                            position: absolute
                            top: .24rem
                            right: .373333rem
                            width: 3.76rem
                            height: 2.506667rem

            >>> .sVip
                height: 1.066667rem
                margin-bottom: .106667rem
                border-radius: .053333rem
                background-image: -webkit-gradient(linear, left top, right top, from(#ffefc4), to(#f3dda0))
                background-image: -webkit-linear-gradient(left, #ffefc4, #f3dda0)
                background-image: linear-gradient(90deg, #ffefc4, #f3dda0)
                background-size: 100%
                display: flex
                align-items: center
                justify-content: space-between
                padding: 0 .266667rem 0 .4rem
                color: #644f1b
                font-size: .293333rem

                .sVipWrap
                    display: flex
                    align-items: center

                    img
                        max-width: 100%
                        width: .453333rem
                        height: .453333rem
                        margin-right: .2rem

                    .description
                        font-size: .373333rem
                        font-weight: 700

                    .title
                        color: #644f1b
                        font-size: .293333rem

                        &::before
                            content: "\B7"
                            margin: 0 .106667rem
                            font-weight: 700

                .link
                    height: 1.066667rem
                    color: #644f1b
                    display: flex
                    align-items: center

                    &::after
                        display: block
                        content: "";
                        width: .106667rem
                        height: .106667rem
                        border-right: .026667rem solid #8c632b
                        border-bottom: .026667rem solid #8c632b
                        transform: rotate(-45deg)
                        margin-left: .106667rem

            >>> .shoplist-title
                display: flex
                align-items: center
                justify-content: center
                height: .96rem
                font-size: .4rem
                color: #000

            .shoplist-title:after, .shoplist-title:before
                display: block
                content: ""
                width: .533333rem
                height: .026667rem
                background-color: #999

            .shoplist-title:before
                margin-right: .346667rem

            .shoplist-title:after
                margin-left: .346667rem

            >>> .home-filter
                position: -webkit-sticky
                position: sticky
                top: 1.333rem
                z-index: 100

                .filter
                    position: relative
                    line-height: 1.04rem
                    z-index: 101
                    height: 1.066667rem

                    .filter-header
                        position: absolute
                        top: 0
                        bottom: 0
                        width: 100%
                        height: 1.053333rem
                        display: flex
                        z-index: 4
                        background-color: #fff

                    .filter-nav
                        flex: 1
                        text-align: center
                        color: #666
                        position: relative
                        font-size: .373333rem
                        z-index: 101
                        white-space: nowrap
                        overflow: hidden
                        text-overflow: ellipsis

                        &.active
                            color: #000
                            font-weight: 800

                            .dropdown-icon
                                fill: currentColor

                        &.open
                            color: #3190e8
                            font-weight: 700

                            .dropdown-icon
                                fill: currentColor

                        .dropdown-icon
                            width: .16rem
                            height: .08rem
                            margin-left: .133333rem
                            margin-bottom: .053333rem
                            fill: #333
                            will-change: transform
                            -webkit-transition: -webkit-transform .3s
                            transition: -webkit-transform .3s
                            transition: transform .3s
                            transition: transform .3s, -webkit-transform .3s

                        .filter-nav-more__icon
                            margin-left: .053333rem
                            width: .346667rem
                            height: .346667rem
                            fill: #666

            .content-scroll-wrapper
                flex: 1
                position: relative

                .content-scroll-list-wrap
                    height: 100%
                    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
                    position: absolute
                    top: 0
                    bottom: 0
                    overflow: hidden

                    .imgs-wrapper
                        .imgs-item
                            > img
                                width: 100%

            .cube-pulldown-wrapper
                text-align: center

                .before-trigger
                    height: auto
                    font-size: 30px
                    align-self: flex-end

                    span
                        display: inline-block
                        line-height: 1
                        transition: all 0.3s
                        color: #666
                        padding: 15px 0

                        &.rotate
                            transform: rotate(180deg)

                .after-trigger
                    flex: 1
                    margin: 0

                    .text-wrapper
                        margin: 0 auto
                        margin-top: 14px
                        padding: 5px 0
                        color: #498ec2
                        background-color: #d6eaf8

                    .cube-loading-spinners
                        margin: auto

            .success-enter-active, .success-leave-active
                transition: width .5s

            .success-enter, .success-leave-to
                width: 70%

            .success-enter-to, .success-leave
                width: 100%

            >>> .loading
                display: flex
                align-items: center
                justify-content: center
                border-top: 1px dashed #ccc
                padding: 10px 0

            .cube-loading
                .cube-loading-spinners
                    margin 0 auto

            >>>.noData
                display: flex
                align-items: center
                justify-content: center
                padding: 10px 0

            .filter-extend
                left: 0
                right: 0
                top: 1.33rem
                border-top: 1px solid #ddd
                position: absolute
                max-height: 0
                background-color: #fff
                -webkit-transition: all .2s ease-in-out
                transition: all .2s ease-in-out
                visibility: hidden
                overflow: auto
                opacity: 0
                z-index: 4


            .filter-extend.open
                opacity: 1
                visibility: visible
                max-height: 1500%
            .morefilter-3-5h6_0
                position :absolute
                top:2.3rem
                overflow: auto
                bottom 0
                z-index :5
                padding: 0 .266667rem
                background: #fff
                -webkit-overflow-scrolling: touch
                line-height: normal


            .morefilter-3-5h6_0 dl
                margin: .266667rem 0
                overflow: hidden


            .morefilter-3-5h6_0 dt
                margin-left: 1%
                margin-bottom: .2rem
                color: #666
            .morefilter-3-5h6_0 dd
                -webkit-flex-wrap: wrap
                -ms-flex-wrap: wrap
                flex-wrap: wrap
                background: #fff
                position: relative


            .morefilter-3-5h6_0 dd,.morefilter-3GXUR_0
                display: flex


            .morefilter-3GXUR_0
                align-items: center
                justify-content: center
                flex: 0 0 31.33%
                height: .933333rem;
                font-size: .346667rem
                margin: .08rem 1%
                background: #fafafa
            .morefilter-3GXUR_0 .morefilter-l3S4A_0
                white-space: nowrap

            .morefilter-3GXUR_0 span
                margin-left: 2%;
                vertical-align: middle

            .morefilter-3GXUR_0 .morefilter-2JyrM_0
                width: .346667rem
                height: .346667rem
                vertical-align: middle
                margin-right: .08rem

            .morefilter-3GXUR_0.morefilter-3emCs_0
                font-weight: 700
                color: #3190e8
                background-color: #edf5ff


            .morefilter-2DLty_0
                display: flex
                justify-content: space-around;
                align-items: center;
                background-color: #fafafa;
                box-shadow: 0 -.026667rem .053333rem 0 #ededed
                line-height: 1.146667rem


            .morefilter-2DLty_0 .morefilter-16ilq_0,.morefilter-2DLty_0 .morefilter-39NFb_0
                font-size: .426667rem
                text-align: center
                text-decoration: none
                flex: 1


            .morefilter-2DLty_0 .morefilter-39NFb_0
                background-color: #fff
                color: #ddd


            .morefilter-2DLty_0 .morefilter-39NFb_0.morefilter-2Dfps_0
                color: #333


            .morefilter-2DLty_0 .morefilter-16ilq_0
                opacity: .5
                color: #fff
                background-color: #00d762
                border: .013333rem solid #00d762

            .morefilter-2DLty_0 .morefilter-16ilq_0.morefilter-2Dfps_0
                opacity: 1
                margin-left: 15px


            .morefilter-2DLty_0 i,.morefilter-2DLty_0 i:after,.morefilter-2DLty_0 i:before
                display: inline-block
                width: .133333rem
                height: .133333rem
                border-radius: 50%
                background: #fff
                opacity: .8
                position: relative


            .morefilter-2DLty_0 i:after,.morefilter-2DLty_0 i:before
                content: ""
                position: absolute
                top: 0
            .morefilter-2DLty_0 i:before
                left: -.266667rem
                opacity: .5

            .morefilter-2DLty_0 i:after
                right: -.266667rem
                opacity: 1
            ul
                list-style: none;
                margin: 0;
                padding: 0


        .filter-sort
                padding-top: .213333rem
                padding-bottom: .32rem
                font-size: .373333rem
                color: #333


            .filter-sort li
                position: relative
                padding-left: .533333rem
                line-height: 1.066667rem

            .filter-sort li.active
                color: #3190e8
                font-weight: 700

            .filter-sort li.active .selected
                display: block

            .filter-sort .selected
                position: absolute
                right: .373333rem
                top: 50%
                width: .4rem
                height: .4rem
                display: none
                -webkit-transform: translateY(-50%)
                transform: translateY(-50%)

</style>
