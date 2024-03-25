/**
javascript:ym=document.createElement("script");ym.src="https://yym222.github.io/ycode/yymbox/yymbox.js";ym.charset="UTF8";document.head.appendChild(ym);
javascript:fetch("https://yym222.github.io/ycode/yymbox/index.js").then(r => r.text()).then(d => eval(d));
*/

let yymbox = {
    // yymbox_url: 'https://frp-oak.top:23347',
    // yymbox_url: 'http://localhost:666',
    // yymbox_url: 'https://yym222.github.io/ycode',
    // yymbox_url: "http://127.0.0.1:5500",
    // yymbox_url: "..",
    yymbox_url: null,
    server_url: 'https://frp-oak.top:23347',
    my_append: function (el, type = "div", data = {}, position = 'end') {
        return new Promise((resolve) => {
            var a = document.createElement(type);
            for (let item in data) { a[item] = data[item] };
            position == 'end' ? el.appendChild(a) : el.insertBefore(a, el.childNodes[0]);
            resolve(a);
        });
    },
    my_drop: function (el, type = "absolute") {
        //功能函数--指定对象实现拖动效果
        //el - 父标签
        //type - 父标签的方式absolute/fixed
        let drop_startX, drop_startY;
        let drop_Parent_startX, drop_Parent_startY;

        el.draggable = true;
        el.style.position = type;
        el.style.zIndex = 999999999999999;
        el.style.margin = "0px 0px";
        // el.parentNode.style.overflow = 'visible';

        el.addEventListener("dragstart", (e) => {
            drop_startX = e.offsetX;
            drop_startY = e.offsetY;
            if (el.offsetParent) {
                drop_Parent_startX = el.offsetParent.offsetLeft;
                drop_Parent_startY = el.offsetParent.offsetTop;
            }
            e.stopPropagation();
        });

        if (type == "absolute") {
            el.addEventListener("dragend", (e) => {
                el.style.left = e.pageX - drop_startX - drop_Parent_startX + "px";
                el.style.top = e.pageY - drop_startY - drop_Parent_startY + "px";
                e.stopPropagation();
            });
        } else {
            el.addEventListener("dragend", (e) => {
                let left = e.pageX - drop_startX - document.body.scrollLeft - document.querySelector("html").scrollLeft;
                let top = e.pageY - drop_startY - document.body.scrollTop - document.querySelector("html").scrollTop;
                el.style.left = left + "px";
                el.style.top = top + "px";
                el.style.setProperty("--LR", left / window.innerWidth > 0.5 ? 1 : -1)
                el.style.setProperty("--LRt", left / window.innerWidth > 0.5 ? "null" : -1);
                e.stopPropagation();
            });
        }

    },
    my_debounce: function (func, delay, next = true) {
        //功能函数--防抖函数。
        //next - 为false时，超过1次的点击，不执行。
        let timer = null;
        let index = 0;
        return function (...args) {
            index = index + 1;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                if (index > 1 && next != true) {
                } else {
                    func.apply(this, args);
                }
                index = 0;
            }, delay);
        };
    },
    my_ajax(type, url, data) {
        return new Promise((resolve, reject) => {
            //1.创建ajax对象(此处兼容性的创建)
            var xhr = null;
            try {
                xhr = new XMLHttpRequest();
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            let todeal = "";
            if (type == "GET") {
                for (let item in data) {
                    todeal += item + "=" + data[item] + "&";
                }
                todeal = "?" + todeal.slice(0, -1);
                xhr.open(type, url + todeal, true);
                xhr.send();
            } else if (type == "POST") {
                for (let item in data) {
                    todeal += item + "=" + data[item] + "&";
                }
                todeal = todeal.slice(0, -1);
                xhr.open(type, url, true);
                xhr.setRequestHeader(
                    "content-type",
                    "application/x-www-form-urlencoded"
                );
                xhr.send(todeal);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.status);
                    }
                }
            };
        });
    },
    msgbox: function (text, timeout = 3000, w = "250px", color = "#f0709c") {
        let dom_msgbox = document.querySelector("#msgbox");
        if (!dom_msgbox) {
            dom_msgbox = document.createElement("div");
            dom_msgbox["id"] = "msgbox";
            document.body.appendChild(dom_msgbox);
        }

        let msgbox_div = document.createElement("div");

        let msgbox_item = document.createElement("textarea");
        msgbox_item.innerHTML = text;
        msgbox_div.style.backgroundColor = color;
        msgbox_div.style.minWidth = w;
        msgbox_div.appendChild(msgbox_item);
        dom_msgbox.appendChild(msgbox_div);

        let dom_timeout = setTimeout(() => msgbox_div.remove(), timeout);
        msgbox_item.addEventListener("mouseover", () => clearTimeout(dom_timeout));
        msgbox_item.addEventListener("focus", () => clearTimeout(dom_timeout));
        msgbox_item.addEventListener("mouseout", () => { if (msgbox_item != document.activeElement) { dom_timeout = setTimeout(() => msgbox_div.remove(), timeout) } });
        msgbox_item.addEventListener("blur", () => { dom_timeout = setTimeout(() => msgbox_div.remove(), timeout) });

        //结果输入框的高度调节
        function auto_height(el, h = "50px") { el.style.height = h; el.style.height = el.scrollHeight + 20 + 'px' };
        msgbox_item.addEventListener("input", () => auto_height(msgbox_item));


        let dom_msgbox_style = document.querySelector("#msgbox_style");
        if (!dom_msgbox_style) {
            let msgbox_style = document.createElement("style");
            msgbox_style["id"] = "msgbox_style";
            msgbox_style.innerHTML = `
                                    #msgbox {
                                        position: absolute;
                                        top: 20px;
                                        right: 10px;
                                        width:250px;
                                        
                                        &>div{
                                            border-radius: 10px;
                                            margin-right:auto;
                                            display: inline-block;
                                            margin-bottom: 5px;

                                            &>textarea {
                                                width: 100%;
                                                display: block;
                                                min-height: 50px;
                                                border-radius: 10px;
                                                line-height: 25px;
                                                padding: 2px;
                                                font-weight: bolder;
                                                outline: none;
                                                border: none;
                                                overflow: hidden;
                                                mix-blend-mode: difference;
                                                background-color: transparent;
                                                color:white;
                                                resize: both;
                                            }
    
                                            &>textarea:hover {
                                                filter: brightness(1.2);
                                            }
                                        }
                                    }`;
            document.body.appendChild(msgbox_style);
        }
        auto_height(msgbox_item);
        yymbox.my_drop ? yymbox.my_drop(dom_msgbox, "fixed") : 0;
        let time_dom_msgbox = setInterval(() => { dom_msgbox.querySelector("textarea") ? 1 : (dom_msgbox.remove(), clearInterval(time_dom_msgbox)) }, 5000);
    },
    //模拟复制按钮设置数据
    copy_simula(data) {
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

    },
    shape_list: ["Y Code", "廖总发大财", "廖总发大财", "廖总发大财"]
};


switch (location.hostname) {
    case "":
        yymbox.yymbox_url = ".."
        break;

    case "127.0.0.1":
        yymbox.yymbox_url = "http://127.0.0.1:5500"
        break;

    case "yym222.github.io":
        yymbox.yymbox_url = "https://yym222.github.io/ycode"
        break;

    case "frp-oak.top":
        yymbox.yymbox_url = "https://frp-oak.top:23347"
        break;

    default:
        fetch("https://frp-oak.top:23347")
            .then(() => yymbox.yymbox_url = "https://frp-oak.top:23347")
            .catch(() => yymbox.yymbox_url = "https://yym222.github.io/ycode")
        break;
}


yymbox["click_list"] = [];
yymbox["is_stick"] = el => {
    el = el.target || el;
    let dom_yymbox = document.querySelector("#yymbox");
    let dom_el_parent = el.parentElement.parentElement;
    let dom_before = dom_el_parent.querySelector("&>.btn>button[active='true']");


    //判断上一次点击的按钮是否为当前的按钮。
    // if (dom_before && dom_before != el.target) { dom_before.setAttribute("active", "false") };

    // 点击初始钮时，改变按钮样式。
    let state = el.getAttribute("active") == "false";

    el.setAttribute("active", state);

    // 当点击主清单栏时，使脚本固定，不收缩回去。 
    if (dom_el_parent.id == "yymbox_list") {
        state ? dom_yymbox.classList.add("yymbox_hover") : dom_yymbox.classList.remove("yymbox_hover");
        //关闭这个主菜单栏的其他按钮的 激活状态。
        dom_before ? dom_before.setAttribute("active", "false") : 0;
    };

    return state
}


yymbox["data"] = [
    {
        name: "去除广告",
        children: [{ name: "使用说明" }, { name: "关 闭", active: true }, { name: "添加规则" }, { name: "查看规则" }, { name: "保存规则" }, { name: "添加自定义规则" }]
    },
    {
        name: "自动点击",
        children: [{
            name: "独立点击", children: [
                { name: "开始执行" },
                { name: "添加点击位置" },
                { name: "循环时间【100】" },
                { name: "最大次数【9999】" },
                { name: "查看所有位置" },
                { name: "清除所有位置" },
            ]
        }, {
            name: "顺序点击", children: [
                { name: "开始执行" },
                { name: "添加点击位置" },
                { name: "间隔时间【1500】" },
                { name: "最大次数【9999】" },
                { name: "查看所有位置" },
                { name: "清除所有位置" },
            ]
        }, { name: "使用说明" }, { name: "" }, { name: "" },]
    },
    {
        name: "页面文本",
        children: [{ name: "编辑页面" }, { name: "复制选中文本" }, { name: "清除脚本" }, { name: "清除iframe" }, { name: "" },]
    },
    {
        name: "图片视频",
        children: [{ name: "提取图片", children: [{ name: "使用说明" }, { name: "重设名字" }, { name: "自定开始序号" }] },
        { name: "视频速度", children: [{ name: "0.5" }, { name: "1.25" }, { name: "1.5" }, { name: "1.75" }, { name: "2.0" }] }, { name: "" }, { name: "" },]
    },
    {
        name: "网页效果", children: [
            { name: "背景-樱花飘落" },
            { name: "背景-粒子运动" },
            { name: "背景-气泡效果" },
            { name: "背景-顶部藤蔓" },
            { name: "背景-新年烟花" },
            { name: "背景-太空穿梭" },
        ]
    },
    { name: "其 他" },
]



yymbox["load"] = function () {
    if (!yymbox.yymbox_url) { return false };

    function create_btn(dom, obj) {
        obj.active = obj.active || false;
        obj.children = obj.children || [];
        obj.func = obj.func || function (e, obj) { yymbox.msgbox("未定义") };

        let btn = document.createElement("div");
        let button = document.createElement("button");
        let btn_item = document.createElement("div");

        btn.classList.add("btn");
        btn_item.classList.add("btn_item");
        button.innerHTML = obj.name;
        button.setAttribute("active", false);
        obj.active ? btn.classList.add("active") : obj.active = false;
        button.addEventListener("click", (e) => { obj.func(e, obj) });

        obj.node = button;

        obj.children.forEach(obj => create_btn(btn_item, obj));

        btn.appendChild(button);
        if (obj.children.length > 0) { btn.appendChild(btn_item) };
        dom.appendChild(btn);


        //判断obj.active是否为true，如果是，开启功能。
        obj.active ? setTimeout(() => { button.click() }, 1000) : 1;

        return btn
    }

    let dom_yymbox = `
    <div id="yymbox" contenteditable="false">
        <link rel="stylesheet" type="text/css" href="${yymbox.yymbox_url}/yymbox/yymbox.css">
        <img src="${yymbox.yymbox_url}/yymbox/yymbox.gif" />
        <div id="yymbox_list">
            <div class="host">
            <span class="host1">${location.host}</span>
            <span class="host2">关 闭</span>
            </div>
        </div>
    </div>
    `;

    yymbox.my_append(document.body, "div", { innerHTML: dom_yymbox, id: "YYM" })
        .then(YYM => Promise.all([
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/脚本_去除广告.js` }),
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/脚本_自动点击.js` }),
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/脚本_页面文本.js` }),
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/脚本_图片视频.js` }),
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/脚本_网页效果.js` }),
        ])).then(() => {
            let dom_yymbox_list = YYM.querySelector("#yymbox_list");
            yymbox.data.forEach(obj => create_btn(dom_yymbox_list, obj))
        })
        .then(() => {
            //使用清单可拖拽。
            yymbox.my_drop(document.querySelector("#yymbox"), "fixed");

            //清单的第一项功能，关闭YYM。
            document.querySelector(".host2").addEventListener("click", () => {
                document.querySelector("#YYM").remove();
                clearInterval(yymbox["load_time"]);
                yymbox = null;
            });


        });
};


yymbox.load();
yymbox["load_time"] = setInterval(() => (!document.querySelector("#YYM") ? yymbox.load() : true), 2000);
