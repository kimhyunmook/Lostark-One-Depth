import { css } from "./class.js";
/**
 * Create Element
 */
export function ce(
  des = {
    element: "div",
    className: "",
    inner: "",
    type: "",
    append: "",
  }
) {
  !!!des.element ? (des.element = "div") : des.element;
  const cre = document.createElement(des.element);
  if (des.element === "a") {
    cre.href = des.link;
  }
  !!des.className ? (cre.className = des.className) : null;
  if (!!des.inner) {
    if (des.element !== "img") cre.innerHTML = des.inner;
    else cre.src = des.inner;
  }
  !!des.append ? des.append.append(cre) : null;
  if (!!des.type) cre.dataset.type = des.type;
  return cre;
}

/**
 * Avatar 기준으로 만들어짐 json 에 tooltip 이 있는 경우만 사용
 * @param {*} target Object, Array
 * @param {*} tooltip String
 */
export function tooltip(target, tooltip) {
  if (typeof target !== "object") return null;
  const cover = ce({
    element: "div",
    className: "tooltip-cover lg:relative flex ",
    append: target.parentNode,
  });
  cover.append(target);
  const tooltip_box = ce({
    element: "div",
    className:
      "tooltip bg-[rgba(0,0,0,0.95)] min-w-72 text-white break-keep absolute hidden z-50 top-y-full lg:top-0 " +
      css.xCenter,
    append: cover,
  });

  if (!!!tooltip) return;
  tooltip = JSON.parse(tooltip);
  const element_value = Object.values(tooltip).reduce((a, c, i) => {
    Object.keys(tooltip)[i].includes("Element") ? a.push(c) : null;
    return a;
  }, []);

  function sizeRemove(target) {
    let c = target.replace("SIZE='12'", "");
    c = c.replace("SIZE='14", "");
    return c;
  }
  element_value.map((v, i) => {
    let style,
      style2 = "";
    let padding = "p-2 pl-3 pr-3 ";

    if (typeof v.value === "object") {
      let key = Object.keys(v.value);
      let value = Object.values(v.value);
      switch (v.type) {
        case "ItemTitle":
          style = ``;
          break;
        case "SymbolString":
          style = "flex flex-wrap";
          break;
        default:
          style = ``;
      }
      const inner_objcet = ce({
        element: "p",
        className: `innerObject ${style} relative ${padding} `,
        append: tooltip_box,
      });
      if (v.type !== "SymbolString")
        key.map((v2, i) => {
          let nob =
            value[i] !== 0 &&
            value[i] !== -1 &&
            value[i] !== "" &&
            key[i] !== "slotData";

          if (typeof value[i] === "string") value[i] = sizeRemove(value[i]);
          if (nob) {
            style = `whitespace-nowrap mb-1 `;
            let right = "";
            if (key[i].includes("rightStr")) {
              right = "absolute right-4 top-2";
            }
            ce({
              element: "p",
              className: `${key[i]} ${style} ${right}`,
              inner: value[i],
              append: inner_objcet,
            });
          }
        });
      else {
        ce({
          element: "p",
          className: `mb-2 `,
          inner: v.value.titleStr,
          append: inner_objcet,
        });
        let removeText = [
          "&tdc_kind ",
          "&tdc_smart",
          "&tdc_charm",
          "&tdc_courage",
        ];
        let t = removeText.reduce((a, c, i) => {
          a = a.replace(c, "");
          return a;
        }, v.value.contentStr);
        ce({
          element: "p",
          className: `w-full`,
          inner: t,
          append: inner_objcet,
        });
      }
    } else {
      if (typeof v.value === "string") v.value = sizeRemove(v.value);
      switch (v.type) {
        case "NameTagBox":
          style = `bg-zinc-800 ${padding}`;
          break;
        case "MultiTextBox":
          v.value = v.value.split("|")[1];
          style = "text-right";
          break;
      }
      ce({
        element: "div",
        className: `${v.type} ${padding} text-lg  ${style}`,
        inner: v.value,
        append: tooltip_box,
      });
    }
  });

  // avatar
  const attribute = tooltip?.AvatarAttribute;
  if (attribute?.IsInner) cover.classList.add("isinner");
}

/**
 * 장비 tooltip
 * @param {*} target
 * @param {*} tooltip
 */
export function equipmentTooltip(target, tooltip) {
  console.log(target);
  target.classList.add("group/equi");
  target.classList.add("relative");

  const tooltipcover = ce({
    className:
      "tooltip-cover bg-[rgba(0,0,0,0.95)] min-w-72 text-white break-keep absolute group-hover/equi:block hidden z-50 top-full lg:top-0",
    append: target,
  });
}
/**
 * tooltip으로 만들고 싶은 element
 * @param {*} target
 * @param {*} target2
 */
export function tooltip2(target) {
  target.parentNode.classList.add("group/tooltip2");
  target.parentNode.classList.add("relative");
  const tooltipcover = ce({
    className:
      "tooltip2 w-92 pt-4 pb-4 pl-2 pr-4 hidden group-hover/tooltip2:block absolute left-[80px] bg-white rounded-[20px] z-20",
    append: target.parentNode,
  });
  tooltipcover.append(target);
}

export const title = (text, addClass) =>
  `<h2 class="title-h2 ${addClass} ${css.big_title} ">${text}</h2>`;
export const title2 = (text, addClass) =>
  `<h3 class="${css.small_title} ${addClass}">${text}</h3>`;
export const label = (label, value, style) =>
  `<b class="${style}">${label}</b> ${value}`;
export const rounds = (target) => Math.round(target * 10) / 10;

export const onlyNum = (target) => {
  const reg = /[^0-9]/g;
  let result = target.replace(reg, "");
  result = parseInt(result);

  return result;
};
