//自动点击
(function () {
    let index = 1;
    let DOM = `
        <link rel="stylesheet" type="text/css" href="${yymbox.yymbox_url}/yymbox/yymbox_1.css">
        <div id="input1">
            <input value="1" type="number" />
            <span>次/秒</span>
        </div>
        <div id="input2">
            <button>添加</button>
            <button>清除</button>
            <button>启动</button>
        </div>
    `;
    yymbox.my_append(document.querySelector('#YYM'), 'div', { id: 'autoclickcontorl', innerHTML: DOM }).then(() => { }).then(() => {
        //实现功能界面的拖拽。
        yymbox.my_drop(document.querySelector('#autoclickcontorl'), 'fixed');

        //项目点击功能
        function click_list(item, index) {
            let state = null;
            item.name == "true" ? (state = false) : (state = true);
            item.name = state;

            yymbox.autoclickcount = 1;
            yymbox.autoclicktime = 1000;
            yymbox.autoclicktimelist = [];
            yymbox.addautoclicktag = function (e) {
                //开启添加点击按键的功能
                if (yymbox.isyymboxtag(e.target) == false) {
                    yymbox.my_append(document.body, "div", {
                        className: "autoclick",
                        innerHTML: yymbox.autoclickcount,
                        style: "top:" +
                            (e.pageY - 10) +
                            "px;" +
                            "left:" +
                            (e.pageX - 10) +
                            "px;",
                    });
                    yymbox.my_append(e.target, "div", {
                        className: "autoclicktrue",
                        name: yymbox.autoclicktime,
                    });
                    yymbox.autoclickcount++;
                }
            };
            yymbox.isyymboxtag = function (obj) {
                if (obj.id == "autoclickcontorl") {
                    return true;
                } else if (obj == document.body) {
                    return false;
                } else {
                    return yymbox.isyymboxtag(obj.parentNode);
                }
            };
            //加载第三个功能 “自动点击” 的控制功能键。
            //自动点击的DOM功能键加载。
            let autoclickcontorl = document.querySelector("#autoclickcontorl");
            let autoclickcontorlone = document.querySelectorAll("#autoclickcontorl > #input1 > *");
            let autoclickcontorltwo = document.querySelectorAll("#autoclickcontorl > #input2 > button");
            let arrlist = ["次/秒", "秒/次", "分钟/次"];
            //以下是“自动点击”的功能键代码
            //点击的时间间隔
            autoclickcontorlone[0].oninput = function () {
                let data = autoclickcontorlone[0].value - 0;
                yymbox.autoclicktime;
                switch (autoclickcontorlone[1].innerHTML) {
                    case arrlist[0]:
                        yymbox.autoclicktime = 1000 / data;
                        break;
                    case arrlist[1]:
                        yymbox.autoclicktime = data * 1000;
                        break;
                    case arrlist[2]:
                        yymbox.autoclicktime = data * 1000 * 60;
                        break;
                }
                if (yymbox.autoclicktime >= 1) {
                    yymbox.autoclicktime = yymbox.autoclicktime.toFixed(0);
                } else {
                    yymbox.myfunMessage("请输入有效的数值。");
                    setTimeout(() => {
                        document.querySelector("#myfunMessage").style.display = "none";
                    }, 1000);
                }
            };
            //["次/秒","秒/次", "分钟/次"]切换。
            autoclickcontorlone[1].onclick = function () {
                let data = autoclickcontorlone[0].value - 0;
                switch (autoclickcontorlone[1].innerHTML) {
                    case arrlist[0]:
                        autoclickcontorlone[1].innerHTML = arrlist[1];
                        yymbox.autoclicktime = data * 1000;
                        break;
                    case arrlist[1]:
                        autoclickcontorlone[1].innerHTML = arrlist[2];
                        yymbox.autoclicktime = data * 1000 * 60;
                        break;
                    case arrlist[2]:
                        autoclickcontorlone[1].innerHTML = arrlist[0];
                        yymbox.autoclicktime = 1000 / data;
                        break;
                }
                if (yymbox.autoclicktime >= 1) {
                    yymbox.autoclicktime = yymbox.autoclicktime.toFixed(0);
                } else {
                    yymbox.myfunMessage("请输入有效的数值。");
                    setTimeout(() => {
                        document.querySelector("#myfunMessage").style.display = "none";
                    }, 1000);
                }
            };
            //第一个功能健，添加
            autoclickcontorltwo[0].onclick = function () {
                if (autoclickcontorltwo[0].name != "true") {
                    autoclickcontorltwo[0].name = "true";
                    document.addEventListener("mousedown", yymbox.addautoclicktag);
                    //关闭"开启"的功能键。
                    autoclickcontorltwo[2].name == "true" ?
                        autoclickcontorltwo[2].click() :
                        false;
                } else {
                    autoclickcontorltwo[0].name = "false";
                    document.removeEventListener("mousedown", yymbox.addautoclicktag);
                }
            };
            //第二个功能健，清除
            autoclickcontorltwo[1].onclick = function () {
                document.querySelectorAll(".autoclick").forEach((item) => {
                    item.remove();
                });
                document.querySelectorAll(".autoclicktrue").forEach((item) => {
                    item.remove();
                });
                yymbox.autoclicktimelist.forEach((item) => {
                    clearInterval(item);
                });
                yymbox.autoclicktimelist = [];
                yymbox.autoclickcount = 1;
                //关闭"开启"的功能键。
                autoclickcontorltwo[2].name == "true" ?
                    autoclickcontorltwo[2].click() :
                    false;
                //关闭添加标签的功能键。
                autoclickcontorltwo[0].name == "true" ?
                    autoclickcontorltwo[0].click() :
                    false;
            };
            //第三个功能健，启动
            autoclickcontorltwo[2].onclick = function () {
                if (autoclickcontorltwo[2].name != "true") {
                    autoclickcontorltwo[2].name = "true";
                    document.querySelectorAll(".autoclicktrue").forEach((item) => {
                        yymbox.autoclicktimelist.push(
                            setInterval(() => {
                                item.parentNode.click();
                            }, Number(item.name))
                        );
                    });
                    //关闭添加标签的功能键。
                    autoclickcontorltwo[0].name == "true" ?
                        autoclickcontorltwo[0].click() :
                        false;
                } else {
                    autoclickcontorltwo[2].name = "false";
                    yymbox.autoclicktimelist.forEach((item) => {
                        clearInterval(item);
                    });
                    yymbox.autoclicktimelist = [];
                }
            };

            document.body.style.zoom = 1;
            //显示可隐藏设置界面。
            if (state == false) {
                autoclickcontorl.style.display = 'none';
            } else {
                autoclickcontorl.style.display = 'block';
            }
        };

        //项目双击功能
        function dblclick_list(item, index) {
            console.log('未添加功能。');
        }

        yymbox.click_list[index] = yymbox.my_debounce(click_list, 300, false);
        yymbox.dblclick_list[index] = dblclick_list;
    });
})()