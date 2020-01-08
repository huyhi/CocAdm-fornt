<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> About </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>About</h3>
            <article>
                <h1>COC 风月阁 数据展示</h1>
                <h2>前言</h2>
                <p> 为了更好的游戏体验和管理，特地开发了本网页专门收集本部落的数据，并落库持久保存。</p>
                <p>方便分析玩家各项数据参数如捐兵、收兵等参数评估玩家活跃度和为部落的贡献度</p>
                <h2>功能</h2>
                <p> ✅ 以2个小时为粒度收集当前部落玩家数据 </p>
                <p> ✅ 按照不同时间粒度可视化展示玩家的各项数据指标 </p>
                <p> ✅ 每个赛季玩家数据展示和排行</p>
                <p> 待开发 </p>
                <p> ❌ 联赛评估选人</p>
                <p> ❌ 联赛或部落战期间自动@未参战人员的QQ机器人</p>
                <p> 如果对这个平台有任何意见和开发建议，可以在群里找我提 </p>
                <h2>技术层面</h2>
                <P> 主要技术栈 Python + Vue.js + MySQL (同样对技术感兴趣的也可以和我交流) </P>
            </article>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>
