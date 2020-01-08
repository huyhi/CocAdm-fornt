<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-pie-chart"></i> 实时数据 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="overview">
            <el-row>
<!--                <el-col :span="12">-->
<!--                    <highcharts :options="hChartOptions">-->
<!--                    </highcharts>-->
<!--                </el-col>-->
                <el-col :span="12">
                    <div class="grid-content bg-purple">总捐兵数:{{totalDonations}}</div>
                    <div class="grid-content bg-purple">当前人数:{{totalPlayers}}</div>
                </el-col>
            </el-row>
        </div>

        <el-table :data="memberList">
            <el-table-column type="index" :index="indexMethod" label="序号" width="100" fixed>
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="150">
            </el-table-column>
            <el-table-column prop="name" label="昵称" width="200">
            </el-table-column>
            <el-table-column prop="expLevel" label="等级" width="200" align="center" sortable>
            </el-table-column>
            <el-table-column prop="donations" label="捐兵" width="200" align="center" sortable>
            </el-table-column>
            <el-table-column prop="donationsReceived" label="收兵" width="200" align="center" sortable>
            </el-table-column>
            <el-table-column prop="donationRatio" label="捐兵占总体比例" width="200" align="center" sortable>
            </el-table-column>
            <el-table-column label="查看" width="150">
                <el-button icon="el-icon-search" size="small" circle
                           slot-scope="scope"
                           @click="showDetail(scope.row)">
                </el-button>
            </el-table-column>
<!--                    @click="showDetail(scope.$index, memberList)">-->
        </el-table>

    </div>
</template>

<script>
    import {apiMapBackend, apiMapFrontend} from "../../../config/api-conf"

    export default {
        data() {
            return {
                memberList: [],
                totalDonations: '',
                totalPlayers: '',
                hChartOptions: {
                    title: {
                        text: '等级比例',
                        align: 'center',
                    },
                    plotOptions: {
                        pie: {
                            startAngle: -90, // 圆环的开始角度
                            endAngle: 90,    // 圆环的结束角度
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '等级占比',
                        innerSize: '50%',
                        data: [
                            ['Firefox',   45.0],
                            ['IE',       26.8],
                            ['Chrome', 12.8],
                            ['Safari',    8.5],
                            ['Opera',     6.2],
                        ]
                    }]
                }
            }
        },
        created() {
            const self = this
            self.$axios.get(apiMapBackend.realtime).then(res => {
                self.memberList = res.data.data.realtime.memberList
                self.totalPlayers = res.data.data.th_level_ratio.total
                self.totalDonations = res.data.data.total_donate
            })
        },
        methods: {
            handleClickPlayerBlock(event){
                this.$router.push({
                    path: `${apiMapFrontend.dailyStatistic}${event.currentTarget.getAttribute('tag').slice(1)}`
                })
            },
            indexMethod(idx) {
                return idx + 1
            },
            showDetail(towData) {
                sessionStorage.setItem('currentPlayerRowDate', JSON.stringify(towData))
                this.$router.push({
                    path: `${apiMapFrontend.dailyStatistic}${towData.tag.slice(1)}`
                })
            }
        }
    }
</script>

<style scoped>
    .row-container{
        margin-top: 10em;
    }
    .row-container{
        padding: 0 5em;
    }
    .block-container{
        border-radius: 4px;
        margin-top: 2em;
    }
    .one-block-content{
        border: 1px solid black;
        background-color: #D9ECFF;
        transition: 0.3s;
        cursor: pointer;
        border-radius: 1em;
        padding: 1em;
        min-height: 8em;
    }
    .one-block-content:hover{
        background-color: #79BBFF;
    }


    .el-table{
        margin-top: 2em;
    }
    .highcharts-container{
        width: 10em;
        height: 10em;
    }

</style>
