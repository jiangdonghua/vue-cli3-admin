<template>
    <div>
        <city-header></city-header>
        <city-search :cities="cities"></city-search>
        <city-list
                :cities="cities"
                :hot="hotCities"
                :letter="letter"
                @index="curIndex"
        ></city-list>
        <city-alphabet
                :cities="cities"
                @change="handleLetterChange"
                :current-index="currentIndex"
        ></city-alphabet>
    </div>
</template>

<script >
    import CityData from '../assets/city'
    import CityHeader from '../components/city/Header'
    import CitySearch from '../components/city/Search'
    import CityList from '../components/city/List'
    import CityAlphabet from '../components/city/Alphabet'
    export default {
        name: 'City',
        components: {
            CityHeader,
            CitySearch,
            CityList,
            CityAlphabet
        },
        data () {
            return {
                cities: {},
                hotCities: [],
                letter: '',
                currentIndex:0
            }
        },
        methods: {
            getCityInfo () {
                this.handleGetCityInfoSucc(CityData)
            },
            handleGetCityInfoSucc (res) {
                    const data = res
                 //console.log(data.ret&&data.data)
                if(data.ret&&data.data){
                    this.cities = data.data.cities
                    this.hotCities = data.data.hotCities
                }

            },
            handleLetterChange (letter) {
               // console.log(letter)
                this.letter = letter
            },
            curIndex(index){
                this.currentIndex=index
            }
        },
        mounted () {
            this.getCityInfo()
        }
    }
</script>


<style lang="stylus" scoped>
html
    font-size :50px!important

</style>