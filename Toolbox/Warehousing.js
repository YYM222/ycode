// ==UserScript==
// @name         入库明细-复制2
// @namespace    http://tampermonkey.net/
// @version      2024-07-17
// @description  try to take over the world!
// @author       You
// @match        http://haakaa.gnway.cc/tplus/BAPView/VoucherList.aspx*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

let a = document.createElement("button");
a.id = "copy_btn";
a.innerHTML = `复制
<style>
#copy_btn{
position: fixed;
    top: 120px;
    right: 220px;
    padding: 5px;
    z-index: 99999999;
    width: 130px;
    font-size: x-large;
    background-color: chartreuse;
    border-radius: 10px;
}
</style>`;
document.body.appendChild(a);

//模拟复制按钮设置数据
let copy_simula = function (data) {
    let copy_data = function () {
        if (event.clipboardData || event.originalEvent) {
            var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
            clipboardData.setData('text/plain', data);
            event.preventDefault();
        }
    };

    let origina_copy = event => { event.stopPropagation(); event.preventDefault() };
    document.addEventListener('copy', origina_copy, true);
    document.addEventListener("copy", copy_data, true);
    document.execCommand("copy");
    document.removeEventListener("copy", copy_data, true);
    document.removeEventListener("copy", origina_copy, true);

}

a.onclick = () => {
    let result = document.body.querySelectorAll("iframe")[3].contentDocument.querySelector("#scrollBody > table > tbody").innerText.replace(/\n(\t+)\n/g, "$1").replace(/\n\n\n/g, "\n").replace(/.+\t[ABCEFGH].+\n/g, "");
    let arr = result.split("\n").filter(item => item.length>10).map(item => item.split("\t").slice(1));
    window.copy_data = arr;
    arr.forEach((item,i,r)=> {
        item[0]==""?item[0] = r[i-1][0]:0;
        item[1]==""?item[1] = r[i-1][1]:0;
        item[2]==""?item[2] = r[i-1][2]:0;
    })
    arr = arr.map((item,i) =>[item[0],item[4],item[3],item[2],item[6],2,"测试"].join("\t") );
    arr = [...new Set(arr)];
    result = arr.join("\n")

    let name_r = {
        "东莞德高":"德高",
        "东莞市羽泰户外旅行用品有限公司":"羽泰",
        "广州市可可和汤姆母婴用品有限公司":"可可和汤姆",
        "广州市婴宝实业有限公司":"婴宝",
        "中山市硅萌科技有限公司":"硅萌",
        "中山市泓利电器科技有限公司":"泓利",
        "广州宇轩硅胶有限公司":"宇轩",
        "东莞市瑞祥精密硅胶制品有限公司":"瑞祥",
        "深圳锦华优品包装有限公司":"锦华",
        "厦门欣喜智工贸有限公司":"欣喜智",
        "东莞市鸿旭电子科技有限公司":"鸿旭",
        "东莞市黄氏橡塑科技有限公司":"黄氏",
        "东莞市源龙电子科技有限公司":"源龙",
        "佛山市三水东贤橡塑制品有限公司":"东贤",
        "广州市番禺区沙头桑连塑料制品经营部":"桑连",
        "广州旭骋婴童用品有限公司":"旭骋",
        "酷童广州市酷童婴童用品有限公司":"酷童",
        "宁波艾美佳硅胶科技有限公司":"艾美佳",
        "上海弘生医疗科技有限公司":"弘生",
        "深圳市奥杰尼硅胶科技有限公司":"奥杰尼",
        "西安泽瑞生物科技有限公司":"泽瑞",
        "义乌市泽斌贸易商行":"泽斌",
        "中山市德硕包装制品有限公司":"德硕",
        "中山市萌达日用品有限公司":"萌达",
        "中山市首利五金制品有限公司":"首利",
        "东莞市裕天硅橡胶科技有限公司":"裕天",
        "东莞市黄氏橡塑科技有限公司":"黄氏"

    };

    for(let name in name_r){
        result = result.replace(RegExp(name,"g"),name_r[name]);
}

    copy_simula(result);
    alert("复制成功")
}

})();
