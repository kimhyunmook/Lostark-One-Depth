import Raid_list from "./js/raid_list.js";
import Popup from "./js/popup.js";
import Character from "./js/character.js";
import { getCookie } from "./js/util.js";

const nav = "nav.menu";
const closebtn = document.querySelectorAll(
  `${nav} .menu-cover.active .closebtn`
);
[...closebtn].map((v, i) => {
  v.addEventListener("click", (e) => {
    e.preventDefault();
    const t = e.currentTarget;
    t.parentNode.children[0].value = "";
  });
});
const header = document.querySelector("header");
const raidList = Raid_list({ header });

if (getCookie("noPopup") !== "O") Popup();

const characters_serarch = document.querySelector(`${nav} .characters-search`);
characters_serarch.addEventListener("click", (e) => {
  e.preventDefault();
  const t = e.currentTarget;
  const user_name = t.parentNode.children[0];
  if (!!!user_name.value) {
    alert("캐릭터 이름이 비어 있습니다.");
    user_name.focus();
    return;
  }
  Character(user_name.value, raidList);
});
