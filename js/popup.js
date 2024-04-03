import { ce, title } from "../util.js";
export default function Popup() {
  let popupcover = ce({
    className: "fixed w-full h-full z-30 bg-[rgba(0,0,0,0.9)] top-0",
    append: document.body,
  });
  let popup = ce({
    className: `
    popup absolute w-[80%] pt-10 pb-12 pr-9 pl-9 bg-[rgba(255,255,255,0.9)] z-30 left-1/2 top-1/2 translate-x-[-50%] 
    translate-y-[-50%] rounded-lg flex items-center justify-center flex-wrap
    `,
    inner: title("공지사항", ""),
    append: popupcover,
  });
  ce({
    className: "closebtn",
    append: popup,
  });
  ce({
    element: "p",
    className: "text-lg w-full break-keep",
    inner: `안녕하세요 <b class="text-xl mr-1 ml-1">LostArk One Depth Spec</b>입니다. <br> 
      원하는 캐릭터의 스팩을 계산해 점수화 시켜 보여줍니다.  <br>
    점수 계산 방식은 제작자의 실제 경험을 통해 만들었으며 
    유저마다 기준은 다를 수 있습니다. <br>
    <br>
    p.s 구인 구직을 좀 더 편하게 하기 위해 만들었으며 스팩 자체를 빡빡하게 검사하지 않습니다.
      `,
    append: popup,
  });
}
