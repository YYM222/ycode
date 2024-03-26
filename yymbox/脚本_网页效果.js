(function () {
    let index = 4;
    let dom_yymbox = document.querySelector("#yymbox");

    let Special_dom_list = {};

    //项目点击功能,<button>自动点击</button>
    yymbox.data[index].func = (e, item) => {
        let state = yymbox.is_stick(e);
    };




    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================

    //项目子菜单的按钮功能。

    // ==================================================================================================
    //                                              樱花飘落
    // ==================================================================================================
    yymbox.data[index].children[0].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-樱花飘落.js` }).then(el => Special_dom_list["樱花飘落"] = el);
        } else {
            Special_dom_list["樱花飘落"].remove();
            document.querySelector("#canvas_sakura").remove();
        }
    };
    // ==================================================================================================
    //                                               粒子运动
    // ==================================================================================================

    yymbox.data[index].children[1].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-粒子运动.js` }).then(el => Special_dom_list["粒子运动"] = el);
        } else {
            Special_dom_list["粒子运动"].remove();
            document.querySelector("#particles-js").remove();
        }
    };

    // ==================================================================================================
    //                                           背景 - 气泡效果
    // ==================================================================================================

    yymbox.data[index].children[2].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-气泡效果.js` }).then(el => Special_dom_list["气泡效果"] = el);
        } else {
            Special_dom_list["气泡效果"].remove();
            document.querySelector(".wrapper_Bubble").remove();
            clearInterval(window.wrapper_Bubble_time);
        }
    };

    // ==================================================================================================
    //                                           背景-顶部藤蔓
    // ==================================================================================================

    yymbox.data[index].children[3].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-顶部藤蔓.js` }).then(el => Special_dom_list["顶部藤蔓"] = el);
        } else {
            Special_dom_list["顶部藤蔓"].remove();
            document.querySelector("#vines_tree").remove();
            clearTimeout(window.vines_tree_1);
            clearTimeout(window.vines_tree_2);
        }
    };
    // ==================================================================================================
    //                                           背景-新年烟花
    // ==================================================================================================

    yymbox.data[index].children[4].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-新年烟花.js` }).then(el => Special_dom_list["新年烟花"] = el);
        } else {
            Special_dom_list["新年烟花"].remove();
            document.querySelector("#cas").remove();
            clearInterval(window.SpaceShuttle_time);
        }
    };
    // ==================================================================================================
    //                                           背景-太空穿梭
    // ==================================================================================================

    yymbox.data[index].children[5].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-太空穿梭.js` }).then(el => Special_dom_list["太空穿梭"] = el);
        } else {
            Special_dom_list["太空穿梭"].remove();
            document.querySelector("#SpaceShuttle").remove();
        }
    };

    // ==================================================================================================
    //                                           背景-3D光圈
    // ==================================================================================================

    yymbox.data[index].children[6].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-3D光圈.js` }).then(el => Special_dom_list["3D光圈"] = el);
        } else {
            Special_dom_list["3D光圈"].remove();
            document.querySelector("#lightcircle").remove();
        }
    };

    // ==================================================================================================
    //                                           背景-3D粒子
    // ==================================================================================================

    yymbox.data[index].children[7].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-3D粒子.js` }).then(el => Special_dom_list["3D粒子"] = el);
        } else {
            Special_dom_list["3D粒子"].remove();
            document.querySelector("#particle").remove();
        }
    };
    // ==================================================================================================
    //                                           背景-炫酷粒子
    // ==================================================================================================

    yymbox.data[index].children[8].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-炫酷粒子.js` }).then(el => Special_dom_list["炫酷粒子"] = el);
        } else {
            Special_dom_list["炫酷粒子"].remove();
            document.querySelector("#particle").remove();
        }
    };
    // ==================================================================================================
    //                                           背景-星空视差
    // ==================================================================================================

    yymbox.data[index].children[9].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (state) {
            yymbox.my_append(YYM, "script", { src: `${yymbox.yymbox_url}/yymbox/背景-星空视差.js` }).then(el => Special_dom_list["星空视差"] = el);
        } else {
            Special_dom_list["星空视差"].remove();
            document.querySelector("#particle").remove();
        }
    };
    // ==================================================================================================

    // ==================================================================================================

    //使用说明。
    // yymbox.data[index].children[2].func = (e, item) => {
    // }
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================



})()