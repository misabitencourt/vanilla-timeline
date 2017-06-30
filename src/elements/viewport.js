var docElem = window.document.documentElement;

export function getViewportH() {
    var client = docElem['clientHeight'],
        inner = window['innerHeight'];
        
    if( client < inner )
        return inner;
    else
        return client;
}

export function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
}

// http://stackoverflow.com/a/5598797/989439
export function getOffset( el ) {
    var offsetTop = 0, offsetLeft = 0;
    do {
        if ( !isNaN( el.offsetTop ) ) {
            offsetTop += el.offsetTop;
        }
        if ( !isNaN( el.offsetLeft ) ) {
            offsetLeft += el.offsetLeft;
        }
    } while( el = el.offsetParent );

    return {
        top : offsetTop,
        left : offsetLeft
    };
}

export function inViewport( el, h ) {
    var elH = el.offsetHeight,
        scrolled = scrollY(),
        viewed = scrolled + getViewportH(),
        elTop = getOffset(el).top,
        elBottom = elTop + elH,
        // if 0, the element is considered in the viewport as soon as it enters.
        // if 1, the element is considered in the viewport only when it's fully inside
        // value in percentage (1 >= h >= 0)
        h = h || 0;

    return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
}