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
        cre.classList.add(des.className) : null;
    if (!!des.inner) {
        if (des.element !== 'img')
            cre.innerHTML = des.inner;
        else cre.src = des.inner;
    }
    !!des.append ?
        des.append.append(cre) : null;
    if (!!des.type) cre.dataset.type=des.type
    return cre;
}

export const title = (text) => `<h2>${text}</h2>`;
export const title2 = (text) => `<h3>${text}</h3>`;
export const label = (label, value) => `<b>${label}</b> ${value}`

