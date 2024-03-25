(function () {
    let index = 0;
    let advert = {
        data_all: {},
        data: [],
    };
    let dom_yymbox = document.querySelector("#yymbox");

    //项目点击功能,<button>去除广告</button>
    yymbox.data[index].func = (e, item) => { yymbox.is_stick(e) };

    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================

    //项目子菜单的按钮功能。

    //输入一个节点，查找该节点的id和class，如果找不到，向其父节点查找。
    function get_class_id(el) {
        if (is_dom_yymbox(el)) { return [] };
        let result = [];
        if (el.id) { result.push('#' + el.id) };
        result.push(...([...el.classList].map(item => "." + item)));
        return result.length == 0 ? get_class_id(el.parentNode) : result;
    };

    //输入一个节点，判断这个节点是否是本脚本的元素yymbox.
    function is_dom_yymbox(el) {
        if (el.nodeName == "BODY") { return false };
        if (el.id == "yymbox") { return true } else { return is_dom_yymbox(el.parentNode) };
    }

    //开启去广告功能。输入一个数组，将数组中的规则应用页面。
    function clear_advert(list) {
        try { document.querySelector("#clear_advert").remove() } catch { };
        let rule_list = [...new Set(list)].join(",");
        yymbox.my_append(dom_yymbox, "style", { id: "clear_advert", innerHTML: `${rule_list}{display:none !important;}` });
    };

    //鼠标悬停时,展示上边框
    function show_hoverstyle() {
        let hoverstyle = `
                    *:hover{
                        box-shadow: 0px 0px 2px 2px white;
                        border-top: 10px black solid;
                        }
                        div:hover,iframe:hover,img:hover,a:hover,table:hover,button:hover{
                        box-shadow: 0px 0px 2px 2px white;
                        border-top: 15px black solid !important;
                        }
                    
                        #clearggcontrol:hover,#clearggcontrol div:hover,#clearggcontrol button:hover,#clearggcontrol input:hover,#clearggcontrol span:hover{
                        box-shadow: 0px 0px 0px 0px white;
                        border-top: 0px black solid !important;
                        }
                        #YYM:hover,#YYM div:hover,#YYM button:hover,#YYM input:hover,#YYM textarea:hover,#YYM span:hover{
                            box-shadow: 0px 0px 0px 0px white;
                            border-top: 0px black solid !important;
                        }
                        #msgbox:hover,#msgbox textarea:hover{
                            box-shadow: 0px 0px 0px 0px white;
                            border-top: 0px black solid !important;
                        }
                    `;
        yymbox.my_append(dom_yymbox, "style", { id: 'hoverstyle', innerHTML: hoverstyle });
    }

    //展示规则栏窗口。
    function show_clear_rule(el) {
        //判断去除广告是否开启,如果没有就开启
        yymbox.data[index].children[1].state ? 1 : yymbox.data[index].children[1].node.click();

        //判断 查看规则 是否开启,如果没有就开启
        yymbox.data[index].children[3].state ? 1 : yymbox.data[index].children[3].node.click();


        advert.temp_data = [...advert.data];

        dom_show_clear_rule_parent = el || document.querySelector("#show_clear_rule_parent");

        //关闭规则窗口事件
        dom_show_clear_rule_parent.onclick = e => {
            if (e.clientX - dom_show_clear_rule_parent.offsetLeft - dom_show_clear_rule_parent.offsetWidth > 0) {
                yymbox.data[index].children[3].node.click();
            }
        }


        try { dom_show_clear_rule_parent.querySelector("#show_clear_rule").remove() } catch (err) { };

        yymbox.my_append(dom_show_clear_rule_parent, "div", { id: "show_clear_rule" }).then(dom_show_clear_rule => {
            advert.data.forEach(item => {
                yymbox.my_append(dom_show_clear_rule, "button", { innerHTML: item, name: true }).then(button => {
                    //给规则按钮添加点击事件
                    button.onclick = e => {
                        let button_state = e.target.name == "false";
                        e.target.name = button_state;
                        if (button_state) {
                            advert.temp_data.push(e.target.innerHTML);
                        } else {
                            advert.temp_data = advert.temp_data.filter(item => item != e.target.innerHTML);
                        }
                        clear_advert(advert.temp_data);
                    };
                    //给规按钮添加右键删除事件
                    button.oncontextmenu = e => {
                        e.target.remove();
                        advert.data = advert.data.filter(item => item != e.target.innerHTML);
                        clear_advert(advert.data);
                        e.preventDefault();
                    }
                })
            })
        });
    }

    //请求网络规则
    function get_rule() {
        let url = yymbox.yymbox_url + "/yymbox/advent_rule.txt";
        yymbox.my_ajax("GET", url)
            .then((data) => {
                //获取数据。
                advert.data_all = JSON.parse(decodeURIComponent(data));

                let local_rule = localStorage.getItem("advent_rule");
                local_rule ? advert.data = JSON.parse(local_rule)[location.hostname] : advert.data = [];
                advert.data_all[location.hostname] ? advert.data.push(...advert.data_all[location.hostname]) : 0;
                advert.data = [...new Set(advert.data)].sort();
            });
    }
    get_rule()

    //上传规则到服务器
    function save_rule() {
        advert.data_all[location.hostname] = advert.data;

        let data = { path: "/yymbox/advent_rule.txt", data: JSON.stringify(advert.data_all) };

        yymbox.my_ajax(
            "POST",
            yymbox.server_url + "/ASP/api-write.asp",
            data
        )
            .then((data) => {
                alert("已保存至服务器！");
            });
    };

    // ==================================================================================================
    // ==================================================================================================

    //使用说明 。
    yymbox.data[index].children[0].func = (e, item) => {
        yymbox.msgbox(
            `去除广告

打开“添加规则”，右键点击元素可添加规则。

`, 3000, "400px");
    };
    // ==================================================================================================
    // ==================================================================================================


    //开启或关闭 去除广告 功能。
    yymbox.data[index].children[1].func = (e, item) => {
        let state = yymbox.is_stick(e);
        state ? e.target.innerHTML = "开 启" : e.target.innerHTML = "关 闭";
        item["state"] = state;
        if (state) {
            clear_advert(advert.data);
        } else {
            document.querySelector("#clear_advert").remove();

        }
    };

    // ==================================================================================================
    // ==================================================================================================

    //添加规则。
    //设置右键事件，来获取规则。
    yymbox.data[index].children[2].func = (e, item) => {
        let state = yymbox.is_stick(e);
        item.state = state;
        if (state) {
            //判断去除广告是否开启,如果没有就开启
            yymbox.data[index].children[1].state ? 1 : yymbox.data[index].children[1].node.click();

            //开启鼠标悬停时,展示上边框
            show_hoverstyle();

            //添加右键 获取规则 事件。
            document.oncontextmenu = (e) => {
                advert.data.push(...get_class_id(e.target));
                clear_advert(advert.data);

                //刷新规则窗口
                show_clear_rule(document.querySelector("#show_clear_rule_parent"));

                e.preventDefault();
            };
        } else {
            //关闭鼠标悬停时,展示上边框
            document.querySelector("#hoverstyle").remove();
            document.oncontextmenu = null;
        }
    };

    // ==================================================================================================
    // ==================================================================================================

    //查看规则
    yymbox.data[index].children[3].func = (e, item) => {
        let state = yymbox.is_stick(e);
        item.state = state;
        let dom_show_clear_rule_parent = document.querySelector("#show_clear_rule_parent");
        if (state) {

            //展示规则清单框。
            if (dom_show_clear_rule_parent) {
                show_clear_rule();
                dom_show_clear_rule_parent.style.display = "block";

            } else {
                yymbox.my_append(dom_yymbox, "div", { id: "show_clear_rule_parent" })
                    .then(el => { yymbox.my_drop(el, "fixed"); show_clear_rule(el); el.style.display = "block" });
            }


        } else {
            let is_edit = document.querySelector("#show_clear_rule>button[name='false']");

            if (is_edit) {
                confirm("规则有修改，是否保存修改？") ? advert.data = [...new Set(advert.temp_data)].sort() : 0;
            }

            //关闭规则清单框。
            dom_show_clear_rule_parent.style.display = "none";
        }


    }

    // ==================================================================================================
    // ==================================================================================================

    //保存规则
    yymbox.data[index].children[4].func = (e, item) => {
        advert.data_all[location.hostname] = advert.data;
        fetch(yymbox.server_url).then(res => {
            save_rule();
        }).catch(err => {
            let advent_rule = JSON.stringify(advert.data_all);
            localStorage.setItem("advent_rule", advent_rule);

            yymbox.msgbox(`保存失败，服务器未开启！\n已为您保存到本地。`);

            //判断 添加规则 是否开启,如果没有就开启
            yymbox.data[index].children[2].state ? yymbox.data[index].children[2].node.click() : 0;

            //判断 查看规则 是否开启,如果没有就开启
            yymbox.data[index].children[3].state ? yymbox.data[index].children[3].node.click() : 0;


        })

    }

    //保存自定义规则
    yymbox.data[index].children[5].func = (e, item) => {
        let rule = prompt("输入CSS规则。");
        try {
            document.querySelector(rule);
            advert.data.push(rule);
            show_clear_rule();
            clear_advert(advert.data);
        } catch (error) {
            yymbox.msgbox("错误！ 不是合法的规则！")
        }

    }
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================



})()