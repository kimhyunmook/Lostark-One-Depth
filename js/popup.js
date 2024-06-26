import { ce, label, title } from "./util.js";
export default function Popup() {
  let popupcover = ce({
    className: "fixed w-full h-full z-30 bg-[rgba(0,0,0,0.6)] top-0",
    append: document.body,
  });
  let popup = ce({
    className: `
    popup absolute w-[95%] lg:w-[30%] p-6 lg:pt-10 lg:pb-12 lg:pr-9 lg:pl-9 
    bg-[rgba(255,255,255,1)] z-30 left-1/2 top-1/2 translate-x-[-50%] 
    translate-y-[-50%] rounded-lg flex items-center justify-center flex-wrap
    md:pt-10 md:w-[40%] 
    `,
    inner: title("공지사항", ""),
    append: popupcover,
  });
  ce({
    className: "closebtn",
    append: popup,
  }).addEventListener("click", (e) => {
    e.preventDefault();
    const t = e.currentTarget.parentNode.parentNode;
    t.remove();
  });
  ce({
    element: "p",
    className: "text-sm lg:text-lg w-full break-keep",
    inner: `안녕하세요 <b class="text-md lg:text-xl mr-1 ml-1">LostArk One Depth Spec</b>입니다. <br class="hidden lg:block"/> 
      원하는 캐릭터의 스팩을 계산해 점수화 시켜 보여줍니다.  <br class="hidden lg:block" />
    점수 계산 방식은 제작자의 실제 경험을 통해 만들었으며 
    유저마다 기준은 다를 수 있기에 참고만 부탁드립니다. <br>
    <br>
    <b>p.s</b> 구인 구직을 좀 더 편하게 하기 위해 만들었으며, 팔찌 특옵은 계산하고 있지 않습니다. 
    서포터는 멸화를 끼지 않을 경우 점수가 현저히 낮게 나올 수 있습니다.
      `,
    append: popup,
  });
  const checkbox = ce({
    className: "mt-4 flex items-center justify-center",
    append: popup,
  });
  const check = ce({
    element: "input",
    className: "block mr-1",
    append: checkbox,
  });
  ce({
    element: "label",
    inner: "오늘 하루 안보기",
    append: checkbox,
  });
  check.type = "checkbox";
  check.addEventListener("click", (e) => {
    document.cookie = `noPopup=O; Path=/; Max-Age=${3600 * 24}`;
    popupcover.remove();
  });
}
