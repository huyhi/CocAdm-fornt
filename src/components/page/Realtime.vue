<template>
    <div class="row-container">
        <el-row :gutter="50" class="row-container">

<!--            <el-col :span="6" class="block-container">-->
<!--                <div class="grid-content bg-purple one-block-content">-->
<!--                    <el-row>-->
<!--                        <el-col :span="20"><div class="grid-content">#123</div></el-col>-->
<!--                        <el-col :span="4"><div class="grid-content">TH1</div></el-col>-->
<!--                    </el-row>-->
<!--                    <el-row>-->
<!--                        <el-col :span="24"><div class="grid-content">name</div></el-col>-->
<!--                    </el-row>-->
<!--                    <el-row>-->
<!--                        <el-col :span="6"><div class="grid-content">1</div></el-col>-->
<!--                        <el-col :span="6"><div class="grid-content">2</div></el-col>-->
<!--                        <el-col :span="6"><div class="grid-content">3</div></el-col>-->
<!--                        <el-col :span="6"><div class="grid-content">4</div></el-col>-->
<!--                    </el-row>-->
<!--                </div>-->
<!--            </el-col>-->

<!--            <el-col :span="6"><div class="grid-content bg-purple block-container">2</div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple block-container">3</div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple block-container">4</div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple block-container">5</div></el-col>-->
<!--            <el-col :span="6"><div class="grid-content bg-purple block-container">6</div></el-col>-->

            <el-col
                :span="6"
                class="block-container"
                v-for="item in memberList">
                <div
                    class="grid-content bg-purple one-block-content"
                    :tag="item.tag"
                    @click="handleClickPlayerBlock">
                    <el-row>
                        <el-col :span="18"><div class="grid-content"> {{ item.tag }} </div></el-col>
                        <el-col :span="6"><div class="grid-content"> LV: {{ item.expLevel }} </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><div class="grid-content"> {{ item.name }} </div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><div class="grid-content">捐:{{ item.donations }} </div></el-col>
                        <el-col :span="8"><div class="grid-content">收:{{ item.donationsReceived }}</div></el-col>
<!--                        <el-col :span="8"><div class="grid-content">胜:{{ item.attackWins }}</div></el-col>-->
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {apiMapBackend, apiMapFrontend} from "../../../config/api-conf"

    export default {
        data() {
            return {
                memberList: [],
            }
        },
        created() {
            const self = this
            self.$axios.get(apiMapBackend.realtime).then(res => {
                console.log(res.data.data.memberList)
                self.memberList = res.data.data.memberList

            })
        },
        methods: {
            handleClickPlayerBlock(event){
                console.log(`${apiMapFrontend.dailyStatistic}${event.currentTarget.getAttribute('tag').slice(1)}`)
                this.$router.push({
                    path: `${apiMapFrontend.dailyStatistic}${event.currentTarget.getAttribute('tag').slice(1)}`
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

</style>
