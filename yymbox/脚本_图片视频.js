(function () {
    let index = 3;

    //项目点击功能,<button>页面文本</button>
    yymbox.data[index].func = (e, item) => { yymbox.is_stick(e) };

    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================

    //项目子菜单的按钮功能。

    //功能一。
    //提取图片。
    let img_name = null;
    let img_name_index = 1;
    yymbox.data[index].children[0].func = (e, item) => {
        let state = yymbox.is_stick(e);
        if (!state) { document.querySelector("#box_img").remove(); return false };

        let dom = `
        <style>
            #box_img {
                display: flow;
                padding: 10px;
                background-color: #673ab7e0;
                background: linear-gradient(135deg, #c7e9fbcc, #a6defacc, #80d4f9cc, #5bc9f8cc, #35bef7cc);
                position: fixed;
                height: 100vh;
                overflow-y: auto;
                z-index: 999999;
            }
            
            #box_img>img {
                height: 200px;
                width:auto;
                margin: 5px;
                border: #4CAF50 5px solid;
                position: relative;
                transform: none;
            }
        </style>
`
        yymbox.my_append(document.body, 'div', { id: 'box_img', innerHTML: dom }, 'before').then(box_img => {
            let list = document.querySelectorAll('img');
            for (let item of list) {
                let copy_item = item.cloneNode();
                copy_item.addEventListener('click', () => window.open(copy_item.src));
                copy_item.addEventListener('contextmenu', e => {
                    img_name ? 1 : img_name = prompt("请输入图片保存的名字。");
                    download_img(copy_item.src, img_name + "-" + img_name_index++);
                    e.preventDefault();
                });
                box_img.appendChild(copy_item)
            };
        });
        yymbox.msgbox("点击图片：在新的标签页打开。\n右键图片：下载图片。\n\n【重设名字】：重新设置保存图片的文件名字。\n\n【自定义序号】：设置起始的序号。");

    };

    //下载图片函数。
    function download_img(url, name) {
        fetch(url)
            .catch(err => yymbox.msgbox(err))
            .then(res => { yymbox.msgbox("正在下载..."); return res.blob() })
            .then(blob => {
                let read = new FileReader;
                read.onload = e => {
                    let a = document.createElement("a");
                    a.href = e.target.result;
                    a.download = name;
                    a.click();
                }
                read.readAsDataURL(blob);
            })
    };

    //使用说明。
    yymbox.data[index].children[0].children[0].func = (e, item) => { yymbox.msgbox("点击图片：在新的标签页打开。\n右键图片：下载图片。\n\n【重设名字】：重新设置保存图片的文件名字。\n\n【自定义序号】：设置起始的序号。") };

    //重设名字。
    yymbox.data[index].children[0].children[1].func = (e, item) => { img_name = prompt("请输入图片保存的名字。"); img_name_index = 1; };

    //自定义开始序号。
    yymbox.data[index].children[0].children[2].func = (e, item) => { img_name_index = prompt("请输入图片保存的开始序号。") };



    // ==================================================================================================
    // ==================================================================================================

    //功能二。
    //设置视频速度。
    yymbox.data[index].children[1].func = (e, item) => {
        // let state = yymbox.is_stick(e);
        let video_list = document.querySelectorAll("video");
        yymbox.msgbox(`共找到${video_list.length}个视频。`);
        let rate = 1;
        if (video_list.length > 0) { rate = prompt("请输入视频播放速度。【0 ~ 16】") };
        for (let item of video_list) { item.playbackRate = rate };
    };

    function change_video_rate(rate) {
        let video_list = document.querySelectorAll("video");
        yymbox.msgbox(`共找到${video_list.length}个视频。`);
        for (let item of video_list) { item.playbackRate = rate };
    };

    yymbox.data[index].children[1].children[0].func = (e, item) => {
        change_video_rate(0.5);
    };
    yymbox.data[index].children[1].children[1].func = (e, item) => {
        change_video_rate(1.25);
    };
    yymbox.data[index].children[1].children[2].func = (e, item) => {
        change_video_rate(1.5);
    };
    yymbox.data[index].children[1].children[3].func = (e, item) => {
        change_video_rate(1.75);
    };
    yymbox.data[index].children[1].children[4].func = (e, item) => {
        change_video_rate(2.0);
    };






    // ==================================================================================================
    // ==================================================================================================

    //功能三。
    yymbox.data[index].children[2].func = (e, item) => {
        let state = yymbox.is_stick(e);
    }
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================
    // ==================================================================================================



})()