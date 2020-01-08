<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 赛季表格 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select
                v-model="selectSeasonId"
                placeholder="选择赛季"
                class="handle-select mr10"
                @change="selectChange">
                <el-option
                    v-for="season in seasonList"
                    :key="season.name"
                    :data-id="season.id"
                    :label="season.name"
                    :value="season.id">
                </el-option>
            </el-select>
        </div>
        <el-table :data="seasonStatistic" border ref="multipleTable">
            <el-table-column type="index" :index="indexMethod" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="150">
            </el-table-column>
            <el-table-column prop="name" label="昵称" width="150">
            </el-table-column>
            <el-table-column prop="expLevel" label="等级" width="100" align="center" sortable>
            </el-table-column>
            <el-table-column prop="attackWins" label="进攻获胜次数" width="150" align="center" sortable>
            </el-table-column>
            <el-table-column prop="donations" label="捐兵" width="150" align="center" sortable>
            </el-table-column>
            <el-table-column prop="donationsReceived" label="收兵" width="150" align="center" sortable>
            </el-table-column>
            <el-table-column prop="DR_ratio" label="捐收比" width="150" align="center" sortable>
            </el-table-column>
            <el-table-column prop="RD_ratio" label="收捐比" width="150" align="center" sortable>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {apiMapBackend} from "../../../config/api-conf"

    export default {
        data() {
            return {
                api: apiMapBackend.seasonList,
                seasonList: [],
                seasonStatistic: [],
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                selectSeasonId: '',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            getData(){
                let self = this;
                self.$axios.get(self.api).then((res) => {
                    self.seasonList = res.data.data;
                }).catch(err => {
                    self.showHttpErrorMsg()
                })
            },
            selectChange(){
                const self = this
                self.$axios.get(`${self.api}${self.selectSeasonId}`).then((res) => {
                    self.seasonStatistic = res.data.data;
                }).catch(err => {
                    self.showHttpErrorMsg()
                })
            },
            indexMethod(idx) {
                return idx + 1
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            showHttpErrorMsg() {
                this.$message({
                    showClose: true,
                    message: '后端服务异常，拉取赛季信息失败，请刷新或联系管理员',
                    type: 'warning',
                    duration: 7000
                })
            }
            // delAll(){
            //     const self = this,
            //         length = self.multipleSelection.length;
            //     let str = '';
            //     self.del_list = self.del_list.concat(self.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += self.multipleSelection[i].name + ' ';
            //     }
            //     self.$message.error('删除了'+str);
            //     self.multipleSelection = [];
            // },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 30vw;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
