/**
 * Create Element
 */
export function ce(des = {
    element: 'div',
    className: "",
    inner: "",
    type: "",
    append: "",
}) {
    const cre = document.createElement(des.element);
    if (des.element === 'a') {
        cre.href = des.link
    }
    !!des.className ?
        cre.className = (des.className) : null;
    if (!!des.inner) {
        if (des.element !== 'img')
            cre.innerHTML = des.inner;
        else cre.src = des.inner;
    }
    !!des.append ?
        des.append.append(cre) : null;
    if (!!des.type) cre.dataset.type = des.type
    return cre;
}

/**
 * Avatar 기준으로 만들어짐
 * @param {*} target Object, Array
 * @param {*} tooltip String
 */
export function tooltip(target, tooltip) {
    if (typeof target !== 'object') return null;
    const cover = ce({ element: 'div', className: 'tooltip-cover', append: target.parentNode });
    cover.append(target);
    const tooltip_cover = ce({ element: 'div', className: 'tooltip', append: cover })
    tooltip = JSON.parse(tooltip)
    const element_value = Object.values(tooltip).reduce((a, c, i) => {
        Object.keys(tooltip)[i].includes('Element') ? a.push(c) : null
        return a;
    }, [])

    function sizeRemove(target) {
        let c = target.replace("SIZE='12'", '');
        c = c.replace("SIZE='14", '')
        return c;
    }
    element_value.map((v, i) => {
        if (typeof v.value === 'object') {
            let key = Object.keys(v.value);
            let value = Object.values(v.value);
            const inner_objcet = ce({ element: 'p', className: "innerObject", append: tooltip_cover });
            key.map((v2, i) => {
                let nob = key[i] !== 'bEquip' && key[i] !== "qualityValue" && key[i] !== "slotData";

                if (typeof value[i] === 'string')
                    value[i] = sizeRemove(value[i]);
                if (nob)
                    ce({ element: 'span', className: '', inner: value[i], append: inner_objcet })
            })
            // console.log(key, value)
        }
        else {
            if (typeof v.value === 'string') v.value = sizeRemove(v.value);
            ce({ element: 'div', className: v.type, inner: v.value, append: tooltip_cover })
        }
    })

    // avatar
    const attribute = tooltip?.AvatarAttribute;
    if (attribute?.IsInner) cover.classList.add('isinner');

}

export const title = (text) => `<h2>${text}</h2>`;
export const title2 = (text) => `<h3>${text}</h3>`;
export const label = (label, value) => `<b>${label}</b> ${value}`;

