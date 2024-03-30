(function () {
    let index = 1;
    let dom_yymbox = document.querySelector("#yymbox");
    let dom_autoclick = null;

    let alone_click = {
        list: [],
        time: 100,
        max: 9999,
        clock: [],
    }
    let order_click = {
        list: [],
        time: 1500,
        count: 0,
        max: 9999,
        clock: [],
    }

    //项目点击功能,<button>自动点击</button>
    yymbox.data[index].func = (e, item) => {
        let state = yymbox.is_stick(e);

        if (!document.querySelector("#autoclick")) {
            yymbox.my_append(dom_yymbox, "div", { id: "autoclick" }).then(el => {
                dom_autoclick = el;
                yymbox.msgbox("已开启功能，请选择点击类型。")
            })
        }
    };

    //输入一个节点，判断这个节点是否是本脚本的元素yymbox.
    function is_dom_yymbox(el) {
        if (el.nodeName == "BODY") { return false };
        if (el.id == "yymbox") { return true } else { return is_dom_yymbox(el.parentNode) };
    }



    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================

    //项目子菜单的按钮功能。

    // ==================================================================================================
    //独立点击。
    // ==================================================================================================
    yymbox.data[index].children[0].func = (e, item) => {
        if (!dom_autoclick) {
            yymbox.msgbox("请点击【自动点击】按钮，开启功能。");
            return false;
        };

        //判断顺序点击按钮是否开启了，如果是，关闭它。
        if (yymbox.data[index].children[1].state) { yymbox.data[index].children[1].node.click() };

        let state = yymbox.is_stick(e);
        item.state = state;


        if (state) {
            dom_autoclick.style.display = "block";
        } else {
            dom_autoclick.style.display = "none";
        }

    };



    //添加一个独立点击位置。
    function add_alone_click(e) {
        if (!dom_autoclick) {
            yymbox.msgbox("请点击【自动点击】按钮，开启功能。");
            return false;
        };

        //判断单击的位置不是本脚本yymbox，才添加到清单。
        if (!is_dom_yymbox(e.target)) {
            let x = e.pageX - 10 + "px";
            let y = e.pageY - 10 + "px";
            yymbox.my_append(dom_autoclick, "div").then(dom_autoclick_item => {
                dom_autoclick_item.classList.add("autoclick_item_alone");
                dom_autoclick_item.style = `top:${y};left:${x}`;
                dom_autoclick_item.innerHTML = alone_click.list.length + 1;
                dom_autoclick_item.title = `【time:${alone_click.time}】【max:${alone_click.max}】【count:0】`;
                dom_autoclick_item.oncontextmenu = e => {
                    let d = alone_click.list[e.target.innerHTML - 1];
                    let r = prompt("修改参数，清空时删除该点位置。", `循环时间：${d.time}、最大次数：${d.max}、运行次数：${d.count}。`);
                    if (r == "") {
                        //为空时删除该点。
                        alone_click.list[e.target.innerHTML - 1].button.remove();
                        alone_click.list.splice(e.target.innerHTML - 1, 1);
                    } else {
                        try {
                            let t = r.match(/(?<=循环时间：)\d+/)[0];
                            let m = r.match(/(?<=最大次数：)\d+/)[0];
                            let c = r.match(/(?<=运行次数：)\d+/)[0];
                            d.time = t - 0;
                            d.max = m - 0;
                            d.count = c - 0;
                        } catch (err) { yymbox.msgbox("输入内容不合法。") }
                    }

                    re_alone_click();
                    e.preventDefault();
                };
                alone_click.list.push({
                    node: e.target,
                    button: dom_autoclick_item,
                    time: alone_click.time,
                    max: alone_click.max,
                    count: 0,
                    top: y,
                    left: x
                });
            })
        }

    };

    //重新渲染alone_click_item的按钮
    function re_alone_click() {
        // let dom_autoclick_item_alone = dom_autoclick.querySelectorAll(".autoclick_item_alone");
        // for (let item of dom_autoclick_item_alone) { item.remove() };

        if (alone_click.list.length == 0) { return false };

        alone_click.list.forEach((item, i) => {

            item.button.innerHTML = i + 1;
            item.button.title = `【time:${item.time}】【max:${item.max}】【count:${item.count}】`;

            // yymbox.my_append(dom_autoclick, "div").then(dom_autoclick_item => {
            //     dom_autoclick_item.classList.add("autoclick_item_alone");
            //     dom_autoclick_item.style = `top:${item.top};left:${item.left}`;
            //     dom_autoclick_item.innerHTML = i + 1;
            //     dom_autoclick_item.title = `【time:${item.time}】【max:${item.max}】【count:${item.count}】`;
            //     dom_autoclick_item.oncontextmenu = e => {
            //         let d = alone_click.list[e.target.innerHTML - 1];
            //         let r = prompt("修改参数，清空时删除该点位置。", `循环时间：${d.time}、最大次数：${d.max}、运行次数：${d.count}。`);
            //         if (r == "") {
            //             //为空时删除该点。
            //             alone_click.list.splice(e.target.innerHTML - 1, 1);
            //         }
            //         else {
            //             try {
            //                 let t = r.match(/(?<=循环时间：)\d+/)[0];
            //                 let m = r.match(/(?<=最大次数：)\d+/)[0];
            //                 let c = r.match(/(?<=运行次数：)\d+/)[0];
            //                 d.time = t - 0;
            //                 d.max = m - 0;
            //                 d.count = c - 0;
            //             } catch (err) { yymbox.msgbox("输入内容不合法。") }
            //         }
            //         re_alone_click();
            //         e.preventDefault();
            //     }
            // })
        })
    }

    //开始执行。
    yymbox.data[index].children[0].children[0].func = (e, item) => {
        let state = yymbox.is_stick(e);
        item.state = state;

        if (!state) { for (let i of alone_click.clock) { clearInterval(i) }; alone_click.clock = []; return false; }

        if (alone_click.list.length == 0) { return false };

        if (yymbox.data[index].children[0].children[1].state) { yymbox.data[index].children[0].children[1].node.click() };

        alone_click.list.forEach((item, i) => {
            let clock = setInterval(() => {
                if (alone_click.list[i].count < alone_click.list[i].max) {
                    alone_click.list[i].count++;
                    item.button.title = item.button.title.replace(/count:\d+/, "count:" + alone_click.list[i].count);
                    item.node.click();
                } else {
                    clearInterval(alone_click.clock[i])
                }
            }, item.time)
            alone_click.clock.push(clock);
        })

    };

    //添加点击位置。
    yymbox.data[index].children[0].children[1].func = (e, item) => {
        let state = yymbox.is_stick(e);
        item.state = state;
        if (state) { document.addEventListener("mousedown", add_alone_click); }
        else { document.removeEventListener("mousedown", add_alone_click); };
    }
    //设置循环时间。
    yymbox.data[index].children[0].children[2].func = (e, item) => {
        let time = prompt("输入点击时间间隔，1000为1秒，默认为100。");

        if (time == null) { return false };
        try {
            Number(time);
            alone_click.time = Math.ceil(time);
            item.node.innerHTML = `循环时间【${Math.ceil(time)}】`;
        } catch (error) {
            yymbox.msgbox("内容不合法，请输入数字。")
        }
    };

    //设置最大次数。
    yymbox.data[index].children[0].children[3].func = (e, item) => {
        let count = prompt("输入点击最大次数，默认为9999。");
        if (count == "") { return false };
        try {
            count = Math.ceil(Number(count));
            alone_click.max = count;
            item.node.innerHTML = `最大次数【${count}】`
        } catch (error) {
            yymbox.msgbox("内容不合法，请输入数字。")
        }
    };

    //查看所有位置。
    yymbox.data[index].children[0].children[4].func = (e, item) => {
        let text = alone_click.list.reduce((r, d, i) => r += `${i + 1}\t${Math.ceil(1000 / d.time) + "/秒"}\t${d.count}\t${d.max}\t${d.left}\t${d.top}\n`, "序号\t频率\t次数\tmax\tx轴\ty轴\n");
        yymbox.msgbox(text, 5000, "400px")
    };

    //清除所有位置。
    yymbox.data[index].children[0].children[5].func = (e, item) => {
        alone_click.list = [];
        for (let i of alone_click.clock) { clearInterval(i) };
        alone_click.clock = [];
        re_alone_click();
    };

    // ==================================================================================================
    //                                                顺序点击。
    // ==================================================================================================

    yymbox.data[index].children[1].func = (e, item) => {
        if (!dom_autoclick) {
            yymbox.msgbox("请点击【自动点击】按钮，开启功能。");
            return false;
        };

        if (yymbox.data[index].children[0].state) { yymbox.data[index].children[0].node.click() };

        let state = yymbox.is_stick(e);
        item.state = state;



        if (state) {
            dom_autoclick.style.display = "block";
        } else {
            dom_autoclick.style.display = "none";
        }

    };



    //添加一个顺序点击位置。
    function add_order_click(e) {
        if (!dom_autoclick) {
            yymbox.msgbox("请点击【自动点击】按钮，开启功能。");
            return false;
        };

        //判断单击的位置不是本脚本yymbox，才添加到清单。
        if (!is_dom_yymbox(e.target)) {
            let x = e.pageX - 10 + "px";
            let y = e.pageY - 10 + "px";
            yymbox.my_append(dom_autoclick, "div").then(dom_autoclick_item => {
                dom_autoclick_item.classList.add("autoclick_item_order");
                dom_autoclick_item.style = `top:${y};left:${x}`;
                dom_autoclick_item.innerHTML = order_click.list.length + 1;
                dom_autoclick_item.title = `【time:${order_click.time}】【max:${order_click.max}】【count:0】`;
                dom_autoclick_item.oncontextmenu = e => {
                    let d = order_click.list[e.target.innerHTML - 1];
                    let r = prompt("修改参数，清空时删除该点位置。", `循环时间：${d.time}、最大次数：${d.max}、运行次数：${d.count}。`);
                    if (r == "") {
                        //为空时删除该点。
                        order_click.list[e.target.innerHTML - 1].button.remove();
                        order_click.list.splice(e.target.innerHTML - 1, 1);
                    }
                    else {
                        try {
                            let t = r.match(/(?<=循环时间：)\d+/)[0];
                            let m = r.match(/(?<=最大次数：)\d+/)[0];
                            let c = r.match(/(?<=运行次数：)\d+/)[0];
                            d.time = t;
                            d.max = m;
                            d.count = c;
                        } catch (err) { yymbox.msgbox("输入内容不合法。") }
                    }

                    re_order_click();
                    e.preventDefault();
                };
                order_click.list.push({
                    node: e.target,
                    button: dom_autoclick_item,
                    time: order_click.time,
                    max: order_click.max,
                    count: 0,
                    top: y,
                    left: x
                });
            })
        }

    };

    //重新渲染order_click_item的按钮
    function re_order_click() {
        if (order_click.list.length == 0) { return false };

        order_click.list.forEach((item, i) => {
            item.button.innerHTML = i + 1;
            item.button.title = `【time:${item.time}】【max:${item.max}】【count:${item.count}】`;
        })
    }

    //开始执行。
    yymbox.data[index].children[1].children[0].func = (e, item) => {
        let state = yymbox.is_stick(e);
        item.state = state;

        if (!state) { for (let i of order_click.clock) { clearTimeout(i) }; order_click.clock = []; return false; }

        if (order_click.list.length == 0) { return false };

        if (yymbox.data[index].children[1].children[1].state) { yymbox.data[index].children[1].children[1].node.click() };

        //输入一数组，数组内的对象包含按钮和时间，按顺序执行。
        function next_click(arr) {
            let i = 0;
            function ground() {
                if (!arr[i]) {
                    order_click.count++;
                    yymbox.msgbox(`执行完第 ${order_click.count} 次`, 2000, "250px", "black", "#df8f27");
                    if (order_click.count < order_click.max) {
                        next_click(order_click.list);
                    } else {
                        yymbox.msgbox("执行完毕。", 5000, "250px", "black", "#df8f27");
                        order_click.count = 0;
                        order_click.clock = [];
                        item.node.click();

                        return false
                    }

                    return false
                };

                return new Promise(r => {
                    let colck = setTimeout(() => {
                        arr[i].node.click();
                        arr[i].count++;
                        arr[i].button.title = arr[i].button.title.replace(/count:\d+/, "count:" + arr[i].count);

                        i++;
                        r(ground());
                    }, arr[i].time);

                    order_click.clock.push(colck);
                })
            }

            ground();
        }

        next_click(order_click.list);

    };

    //添加点击位置。
    yymbox.data[index].children[1].children[1].func = (e, item) => {
        let state = yymbox.is_stick(e);
        item.state = state;
        if (state) { document.addEventListener("mousedown", add_order_click); }
        else { document.removeEventListener("mousedown", add_order_click); };
    }
    //设置间隔时间。
    yymbox.data[index].children[1].children[2].func = (e, item) => {
        let time = prompt("输入点击时间间隔，1000为1秒，默认为1500。");
        console.log(time);
        if (time == null) { return false };
        try {
            Number(time);
            order_click.time = Math.ceil(time);
            item.node.innerHTML = `循环时间【${Math.ceil(time)}】`;
        } catch (error) {
            yymbox.msgbox("内容不合法，请输入数字。")
        }
    };

    //设置最大次数。
    yymbox.data[index].children[1].children[3].func = (e, item) => {
        let count = prompt("输入点击最大次数，默认为9999。");
        if (count == "") { return false };
        try {
            count = Math.ceil(Number(count));
            order_click.max = count;
            item.node.innerHTML = `最大次数【${count}】`
        } catch (error) {
            yymbox.msgbox("内容不合法，请输入数字。")
        }
    };

    //查看所有位置。
    yymbox.data[index].children[1].children[4].func = (e, item) => {
        let text = order_click.list.reduce((r, d, i) => r += `${i + 1}\t${Math.ceil(1000 / d.time) + "/秒"}\t${d.count}\t${d.max}\t${d.left}\t${d.top}\n`, "序号\t频率\t次数\tmax\tx轴\ty轴\n");
        yymbox.msgbox(text, 5000, "500px")
    };

    //清除所有位置。
    yymbox.data[index].children[1].children[5].func = (e, item) => {
        order_click.list = [];
        for (let i of order_click.clock) { clearInterval(i) };
        order_click.clock = [];
        re_order_click();
    };



    // ==================================================================================================
    // ==================================================================================================

    //使用说明。
    yymbox.data[index].children[2].func = (e, item) => {
        let text = `
独立点击：每个按钮的点击计时是独立的。
顺序点击：按添加顺序，在点击完成上一个按钮后，再执行下一次点击。.

先点击【自动点击】按钮开始功能，然后选择点击类型。
点击【添加点击位置】添加规则，可以先设置【循环时间】【最大次数】，或者在序号上 右键 修改。
        `;
        yymbox.msgbox(text, 3000, "400px")

    }
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================



})()