<template>
    <div class="sidebar">
        <el-menu
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            theme="dark"
            unique-opened
            router>
            <template v-for="item in items">
                <el-menu-item
                    :index="item.index">
                    <i :class="item.icon"></i>
                    {{ item.title }}
                </el-menu-item>
<!--                <template v-if="item.subs">-->
<!--                    <el-submenu :index="item.index">-->
<!--                        <template slot="title">-->
<!--                            <i :class="item.icon"></i>-->
<!--                            {{ item.title }}-->
<!--                        </template>-->
<!--                        <el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index">-->
<!--                            {{ subItem.title }}-->
<!--                        </el-menu-item>-->
<!--                    </el-submenu>-->
<!--                </template>-->

<!--                <template v-else>-->
<!--                    <el-menu-item :index="item.index">-->
<!--                        <i :class="item.icon"></i>-->
<!--                        {{ item.title }}-->
<!--                    </el-menu-item>-->
<!--                </template>-->
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {apiMapFrontend} from "../../../config/api-conf"

    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/readme',
                        title: '关于本站'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: '/realtime',
                        title: '实时数据'
                    },
                    // {
                    //     icon: 'el-icon-pie-chart',
                    //     index: '/dailyStatistic',
                    //     title: '日常统计数据'
                    // },
                    {
                        icon: 'el-icon-trophy',
                        index: '/seasonStatistic',
                        title: '赛季统计数据'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
