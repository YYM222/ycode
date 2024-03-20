(function () {
    let index = 2;


    //项目点击功能,<button>页面文本</button>
    yymbox.data[index].func = (e, item) => { yymbox.is_stick(e) };

    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================

    //项目子菜单的按钮功能。

    //功能一。
    //页面可编辑。
    yymbox.data[index].children[0].func = (e, item) => {
        let state = yymbox.is_stick(e);
        document.body.contentEditable = state;
    };

    // ==================================================================================================
    // ==================================================================================================

    //功能二。
    //复制文本。
    yymbox.data[index].children[1].func = (e, item) => {
        // let state = yymbox.is_stick(e);
        yymbox.msgbox("已复制到剪切板：\n\n" + window.getSelection().toString(), 3000);
        yymbox.copy_simula(window.getSelection().toString());
    };

    // ==================================================================================================
    // ==================================================================================================

    //功能三。
    //清除脚本。
    yymbox.data[index].children[2].func = (e, item) => {
        let a = setInterval(() => { }, 100000);
        let b = setTimeout(() => { }, 100000);
        let c = document.querySelectorAll('a');

        //去除所有计时事件。
        let i = 0; while (i < a) { clearInterval(i); i++ };
        let j = 0; while (j < b) { clearTimeout(j); j++ };
        //关闭 a 链接。
        c.forEach(item => (item.href = "javascript:void(0)", item.target = ""));
        //去除事件。
        document.body.innerHTML = document.body.innerHTML;

        yymbox.msgbox(`setInterval：${a}</br>setTimeout：${b}</br>BOM：${c.length}`);

        //重新加载yymbox插件
        document.querySelector("#YYM").remove();
        yymbox.load();
    }

    // ==================================================================================================
    // ==================================================================================================

    //清除页面的iframe。
    yymbox.data[index].children[3].func = (e, item) => {
        let state = yymbox.is_stick(e);
        let dom_iframe = document.querySelectorAll("iframe");
        for (let item of dom_iframe) { item.remove };

    }
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================



})()