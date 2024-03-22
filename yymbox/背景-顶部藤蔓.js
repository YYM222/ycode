//id = vines_tree
//settime = window.vines_tree_1
//settime = window.vines_tree_2

function vines_tree() {
    let dom_vines_tree_ = document.querySelector("vines_tree");
    if (dom_vines_tree_) { dom_vines_tree_.remove() };

    let dom_vines_tree = document.createElement("div");
    dom_vines_tree.id = "vines_tree";
    dom_vines_tree.innerHTML = `<style>
#vines_tree{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    mix-blend-mode: exclusion;
}
.flower {
    filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .25));
    animation: grow 1s forwards
}

@keyframes grow {
    100% {
        transform: translateY(0%)
    }
}
</style>`;
    document.body.appendChild(dom_vines_tree);

    var flowers = 19;
    function addFlower() {

        var f = document.createElement("div");
        f.className = "flower";
        f.style.width = "3px";
        var num = Math.ceil(Math.random() * 15) * 5;
        f.style.height = num + "vh";
        f.style.background = "hsl(10deg,50%," + (Math.random() * 40 + 20) + "%)";
        f.style.position = "fixed";
        f.style.top = 0;
        f.style.left = flowers * 5 + 2.5 + "%";
        f.style.transform = "translateY(-100%)";
        f.style.animationDelay = Math.random() * 3 + "s";
        // f.style.animationDelay = "1s";
        f.style.animationDuration = num * 0.25 + "s";
        f.style.animationDirection = "alternate";
        // f.style.animationIterationCount = "infinite";
        f.style.animationIterationCount = "1";
        f.style.borderRadius = "0 0 1rem 1rem";
        f.style.pointerEvents = "none";
        flowers--;

        //leafs
        for (var i = 0; i < num * 0.4; i++) {
            var l = document.createElement("div");
            l.className = "leaf";
            var side = Math.random() < 0.5 ? "transform:scaleX(-1);" : "",
                show = Math.random() < 0.5 ? "hidden" : "",
                color = "hsl(150deg,50%," + (Math.random() * 40 + 20) + "%)";
            f.innerHTML += `<div class='leaf_box' style='width:3vh;height:2.5vh;background:${color};display:block;visibility:${show};border-radius:0% 75% 0% 75%;transform-origin:1.5px 50%;${side}'></div>`;
        }

        dom_vines_tree.appendChild(f);

        return f;
    }

    function buildWorld() {
        let flow_list = [];
        flowers = 19;
        for (var i = 0; i < 20; i++) {
            let f = addFlower();
            flow_list.push(f);
        }
        return flow_list
    }
    let flow_list = buildWorld();

    window.vines_tree_1 = setTimeout(() => {
        if (!dom_vines_tree) { return false };
        for (let flow of flow_list) {
            flow.style.animationIterationCount = 2;
        }
        window.vines_tree_2 = setTimeout(() => { dom_vines_tree.remove(); vines_tree() }, 20000);
    }, 120000)

}
vines_tree();