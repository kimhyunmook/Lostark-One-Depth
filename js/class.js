export const css = {
  xCenter: " left-1/2 translate-x-[-50%]",
  gradient: (from, to) => {
    return ` bg-gradient-to-br from-[${from}] to-[${to}]`;
  },

  cover: "bg-zinc-700 p-5 grid gap-10",
  cover_div: "grid grid-cols-2 md:grid-cols-3 gap-4",
  cover_div_under: "grid gap-5",
  cover_img: "m-auto mb-3",
  big_title:
    " text-2xl pl-2 pt-1 md:p-0 md:text-3xl font-bold col-span-2 md:col-span-3 mb-4 w-full",
  small_title: " text-2xl text-slate-300 font-bold",
  avatar: " grid gap-3",
  legend: " overflow-hidden bg-gradient-to-br from-[#362003] to-[#9e5f04]",
  hero: " overflow-hidden bg-gradient-to-br from-[#261331] to-[#480d5d]",

  border: " bg-violet-100 rounded-lg pl-3 pr-3 inline-block overflow-hidden ",

  tag: "rounded-xl border bg-violet-100 p-1 text-sm mr-1 ml-1",
};
