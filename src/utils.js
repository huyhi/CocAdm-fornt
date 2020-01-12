export default {
    dateFormat(fmt, date) {
        let ret;
        let opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
        }
        return fmt;  //"YYYY-mm-dd HH:MM:SS"
    },
    dateFloor(date) {
        let [y, m, d, H, M, S] = [
            date.getFullYear(),
            (date.getMonth() + 1),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ]
        if (H % 2 === 1) {
            H -= 1
        } else if ((M > 0 || S > 0) && H !== 0){
            H -= 2
        }
        return `${y}-${m}-${d} ${H}:00:00`
    }

}
