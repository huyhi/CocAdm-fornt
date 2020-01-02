<template>
    <div class="daily-statistic-content">
        <div>
<!--            player 信息框-->
        </div>
        <el-tabs v-model="activeTabName">
            <el-tab-pane label="进攻获胜次数" name="attackWins">
            </el-tab-pane>
            <el-tab-pane label="捐兵" name="donations">
            </el-tab-pane>
            <el-tab-pane label="收兵" name="donationsReceived">
            </el-tab-pane>
            <el-tab-pane label="抓金" name="gold">
            </el-tab-pane>
            <el-tab-pane label="抓水" name="elixir">
            </el-tab-pane>
            <el-tab-pane label="打黑" name="darkElixir">
            </el-tab-pane>
            <highcharts
                :options="hChartOptions"
                v-loading="loading">
            </highcharts>
        </el-tabs>
    </div>

</template>

<script>
    import {apiMap} from "../../../config/api-conf"

    export default {
        data () {
            let dailyStatisticData = {
                attackWins: [],
                donations: [],
                donationsReceived: [],
                gold: [],
                elixir: [],
                darkElixir: []
            }
            let dailyStatisticMap =  new Map([
                [
                    'attackWins', {
                        title: '进攻获胜次数',
                        dataSource: dailyStatisticData.attackWins
                    }
                ],
                [
                    'donations', {
                        title: '捐兵',
                        dataSource: dailyStatisticData.donations
                    }
                ],
                [
                    'donationsReceived', {
                        title: '收兵',
                        dataSource: dailyStatisticData.donationsReceived
                    }
                ],
                [
                    'gold', {
                        title: '抓金',
                        dataSource: dailyStatisticData.gold
                    }
                ],
                [
                    'elixir', {
                        title: '抓水',
                        dataSource: dailyStatisticData.elixir
                    }
                ],
                [
                    'darkElixir', {
                        title: '打黑',
                        dataSource: dailyStatisticData.darkElixir
                    }
                ],
            ])
            return {
                playerTag: this.$route.params.playerTag,
                queryParams: this.$route.query,
                api: apiMap.dailyStatistic,
                activeTabName: '',
                loading: true,
                hChartOptions: {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: []
                    },
                    yAxis: {
                    },
                    series: [
                        {
                            data: [],
                            showInLegend: false
                        }
                    ]
                },
                dailyStatisticMap,
                dailyStatisticData,
                datetimeTag: []
            }
        },
        created() {
            const self = this
            self.$axios.get(`${self.api}${self.playerTag}`, {
                params: self.queryParams
            }).then((res) => {
                res.data.data.forEach((item) => {
                    self.dailyStatisticData.attackWins.push(item.attackWins)
                    self.dailyStatisticData.donations.push(item.donations)
                    self.dailyStatisticData.donationsReceived.push(item.donationsReceived)
                    self.dailyStatisticData.gold.push(item.gold)
                    self.dailyStatisticData.elixir.push(item.elixir)
                    self.dailyStatisticData.darkElixir.push(item.darkElixir)
                    self.datetimeTag.push(item.datetimeTag)
                })
                self.activeTabName = 'attackWins'
                self.hChartOptions.xAxis.categories = self.datetimeTag
                self.loading = true
            }).catch(err => {
                self.showHttpErrorMsg()
            })
            console.log(self.dailyStatisticData)
        },
        watch: {
            activeTabName: function (val) {
                console.log(`watched:  ${typeof(val)} : ${val}`)
                if (val !== '0') {
                    let mapped = this.dailyStatisticMap.get(val)
                    this.hChartOptions.title.text = mapped.title
                    this.hChartOptions.series[0].data = mapped.dataSource
                }
            }
        },
        methods: {
            showHttpErrorMsg() {
                this.$message({
                    showClose: true,
                    message: '后端服务异常，请刷新重试或联系管理员',
                    type: 'error',
                    duration: 7000
                })
            }
        }
    }
</script>

<style scoped>
    .daily-statistic-content{
        margin-top: 10em;
    }
</style>

<style>
    .el-tabs__item{
        outline: none;
        padding: 0 3em 0 3em;
    }
</style>
