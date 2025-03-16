const Guide = function() {
    const init = () => {        
        // 加入 style
        let style = document.getElementsByTagName("style")[0];
        if (!style) {
            style = document.createElement("style");
            document.head.append(style);
        }
        style.innerHTML += css;
        // 加入/取得 guideLine
        guideLine = document.getElementById("guideLine");
        if (!guideLine) {
            guideLine = document.createElement("div");
            guideLine.id = "guideLine";
            document.body.append(guideLine);
        }

        console.info(mark_info, "Guide/init");
        return this;
    };

    const onMouseMove = (mouse) => {
        if (isDragging) {
            const x = mouse.clientX - offsetX;
            const y = mouse.clientY - offsetY;

            target.style.left = `${x}px`;
            target.style.top  = `${y}px`;
            console.info(mark_info, "Guide/onMouseMove");
        }
    }

    const onMouseUp = () => {
        isDragging = false;
        console.info(mark_info, "Guide/onMouseUp");
    }

    const onMouseDown = (mouse) => {
        isDragging = true;
        offsetX = mouse.clientX - target.offsetLeft;
        offsetY = mouse.clientY - target.offsetTop;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        console.info(mark_info, "Guide/onMouseDown");
    };

    const Bind = (targetId) => {
        target = document.getElementById(targetId);
        if (!target) return console.error(mark_err, "Guide/bind: ", "targetId:[", targetId, "] is null");
        target.className = "draggable";
        target.addEventListener('mousedown', onMouseDown);
        console.info(mark_info, "Guide/Bind");
        return this;
    };

    const css = `
        .draggable {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
            cursor: pointer;
        }
        .guide-line {
            position: absolute;
            background-color: lightgray;
            opacity: 0.5;
            pointer-events: none;
        }
    `;
    const mark_info = "ˊ=v=ˋb";
    const mark_err = "o_Oˋ?";
    let guideLine = null;
    let isDragging = false;
    let offsetX, offsetY;
    let target = null;

    init();

    return {Bind};
}