<template>
    <div>
        <el-page-header @back="goBack" content="日常数据统计图表">
        </el-page-header>
        <div class="platerInformation">
            <p>LV: {{ playerInformation.expLevel }} </p>
            <p>姓名 {{playerInformation.name}}</p>
            <p>捐兵 {{playerInformation.donations}}</p>
            <p>收兵 {{playerInformation.donationsReceived}}</p>
            <p>收兵占总体比例 {{playerInformation.donationRatio}}</p>
        </div>
        <div class="daily-statistic-content">
            <div class="selectors">
                <el-date-picker
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    v-model="queryParams.timeTuple"
                    align="right">
                </el-date-picker>
                <el-select
                    v-model="queryParams.intervalType"
                    placeholder="粒度(日或小时)">
                    <el-option label="小时" value="1"></el-option>
                    <el-option label="日" value="2"></el-option>
                </el-select>
                <el-input-number
                    v-model="queryParams.intervalStep"
                    :step="step"
                    step-strictly
                    @click="refreshData">
                </el-input-number>
                <el-button type="primary"
                    @click="handleClick">刷新数据</el-button>
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
    </div>
</template>

<script>
    import {apiMapBackend} from "../../../config/api-conf"
    import enums from "../../Model.js"
    import utils from "../../utils.js"

    export default {
        data () {
            let dailyStatisticData = {}
            let dailyStatisticMap =  new Map([
                [
                    'attackWins', {
                        title: '进攻获胜次数',
                    }
                ],
                [
                    'donations', {
                        title: '捐兵',
                    }
                ],
                [
                    'donationsReceived', {
                        title: '收兵',
                    }
                ],
                [
                    'gold', {
                        title: '抓金',
                    }
                ],
                [
                    'elixir', {
                        title: '抓水',
                    }
                ],
                [
                    'darkElixir', {
                        title: '打黑',
                    }
                ],
            ])
            let [start, end] = [new Date(), new Date()]
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return {
                api: apiMapBackend.dailyStatistic,
                playerTag: this.$route.params.playerTag,
                playerInformation: {},
                queryParams: {
                    timeTuple: [start, end],
                    intervalType: 2,
                    intervalStep: 1,
                },
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
                datetimeTag: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }],
                },
            }
        },
        created() {
            this.playerInformation = JSON.parse(sessionStorage.getItem('currentPlayerRowDate'))
            this.activeTabName = 'attackWins'
            this.refreshData()
        },
        watch: {
            activeTabName: function (val) {
                console.log(`watched:  ${typeof(val)} : ${val}`)
                if (val !== '0') {
                    let mapped = this.dailyStatisticMap.get(val)
                    this.hChartOptions.title.text = mapped.title
                    this.hChartOptions.series[0].data = this.dailyStatisticData[val]
                }
            }
        },
        computed: {
            step() {
                return parseInt(this.queryParams.intervalType) === enums.intervalType.HOURS ? 2 : 1
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
            },
            goBack() {
                this.$router.back()
            },
            handleClick: function () {
                if (this.queryParams.timeTuple.length < 2 ||
                    this.queryParams.intervalType === '' ||
                    this.queryParams.intervalStep === 0) {
                    this.$message.warning('请选择必要的参数');
                } else {
                    this.refreshData()
                }
            },
            refreshData() {
                const self = this
                self.$axios.get(`${self.api}${self.playerTag}`, {
                    params: {
                        start_time: utils.dateFloor(self.queryParams.timeTuple[0]),
                        end_time: utils.dateFloor(self.queryParams.timeTuple[1]),
                        interval_type: self.queryParams.intervalType,
                        interval_step: self.queryParams.intervalStep,
                    }
                }).then((res) => {
                    let [attackWins, donations, donationsReceived, gold, elixir, darkElixir, datetimeTag] = [
                        [], [], [], [], [], [], []
                    ]
                    res.data.data.forEach((item) => {
                        attackWins.push(item.attackWins)
                        donations.push(item.donations)
                        donationsReceived.push(item.donationsReceived)
                        gold.push(item.gold)
                        elixir.push(item.elixir)
                        darkElixir.push(item.darkElixir)
                        datetimeTag.push(item.datetimeTag)
                    })
                    self.dailyStatisticData = {
                        attackWins: attackWins,
                        donations: donations,
                        donationsReceived: donationsReceived,
                        gold: gold,
                        elixir: elixir,
                        darkElixir: darkElixir
                    }
                    self.hChartOptions.series[0].data = self.dailyStatisticData[self.activeTabName]
                    self.hChartOptions.xAxis.categories = datetimeTag
                    self.loading = false
                }).catch(err => {
                    self.showHttpErrorMsg()
                })
            }
        }
    }
</script>

<style scoped>
    .daily-statistic-content{
        margin-top: 5em;
    }
    .selectors{
        margin-bottom: 3em;
    }
</style>

<style>
    .el-tabs__item{
        outline: none;
        padding: 0 3em 0 3em;
    }
</style>
