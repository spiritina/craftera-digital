import {throttle} from "lodash";

export function btnHovers() {
    const btnForRotate = document.querySelectorAll('.btn-perspective__inner');

    Array.from(btnForRotate).forEach( elem => {
        const boundingClientRect = elem.getBoundingClientRect();
        const rotatedElem = elem.querySelector('.btn')
        const tl = new TimelineMax();

        const onMouseMove = function(e) {
            tl.clear()
            // const screenSizes = parseInt(boundingClientRect.top / widowStore.windowHeight());
            const x = e.clientX - boundingClientRect.left;
            // const y = e.clientY - (boundingClientRect.top - widowStore.windowHeight() * screenSizes)

            const xc = boundingClientRect.width / 2;
            // const yc = boundingClientRect.height / 2;

            let dx = x - xc

            tl.to(rotatedElem, 0.1, {rotationY:  dx / 15})

        }

        elem.onmousemove = onMouseMove;

        elem.onmouseleave = function(e) {
            tl.clear()
            tl.to(rotatedElem, 0.2, {rotationY:  0})
        }
    })
}
