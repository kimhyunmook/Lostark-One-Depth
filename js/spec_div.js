import { ce } from "../util.js";
import { title } from "../util.js";

export default function Spec_div({ profilecover, cal }) {
  let style = "";

  const specDiv = ce({
    className:
      "specDiv z-20 bg-[rgba(0,0,0,0.9)] absolute w-[90%] h-[90%] p-2 left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] rounded-xl",
    inner: title("User Spec", "text-center text-5xl"),
    append: profilecover,
  });
  const specDivCloseBtn = ce({
    className: `closebtn`,
    inner: "",
    append: specDiv,
  });
  specDivCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    specDiv.remove();
  });
  const specContent = ce({
    className:
      "specCotent flex flex-wrap absolute w-[80%] left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]",
    append: specDiv,
  });
  ce({
    element: "h3",
    className: "text-4xl text-white text-center mb-5 w-full",
    inner: `TOTAL 점수: ${cal.total}`,
    append: specContent,
  });

  let userState = "BAD";
  style = "bg-red-700";
  switch (cal.state) {
    case "cut spec":
      userState = "CUT LINE";
      style = "bg-orange-400";
      break;
    case "nice spec":
      userState = "NICE";
      style = "bg-green-400";
      break;
    case "best spec":
      userState = "BEST";
      style = "bg-green-500";
      break;
    case "over spec":
      userState = "OVER SPEC";
      style = "bg-red-500";
      break;
    case "end spec":
      userState = "END SPEC";
      style = "bg-indigo-500";
      break;
  }
  ce({
    element: "p",
    className: `text-white text-center text-4xl min-w-[170px] p-3 ${style} m-auto rounded-xl`,
    inner: `${userState}`,
    append: specContent,
  });

  return specDiv;
}
