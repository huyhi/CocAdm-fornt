<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-pie-chart"></i> 实时数据 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="overview">
            <el-row>
                <el-col :span="12">
                    <article v-loading="loading">
                        <div class="grid-content bg-purple">总捐兵数: {{totalDonations}}</div>
                        <div class="grid-content bg-purple">当前人数: {{totalPlayers}}</div>
                    </article>
                </el-col>
            </el-row>
        </div>

        <el-table :data="memberList" v-loading="loading">
            <el-table-column type="index" :index="indexMethod" label="序号" width="100" fixed>
            </el-table-column>
            <el-table-column label="查看" width="100" fixed>
                <el-button icon="el-icon-search" size="small" circle
                           slot-scope="scope"
                           @click="showDetail(scope.row)">
                </el-button>
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
                loading: true,
                hChartOptions: {}
            }
        },
        created() {
            const self = this
            self.$axios.get(apiMapBackend.realtime).then(res => {
                if (res.data.code === 200) {
                    self.memberList = res.data.data.realtime.memberList
                    self.totalPlayers = res.data.data.th_level_ratio.total
                    self.totalDonations = res.data.data.total_donate
                    self.loading = false
                } else {
                    self.showHttpErrorMsg("实时数据接口繁忙")
                }
            })
        },
        methods: {
            indexMethod(idx) {
                return idx + 1
            },
            showDetail(towData) {
                sessionStorage.setItem('currentPlayerRowDate', JSON.stringify(towData))
                this.$router.push({
                    path: `${apiMapFrontend.dailyStatistic}${towData.tag.slice(1)}`
                })
            },
            showHttpErrorMsg(msg = '数据服务异常，请刷新重试') {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'warning',
                    duration: 7000
                })
            },
        }
    }
</script>

<style scoped>
    .el-table{
        margin-top: 2em;
    }
    article{
        line-height: 2em;
    }

</style>
