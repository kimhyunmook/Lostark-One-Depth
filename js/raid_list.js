import { ce, title2 } from "./util.js";
import { endContent } from "./schema.js";

export default function Raid_list({ header }) {
  const cover = ce({
    element: "form",
    className:
      "listBox fixed z-40 top-4 left-5 bg-white p-2 rounded-lg md:w-[200px] md:p-3",
    append: header,
  });
  window.addEventListener("scroll", (e) => {
    console.log(window.scrollY);
    if (window.scrollY > 900) cover.classList.add("hidden");
    else cover.classList.remove("hidden");
  });

  cover.nmae = "endContent";
  const endContentllist = listUlCreate(endContent, "endContent", cover);
  endContentllist.value.map((v, i) => {
    let name = v.raidname;
    let li = liCreate(name, "endContent", endContentllist.ul);
    // console.log(li.input);
    let color1 = "text-black";
    let color2 = ["text-red-400", "font-black"];
    if (i === 0) {
      li.input.checked = true;
      li.label.classList.remove(color1);
      color2.map((v) => li.label.classList.add(v));
    }
    li.li.addEventListener("click", (e) => {
      e.preventDefault();
      e.currentTarget.children[0].checked = true;
      [...document.querySelectorAll(".endContent_li")].map((v) => {
        color2.map((v2) => v.children[1].classList.remove(v2));
        v.children[1].classList.add(color1);
      });
      if (e.currentTarget.children[0].checked) {
        e.currentTarget.children[1].classList.remove(color1);
        color2.map((v) => e.currentTarget.children[1].classList.add(v));
      }
      const specDiv = document.querySelector(".specDiv");
      if (!!specDiv) {
        specDiv.remove();
      }
    });
  });
  let endContent_target = document.forms[1].endContent;

  return endContent_target;
}
function listUlCreate(t, cn, cover) {
  //   console.log(t);
  if (typeof t === "object") {
    const ul = ce({
      element: "ul",
      className: cn,
      append: cover,
    });
    return {
      ul,
      value: Object.values(t),
    };
  }
}
function liCreate(t, cn, cover) {
  let li = ce({
    element: "li",
    className: `${cn}_li p-1 border-b md:p-2 transition ease-in-out delay-150`,
    append: cover,
  });
  let input = ce({
    element: "input",
    className: `${cn}_input hidden`,
    append: li,
  });
  let label = ce({
    element: "label",
    className: `${cn}_label text-black`,
    inner: t,
    append: li,
  });
  input.type = "radio";
  input.name = cn;
  input.value = t;
  label.htmlFor = cn;
  return {
    input,
    label,
    li,
  };
  //   console.log(input);
}
