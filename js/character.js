import {
  ce,
  title,
  label,
  tooltip,
  tooltip2,
  rounds,
  onlyNum,
} from "../js/util.js";
import { endContent, userSpec } from "../js/schema.js";
import { css } from "../js/class.js";
import Calculator from "../js/calculator.js";
import Spec_div from "../js/spec_div.js";
import key from "../key.js";

let url = key.url;
let headers = key.headers;
let outputview = key.outputview;

export default function Character(target, raidList) {
  let style = "";
  axios
    .get(url + `/armories/characters/${target}`, { headers })
    .then((res) => {
      const data = res.data;
      if (!!!data) {
        alert("존재하지 않는 유저입니다.");
        return;
      }

      outputview.innerHTML = null;
      console.log("full data", data);

      //footer 추가전까지
      const character = ce({
        element: "div",
        className:
          "cover-character pb-[200px] bg-zinc-700 p-3 md:p-5 grid gap-10 overflow-hidden",
      });
      let coverInit = {
        element: "div",
        append: character,
      };

      const profile = data.ArmoryProfile;
      userSpec.name = target;
      userSpec.skillpoint = profile.TotalSkillPoint;
      userSpec.itemlevel = profile.ItemAvgLevel;
      userSpec.title = profile.Title;
      userSpec.level = profile.CharacterLevel;

      const profilecover = ce({
        ...coverInit,
        className:
          "profile-cover relative rounded-lg md:p-2 bg-[#15181D] w-full overflow-hidden",
        inner: title("User Profile"),
      });
      const specButton = ce({
        element: "button",
        className:
          "specButton z-10 bg-green-500 absolute bottom-6 md:bottom-0 md:top-6 text-white font-black text-xl p-2 w-40 h-12 rounded-lg hover:bg-green-600 active:text-white" +
          css.xCenter,
        inner: "SPEC 검사",
        append: profilecover,
      });
      specButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (!!!document.querySelector(".specDiv")) {
          const raid = Object.values(endContent).filter(
            (x) => x.raidname === raidList.value
          )[0];
          const cal = Calculator(userSpec, raid);
          console.log("cal", cal);
          Spec_div({ profilecover, cal });
        }
      });

      const infocover = ce({
        element: "div",
        className:
          "profile-info-cover p-2 absolute h-full max-h-[600px] min-w-[200px]",
        append: profilecover,
      });
      // const statscover = ce({
      //   element: "div",
      //   className: "profile-stats-cover absolute bottom-1",
      //   inner: title2("특성"),
      //   append: profilecover,
      // });
      /** 특성 */
      let states = [];
      profile.Stats?.map((el) => {
        let allpotion = 66;
        // ce({
        //   element: "p",
        //   className: "stats",
        //   inner: label(el.Type, el.Value),
        //   append: statscover,
        // });
        if (
          el.Value - allpotion > 100 &&
          el.Type !== "공격력" &&
          el.Type !== "최대 생명력"
        ) {
          states.push({ name: el.Type, value: Number(el.Value) });
        }
      });

      userSpec.status.value = states;
      userSpec.status.sum = states.reduce((a, c) => (a += c.value), 0);

      /** 정보 */
      if (!!!profile.CharacterImage) {
        ce({
          element: "p",
          className:
            "character-img flex items-center justify-center text-white text-5xl block m-auto h-[700px]",
          inner: "이미지 없음",
          append: profilecover,
        });
      } else
        ce({
          element: "img",
          className: "character-img block m-auto",
          inner: profile.CharacterImage,
          append: profilecover,
        });
      ce({
        element: "h3",
        className: "name text-4xl text-white font-black mt-2 mb-2",
        inner: profile.CharacterName,
        append: infocover,
      });

      let labelstyle = `font-black`;
      const infoInit = {
        element: "p",
        append: infocover,
        className: "mb-1 mt-1 text-white text-xl",
      };
      ce({
        element: "h3",
        className: "text-xl md:text-3xl text-white mt-2 mb-4 font-black",
        inner: label("Lv", profile.ItemAvgLevel, labelstyle),
        append: infocover,
      });
      ce({
        ...infoInit,
        inner: label("서버", profile.ServerName, labelstyle),
      });
      ce({
        ...infoInit,
        inner: label("클래스", profile.CharacterClassName, labelstyle),
      });
      ce({
        ...infoInit,
        inner: label("전투", profile.CharacterLevel, labelstyle),
      });

      ce({
        ...infoInit,
        inner: label("원정대", profile.ExpeditionLevel, labelstyle),
      });
      ce({
        ...infoInit,
        inner: label("칭호", profile.Title, labelstyle),
      });

      //---------------장비
      const equipment = !!data.ArmoryEquipment ? data.ArmoryEquipment : 0;
      const equipmentcover = ce({
        ...coverInit,
        className: "equipment-cover flex justify-between flex-wrap items-start",
        inner: title("착용 장비"),
      });

      let armor = [];
      function eq_ce(start, last) {
        const boxcover = ce({
          className:
            "equipment-cover-box bg-white w-[100%] md:w-[49%] rounded-lg p-2 md:mb-0 mb-4",
          append: equipmentcover,
        });

        let tooltip, grade, style2, str, type;
        let obj = {};
        let s = 16; // 이미지 사이즈
        for (let i = start; i < last; i++) {
          grade = equipment[i]?.Grade;
          type = equipment[i]?.Type;
          switch (grade) {
            case "고대":
              style = "from-[#3d3325] to-[#dcc999]";
              style2 = "text-[#D9AB48]";
              break;
            case "유물":
              style = "from-[#341a09] to-[#a24006]";
              style2 = "text-[#a24006]";
              break;
          }
          // 장비가 없을 때
          if (!!!equipment[i]) return;

          tooltip = JSON.parse(equipment[i]?.Tooltip);
          // console.log(tooltip);
          const infotext = (target, type) => {
            let value = Object.values(tooltip);
            let result = value.filter((x) => x.type === target);
            let index = 0;

            switch (type) {
              case "상급 재련":
                index = 2;
                break;
              case "추가 효과":
                index = 1;
                break;
            }

            if (target === "IndentStringGroup") {
              result?.map((v, i) => {
                let values = Object.values(v.value);
                if (values?.length < 3) {
                  if (values[0]?.topStr?.includes(type)) {
                    obj = values[0].contentStr;
                    str = values[0].topStr;
                  }
                }
              });

              str = ce({ element: "p", inner: str });
              let obj_v = Object.values(obj);
              let arr = [];
              switch (type) {
                case "초월":
                  if (str.childNodes.length > 0)
                    [...str.childNodes].map((v) => {
                      if (v.nodeName === "IMG") {
                        v.src = "";
                      }
                    });
                  str = str.textContent.replace("[초월] ", "Lv").split("단계");
                  str = !!str[1]
                    ? str[0] + `<b class="text-black"> +${str[1].trim()}</b>`
                    : null;
                  result = str;
                  break;
                case "연성 추가 효과":
                  str = str.textContent.replace(type, "");
                  obj_v.map((v, i) => {
                    let bp = v.bPoint;
                    let conStr = v.contentStr;
                  });
                  break;
                case "엘릭서":
                  arr = [];
                  result = [];
                  obj_v.map((v, i) => {
                    v.contentStr = v.contentStr
                      .replace("<br>", " ")
                      .replace("(혼돈)", "")
                      .replace("(질서)", "")
                      .split(" ");
                    v.contentStr = v.contentStr.reduce((a, c, i) => {
                      if (!!c) a.push(c);
                      return a;
                    }, []);
                    let conStr = ce({ inner: v.contentStr }).textContent.split(
                      ","
                    );
                    arr.push({
                      name: !!onlyNum(conStr[2])
                        ? conStr[0] !== "[공용]"
                          ? `[특옵]${conStr[1]}`
                          : conStr[1]
                        : conStr[0] !== "[공용]"
                          ? `[특옵]${conStr[1]} ${conStr[2]}`
                          : `${conStr[1]} ${conStr[2]}`,
                      lv: !!onlyNum(conStr[2])
                        ? onlyNum(conStr[2])
                        : onlyNum(conStr[3]),
                    });
                  });
                  result.push(arr);
                  break;
              }
              return result;
            } else {
              result = result[index]?.value;
              if (typeof result === "object") {
                delete result.bEquip;
                delete result.slotData;
                switch (type) {
                  case "품질":
                    result = `<b>${result.leftStr1}</b>  ${result.qualityValue}`;
                    break;
                  case "아이템 레벨":
                    result = !!result.leftStr2
                      ? `${result?.leftStr2?.replace("아이템 레벨", "").replace("(티어 3)", "").trim()}`
                      : "";
                    break;
                  case "추가 효과":
                    result = `${result?.Element_001.replace("<BR>", " ")}`;
                    break;
                  default:
                    result = `${result.leftStr0}`;
                }
              }
              if (index === 2 && !result?.includes("상급 재련")) {
                result = "";
              }

              return ce({ element: "p", inner: result }).textContent;
            }
          };

          let info;
          if (i < 6) {
            info = {
              itemname: infotext("NameTagBox"),
              itemquality: infotext("ItemTitle", "품질"),
              itemlevel: infotext("ItemTitle", "아이템 레벨"),
              advenceLevel: infotext("SingleTextBox", "상급 재련")
                .replace(
                  "[상급 재련]",
                  `<img class="w-[${s}px] mr-1" src="./img/echidna.png">`
                )
                .trim(),
              transendence: infotext("IndentStringGroup", "초월"),
              elixir: infotext("IndentStringGroup", "엘릭서"),
            };
            // console.log("info", info);
          } else {
            info = {
              itemname: infotext("NameTagBox"),
              itemquality: infotext("ItemTitle", "품질"),
              option: infotext("ItemPartBox", "추가 효과"),
            };
          }

          let quality = tooltip.Element_001.value.qualityValue;
          let qualitystyle = "";
          switch (true) {
            case quality === 100:
              qualitystyle = "bg-[#f9ae00]";
              break;
            case quality >= 90 && quality < 100:
              qualitystyle = "bg-[#8045DD]";
              break;
            case quality >= 70 && quality < 90:
              qualitystyle = "bg-[#2AB1F6]";
              break;
            case quality < 70 && quality > 0:
              qualitystyle = "bg-[#91F202]";
              break;
          }

          if (type === "무기") {
            userSpec.wepon.stage =
              equipment[i]?.Grade === "에스더"
                ? Number(info.itemname.split(" ")[0].replace("+", "")) + 17
                : Number(info.itemname.split(" ")[0].replace("+", ""));
            userSpec.wepon.quality = Number(info.itemquality.split(" ")[2]);
            userSpec.wepon.transcendence = !!info.transendence
              ? Number(
                  ce({ inner: info.transendence })
                    .textContent.split(" ")[1]
                    .replace("+", "")
                )
              : 0;
            userSpec.wepon.itemlevel = info.itemlevel;
          } else if (
            type === "투구" ||
            type === "상의" ||
            type === "하의" ||
            type === "장갑" ||
            type === "어깨"
          ) {
            let armor_info = {
              quality: Number(info.itemquality.split(" ")[2]),
              stage: Number(info.itemname.split(" ")[0].replace("+", "")),
              itemlevel: Number(info.itemlevel),
              transcendence: !!info.transendence
                ? Number(
                    ce({ inner: info.transendence })
                      .textContent.split(" ")[1]
                      .replace("+", "")
                  )
                : 0,
              elixirOption: [],
              elixir: 0,
            };
            armor_info.elixir = info.elixir.reduce((a, c, i) => {
              let lvsum = c.reduce((a2, c2, i2) => {
                if (type === "투구" || type === "장갑") {
                  let special = "[특옵]";
                  if (c2.name.includes(special)) {
                    armor_info.elixirOption.push(c2.name.replace(special, ""));
                  }
                }
                a2 += c2.lv;
                return a2;
              }, 0);
              a += lvsum;
              return a;
            }, 0);
            armor.push(armor_info);
            // console.log(armor_info);
          }

          let h = quality > 0 ? " h-20 " : "h-16";
          let pb = quality < 0 ? "pb-6" : "pb-2";
          const typecover = ce({
            className: "equipments mb-4 flex border-b " + pb,
            append: boxcover,
          });
          const imgcover = ce({
            className:
              "equipment-img-cover flex w-[50px] md:w-[64px] relative rounded-md overflow-hidden bg-gradient-to-br mr-3 " +
              style +
              h,
            append: typecover,
          });
          ce({
            element: "img",
            className: "equipment-img w-16 h-16 ",
            inner: equipment[i].Icon,
            append: imgcover,
          });

          if (quality > 0)
            ce({
              element: "p",
              className:
                "quality absolute bottom-0 left-0 w-full h-[1.2rem] text-white font-black text-center leading-4 text-md pt-[0.1em] " +
                qualitystyle,
              inner: quality,
              append: imgcover,
            });

          const spec = ce({
            className:
              "spec pt-1 flex flex-wrap items-start max-w-[350px] md:min-w-[290px] w-[80%]",
            append: typecover,
          });

          ce({
            element: "p",
            className: `item-name text-lg ${style2} font-black leading-4 w-full`,
            inner: equipment[i].Name,
            append: spec,
          });
          if (!!info?.transendence) {
            ce({
              element: "p",
              className: ` font-black flex items-center justify-center pt-1 mr-1 text-sm `,
              inner: `<img src="./img/trancendence.png" class="w-5 w-[${s}px] h-[${s}px] max-w-[${s}px] max-h-[${s}px] mr-1" /> 
                <b class="text-[#D9AB48]" >${info.transendence}</b>`,
              append: spec,
            });
          }

          ce({
            element: "p",
            className: `advence tracking-tight font-black text-sm p-1 flex items-center text-[#]`,
            inner: info?.advenceLevel,
            append: spec,
          });

          if (!!info?.option) {
            ce({
              element: "p",
              className: `text-sm font-bold text-[#999]`,
              inner: info.option,
              append: spec,
            });
          }
        }
      }

      // // 장비
      eq_ce(0, 6);
      let sumArmor = armor.reduce(
        (a, c, i) => {
          if (c.elixirOption.length > 0) {
            a.elixirOption.push(c.elixirOption);
          }
          a.elixir += !!c.elixir ? c.elixir : 0;
          a.quality += c.quality;
          a.stage += c.stage;
          a.transcendence += c.transcendence;
          a.itemlevel += c.itemlevel;
          return a;
        },
        {
          elixirOption: [],
          elixir: 0,
          quality: 0,
          stage: 0,
          transcendence: 0,
          itemlevel: 0,
        }
      );
      userSpec.elixir.lv = sumArmor.elixir;
      if (sumArmor.elixirOption.length > 1)
        userSpec.elixir.special =
          sumArmor?.elixirOption[0][0] === sumArmor?.elixirOption[1][0]
            ? true
            : false;
      userSpec.armor.quality = rounds(sumArmor.quality / armor.length);
      userSpec.armor.stage = rounds(sumArmor.stage / armor.length);
      userSpec.armor.transcendence = rounds(sumArmor.transcendence);
      userSpec.armor.itemlevel = rounds(sumArmor.itemlevel / armor.length);

      // // 악세
      eq_ce(6, 12);

      const gem = data.ArmoryGem;
      const gemeffects = gem?.Effects;
      const gems = gem?.Gems;
      const gemcover = ce({
        ...coverInit,
        className: "gems-cover",
        inner: title("보석"),
      });
      const gemeffectscover = ce({
        element: "div",
        className:
          "gemeffects-cover flex flex-wrap lg:grid-cols-11 relative bg-white pt-4 pb-4 md:p-4 rounded-lg",
        append: gemcover,
      });
      const attkgem = [];
      const coolgem = [];
      gemeffects?.map((el, i) => {
        const gems_ = gems?.filter((x) => x.Slot === el.GemSlot);
        const gemlv = Number(
          ce({ inner: gems_[0].Name }).textContent.split("레벨")[0]
        );
        const gemkind = ce({ inner: gems_[0].Name })
          .textContent.split("레벨")[1]
          .trim();

        if (gemkind.includes("멸화")) attkgem.push(gemlv);
        else if (gemkind.includes("홍염")) coolgem.push(gemlv);

        let [from, to] = ["#1a230e", "#374e18"];
        if (gemlv > 9) {
          from = "#3b1303";
          to = "#a23405";
        } else if (gemlv <= 9 && gemlv > 6) {
          from = "#3c2201";
          to = "#a86200";
        } else if (gemlv <= 6 && gemlv > 4) {
          from = "#27013d";
          to = "#6e00aa";
        } else if (gemlv <= 4 && gemlv > 2) {
          from = "#111d29";
          to = "#103550";
        }
        const slotbox = ce({
          className:
            "gem-slot  mb-2 ml-2 mr-2 md:m-auto group/gems bg-white p-1 rounded-md lg:relative col-span-1 lg:w-[64px] lg:h-[64px] w-[45px] h-[45px]" +
            css.gradient(from, to),
          append: gemeffectscover,
        });
        const imgcover = ce({
          className: "gem-imgcover  w-full",
          append: slotbox,
        });
        ce({
          element: "img",
          className: "gem-img",
          inner: gems_[0].Icon,
          append: imgcover,
        });

        const gemdiv = ce({
          className: `gems-cover-div min-w-[300[px]] lg:min-w-[200px] z-20 rounded-xl 
            group-hover/gems:block absolute bg-[rgba(0,0,0,0.9)] p-3 z-10 top-full  ${css.xCenter} hidden`,
          append: slotbox,
        });
        ce({
          element: "h4",
          className: "gem-name mb-2",
          inner: gems_[0].Name,
          append: gemdiv,
        });
        ce({
          element: "img",
          className: "gemeffect-img rounded-lg mb-2",
          inner: el.Icon,
          append: gemdiv,
        });
        ce({
          element: "h4",
          className: "gemeffect-Name text-white font-black mb-1 mt-1",
          inner: el.Name,
          append: gemdiv,
        });
        ce({
          element: "p",
          className: "description text-white text-sm",
          inner: el.Description,
          append: gemdiv,
        });
      });
      //   !!!gemeffects ? (gemeffects = []) : null;
      let maxNum = !!gemeffects ? 11 - gemeffects?.length : 11;
      if (gemeffects?.length < 11 || !!!gemeffects) {
        for (let i = 0; i < maxNum; i++) {
          const slotbox = ce({
            className:
              "gem-slot lg:w-[64px] lg:h-[64px] w-[64px] h-[64px] group/gems p-1 rounded-md lg:relative col-span-1 " +
              css.gradient("#222", "#999"),
            append: gemeffectscover,
          });
          ce({
            className:
              "w-full h-full rounded-lg text-white flex items-center justify-center",
            inner: "EMPTY",
            append: slotbox,
          });
        }
      }

      const attkgemCal = rounds(
        attkgem.reduce((a, c, i) => (a += c), 0) / attkgem.length
      );

      const coolgemCal = rounds(
        coolgem.reduce((a, c, i) => (a += c), 0) / coolgem.length
      );
      userSpec.gem.attk = attkgemCal;
      userSpec.gem.cool = coolgemCal;

      //----------- 카드
      const card = data.ArmoryCard;
      const cardcover = ce({
        ...coverInit,
        className: "card",
        inner: title("카드"),
      });
      const cards = ce({
        element: "div",
        // className: "cards flex flex-wrap items-center justify-between bg-white rounded-lg p-4",
        className: "cards grid gap-1 grid-cols-3 md:grid-cols-6 rounded-lg p-1",
        append: cardcover,
      });
      const cardSpec = [];
      card?.Cards.map((el) => {
        const grade = el.Grade;
        const awakeCount = el.AwakeCount;
        const awakeTotal = el.AwakeTotal; // Max 5
        const typecover = ce({
          element: "div",
          className: "card-img-box relative",
          append: cards,
        });
        style = "card-teduri ";
        switch (grade) {
          case "전설":
            style += "card-legend";
            break;
          case "영웅":
            style += "card-hero";
            break;
          case "희귀":
            style += "card-rare";
            break;
        }

        ce({
          element: "img",
          className:
            "card-img w-[136px] h-[207px] pt-1 pl-1 pb-1 m-auto md:m-0",
          inner: el.Icon,
          append: typecover,
        });
        const teduri = ce({
          className:
            "w-full h-full max-w-[140px] w-[140px] translate-x-[-50%] left-[50%] md:translate-x-0 absolute z-10 top-0 md:left-0 " +
            style,
          append: typecover,
        });
        const awake = ce({
          className: "grid grid-cols-5 absolute bottom-[7%] pl-3 pr-3",
          append: teduri,
        });
        let i = 0;
        if (awakeCount === 5)
          for (i = 0; i < awakeTotal; i++) {
            ce({
              element: "img",
              className: "w-[36px]",
              inner: "./img/card_active.png",
              append: awake,
            });
          }
        else {
          for (i = 0; i < awakeCount; i++) {
            ce({
              element: "img",
              className: "w-[36px]",
              inner: "./img/card_active.png",
              append: awake,
            });
          }
          for (i = 0; i < awakeTotal - awakeCount; i++) {
            ce({
              element: "img",
              className: "w-[36px]",
              inner: "./img/card_noactive.png",
              append: awake,
            });
          }
        }
      });
      const cardeffects = ce({
        element: "div",
        className: "card-effects mt-5",
        inner: title("카드 효과"),
        append: cardcover,
      });
      card?.Effects.map((el, i) => {
        let awake = Number(
          el?.Items[el.Items.length - 1].Name.split("(")[1]?.replace(
            "각성합계)",
            ""
          )
        );
        let last = el?.Items[0].Name.replace("세트", "").split(" ").pop();
        let cardInfo = {
          title: el?.Items[0].Name.replace("세트", "")
            .split(" ")
            .join(" ")
            .replace(last, "")
            .trim(),
          max: el?.CardSlots?.length * 5,
          awake: !!awake ? awake : 0,
        };
        cardSpec.push(cardInfo);
        const cardeffectscover = ce({
          className: "card-effect-cover",
          append: cardeffects,
        });
        ce({
          element: "p",
          className:
            "card-slot mb-3 text-xl bg-violet-100 text-violet-700 rounded-lg p-1 pr-2 pl-2  inline-block overflow-hidden",
          inner:
            `<b class='pr-2 pt-1 pb-1 border-r border-solid border-violet-600 font-black'>카드 슬롯</b>  ` +
            el.CardSlots.map((t) => ` ${t + 1}`),
          append: cardeffectscover,
        });
        el.Items.map((t, i2) => {
          ce({
            element: "p",
            className: "card-items text-white text-thin text-sm mb-2",
            inner: t.Name + " " + t.Description,
            append: cardeffectscover,
          });
        });
      });
      userSpec.card = cardSpec;

      // ------------------각인
      const engraving = data.ArmoryEngraving;
      const engravingeffectcover = ce({
        ...coverInit,
        className: `engraving-effects grid grid-cols-2 md:grid-cols-3`,
        inner: title("각인", ``),
      });
      const userEngra = [];
      engraving?.Effects.map((el) => {
        const typecover = ce({
          element: "div",
          className: "engraving-cover rounded-lg  p-4 md:flex m-3 bg-[#15181d]",
          append: engravingeffectcover,
        });
        ce({
          element: "img",
          className:
            "engravingeffect-img max-w-[40px] max-h-[40px] md:max-w-[64px] md:max-h-[64px] r mr-4 rounded-full",
          inner: el.Icon,
          append: typecover,
        });
        ce({
          element: "p",
          className: "description break-keep text-sm pl-1 mt-3 md:mt-0",
          inner: `<b class="text-white mb-1 text-sm lg:text-lg">${el.Name}</b>`,
          append: typecover,
        });
        const des = el.Description.replaceAll("ffff99", "9e5f04");
        const text = ce({
          element: "p",
          className: "description md:break-keep text-sm pl-1",
          inner: `<b class="text-violet-700 mb-1 text-sm lg:text-lg ${css.border}">${el.Name}</b> <br/> <span class="pl-2 block">${des}</span>`,
          append: typecover,
        });
        tooltip2(text);
        userEngra.push(Number(el.Name.split("Lv.")[1].trim()));
      });

      userSpec.engraving = {
        length: engraving.Effects.length,
        lv: userEngra,
      };

      const avatars = !!data.ArmoryAvatars ? data.ArmoryAvatars : "";
      style = "";
      const avatarcover = ce({
        ...coverInit,
        className: "avatar relative flex flex-wrap justify-start items-center",
        inner: title("아바타"),
      });

      let legendAvatar = [];
      const avatar_ce = (type) => {
        const filt = !!avatars ? avatars.filter((x) => x.Type === type) : [];
        let w = "max-w-[280px]";
        let twoavatar =
          type === "머리 아바타" ||
          type === "상의 아바타" ||
          type === "하의 아바타" ||
          type === "무기 아바타";
        if (!twoavatar) w = "max-w-[190px]";
        let typecoverCss = `avatar_under m-3 flex flex-wrap justify-between ${w}`;
        const typeavatar = ce({
          className: typecoverCss,
          append: avatarcover,
        });
        ce({
          element: "h4",
          className: `avatar-title w-full mb-2 ` + css.small_title,
          inner: type,
          append: typeavatar,
        });
        let n = 1;

        if (twoavatar) {
          n = 2;
        }
        let imgCoverCss = `w-24 h-24 md:w-32 md:h-32 bg-white mb-3 rounded-lg sm:max-w-28 sm:h-28 md:max-w-none `;
        if (!!!filt.length || twoavatar) {
          for (let i = 0; i < n - filt.length; i++) {
            ce({
              className:
                imgCoverCss +
                css.hero +
                " text-white flex items-center justify-center text-3xl",
              inner: "EMPTY",
              append: typeavatar,
            });
          }
        }

        filt?.map((el) => {
          let grade = "";
          switch (el.Grade) {
            case "영웅":
              grade = css.hero;
              break;
            case "전설":
              grade = css.legend;
              break;
          }
          let imgCover = ce({
            element: "div",
            className: imgCoverCss + grade,
            append: typeavatar,
          });
          ce({
            element: "img",
            className: "avatar-img hover:scale-110",
            inner: el.Icon,
            append: imgCover,
          });
          if (el.Grade === "전설") legendAvatar.push(true);
          tooltip(imgCover, el.Tooltip);
        });
      };

      avatar_ce("머리 아바타");
      avatar_ce("상의 아바타");
      avatar_ce("하의 아바타");
      avatar_ce("무기 아바타");
      avatar_ce("악기 아바타");
      avatar_ce("얼굴1 아바타");
      avatar_ce("얼굴2 아바타");
      avatar_ce("이동 효과");
      userSpec.legendAvatar = legendAvatar;

      outputview.append(character);
    })
    .catch((err) => {
      console.error(err);
    });
}
