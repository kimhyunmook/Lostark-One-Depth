import { ce, title, title2, label, tooltip, tooltip2, equipmentTooltip } from "./util.js";
import { css } from "./class.js";

const url = "https://developer-lostark.game.onstove.com";
const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NzcwNDEifQ.G2QMUj9SrqvYpowvmYe5EZsVdWTqiK_V8RPOUfD9SfBtQc3VVkeynvmhj6zUZL21aD8OWoeNySPRZzG62QtDt4-YUgkLrseShA8P59TIBqi4qU7mhmnXbmygdk1DjPVzNZNhIISjFNL8rLNKoYNeDGlpp8_dFQvTj919G7-JJ8KPdxJnEW-lxdHqRPsUQ4TPmFXNRIxbY6PBIyJQjAsTtYh7GvL9KHR_xKV2c5jVRdCPp4Ekiqqi1LBSTCeYsPkoMM3Dt-UEThF6h75tRWfWdiXf6_KyrR_Bm2SwolMZvUboQsX7NK-4eGjVyLjDitDOC3uRzDCuJc4zykFunGU-nA";
const outputview = document.querySelector(".output-view");
const headers = {
  accept: "application/json",
  authorization: "bearer " + API_KEY,
};

const nav = "nav.menu";
// const menu_cover = document.querySelectorAll(`${nav} .menu-cover.active a`);
// [...menu_cover].map((v, i) => {
//     v.addEventListener('click', (e) => {
//         const t = e.currentTarget;
//         t.parentNode.classList.add('on')
//     })
// });
const closebtn = document.querySelectorAll(
  `${nav} .menu-cover.active .closebtn`
);
[...closebtn].map((v, i) => {
  v.addEventListener("click", (e) => {
    e.preventDefault();
    const t = e.currentTarget;
    // t.parentNode.parentNode.parentNode.parentNode.classList.remove('on');
    t.parentNode.children[0].value = "";
  });
});

const nav_news_li = document.querySelectorAll(`${nav} .news li`);
[...nav_news_li].map((el, i) => {
  if (el.classList[1] === "on") {
    axios_news(el.classList[0]);
  }

  el.addEventListener("click", async (e) => {
    const t = e.currentTarget;
    [...nav_news_li].map((e) => e.classList.remove("on"));
    const target = t.classList[0];
    await t.classList.add("on");
    outputview.innerHTML = null;
    axios_news(target);
  });
});

// const nav_characters_li = document.querySelector(`${nav} .characters li`)
// nav_characters_li.addEventListener('click', (e) => {
//     const t = e.currentTarget;
//     t.className.includes('active') ? t.classList.remove('active') : t.classList.add('active');
// })
const userSpec = {
  name: '',
  level: 0,
  itemlevel: 0,
  status: {
    sum: 0,
    value: []
  },
  skilpoint: 0,
  title: "",
  wepon: {
    stage: 0,
    quality: 0,
    transcendence: 0
  },
  armor: {
    stage: 0, //평균치
    quality: 0, //평균치
    transcendence: 0
  },
  gem: {
    attk: 0,//평균치
    cool: 0 //평균치
  },
}
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
  axios_character(user_name.value);
});

// function axios_news(target) {
//     axios.get(url + `/news/${target}`, {
//         headers
//     })
//         .then((res) => {
//             const data = res.data
//             data?.map((list, index) => {
//                 const cover = ce({ element: "a", className: 'cover ' + css_cover, link: list.Link, type: list.Type });
//                 ce({ element: "h3", className: 'title', inner: list.Title, append: cover });
//                 if (target === 'events') {
//                     ce({ element: 'img', className: 'thumbnail', inner: list.Thumbnail, append: cover })
//                     date = ce({ element: 'p', className: 'event-date', inner: list.StartDate + '~' + list.EndDate, append: cover })
//                     !!list.RewardDate ? ce({ element: 'p', className: 'event-rewardDate', inner: list.StartDate + '~' + list.RewardDate, append: cover })
//                         : null
//                 } else {
//                     date = ce({ element: 'p', className: "notice-date", inner: list.Date, append: cover })
//                 }
//                 outputview.append(cover);
//             })

//         })
//         .catch((err) => {
//             console.error(err)
//         })
// }

function axios_character(target) {
  let style = '';
  axios
    .get(url + `/armories/characters/${target}`, { headers })
    .then((res) => {
      const data = res.data;
      if (!!!data) {
        alert("존재하지 않는 유저입니다.");
        return;
      }

      outputview.innerHTML = null;
      console.log('full data', data);

      //footer 추가전까지
      const character = ce({
        element: "div",
        className: "cover-character pb-[200px] " + css.cover,
      });
      let coverInit = {
        element: "div",
        append: character,
      };

      const profile = data.ArmoryProfile;
      userSpec.name = target;
      userSpec.skilpoint = profile.TotalSkillPoint;
      userSpec.itemlevel = profile.ItemAvgLevel;
      userSpec.title = profile.Title;
      userSpec.level = profile.CharacterLevel;

      const profilecover = ce({
        ...coverInit,
        className: "profile-cover relative rounded-lg p-2 bg-[#15181D]",
        inner: title("User Profile"),
      });
      const infocover = ce({
        element: "div",
        className: "profile-info-cover p-2 absolute h-full max-h-[600px] min-w-[400px]",
        append: profilecover,
      });
      const statscover = ce({
        element: "div",
        className: "profile-stats-cover absolute bottom-1",
        inner: title2("특성"),
        append: profilecover,
      });
      /** 특성 */
      let states = [];
      profile.Stats?.map((el) => {
        let allpotion = 66;
        ce({
          element: "p",
          className: "stats",
          inner: label(el.Type, el.Value),
          append: statscover,
        });
        if (el.Value - allpotion > 100 && el.Type !== '공격력' && el.Type !== '최대 생명력') {
          states.push({ name: el.Type, value: Number(el.Value) })
        }
      });

      userSpec.status.value = states;
      userSpec.status.sum = states.reduce((a, c) => a += c.value, 0)


      /** 정보 */
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
        className: "mb-1 mt-1 text-white text-xl"
      };
      ce({
        element: 'h3',
        className: "text-3xl text-white mt-2 mb-4 font-black",
        inner: label("Lv", profile.ItemAvgLevel, labelstyle),
        append: infocover
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
      function eq_ce(start, last) {
        const boxcover = ce({
          className: "equipment-cover-box bg-white w-[100%] md:w-[49%] rounded-lg p-2 md:mb-0 mb-4",
          append: equipmentcover
        })

        let tooltip, grade, style2, str;
        let s = 16; // 이미지 사이즈

        for (let i = start; i < last; i++) {
          grade = equipment[i]?.Grade;
          switch (grade) {
            case "고대": style = 'from-[#3d3325] to-[#dcc999]';
              style2 = 'text-[#D9AB48]';
              break;
            case "유물": style = 'from-[#341a09] to-[#a24006]';
              style2 = 'text-[#a24006]'
              break;
          }
          // 장비가 없을 때
          if (!!!equipment[i]) return;

          tooltip = JSON.parse(equipment[i]?.Tooltip)
          const infotext = (target, type) => {
            let value = Object.values(tooltip)
            let result = value.filter(x => x.type === target)
            let index = 0;
            switch (type) {
              case '상급 재련': index = 2;
                break;
              case '추가 효과': index = 1;
                break;
            }

            if (target === 'IndentStringGroup') {
              result?.map((v, i) => {
                let values = Object.values(v.value);
                if (values?.length < 3) {
                  if (values[0]?.topStr?.includes(type)) str = values[0].topStr
                }
              })
              str = ce({ element: 'p', inner: str }).textContent.replace('[초월] ', 'Lv').split('단계');

              str = !!str[1] ? str[0] + `<b class="text-black"> +${str[1].trim()}</b>` : null;
              console.log(str)
              return str;
            }
            else {
              result = result[index]?.value
              if (typeof result === 'object') {
                delete result.bEquip;
                delete result.slotData;
                switch (type) {
                  case '품질': result = `<b>${result.leftStr1}</b>  ${result.qualityValue}`;
                    break;
                  case '아이템 레벨': result = !!result.leftStr2 ? `${result?.leftStr2?.replace('아이템 레벨', '').replace('(티어 3)', '').trim()}` : '';
                    break;
                  case '추가 효과': result = `${result?.Element_001.replace('<BR>', ' ')}`
                    break;
                  default: result = `${result.leftStr0}`;
                }
              }
              if (index === 2 && !result?.includes('상급 재련')) {
                result = ''
              }

              return ce({ element: 'p', inner: result }).textContent
            }

          }

          let info
          if (i < 6) {
            info = {
              itemname: infotext('NameTagBox'),
              itemquality: infotext('ItemTitle', '품질'),
              itemlevel: infotext('ItemTitle', '아이템 레벨'),
              advenceLevel: infotext('SingleTextBox', '상급 재련').replace('[상급 재련]', `<img class="w-[${s}px] mr-1" src="./img/echidna.png">`).trim(),
              transendence: infotext("IndentStringGroup", '초월'),
            }
          }
          else {
            info = {
              itemname: infotext('NameTagBox'),
              itemquality: infotext('ItemTitle', '품질'),
              option: infotext('ItemPartBox', '추가 효과')
            }
          }
          console.log('info', info)
          let quality = tooltip.Element_001.value.qualityValue;
          let qualitystyle = ''
          switch (true) {
            case quality === 100: qualitystyle = 'bg-[#f9ae00]';
              break;
            case quality >= 90 && quality < 100: qualitystyle = "bg-[#8045DD]";
              break;
            case quality >= 70 && quality < 90: qualitystyle = "bg-[#2AB1F6]";
              break;
            case quality < 70 && quality > 0: qualitystyle = "bg-[#91F202]";
              break;

          }

          const typecover = ce({
            // inner: title2(equipment[i].Type, " mb-1 mt-1 w-full"),
            className: "equipments mb-4 flex border-b pb-2",
            append: boxcover
          })
          let h = quality > 0 ? ' h-20 ' : 'h-16'
          const imgcover = ce({
            className: "equipment-img-cover flex w-[64px] relative rounded-md overflow-hidden bg-gradient-to-br mr-3 " + style + h,
            append: typecover
          })
          ce({
            element: "img",
            className: "equipment-img w-16 h-16 ",
            inner: equipment[i].Icon,
            append: imgcover,
          });

          if (quality > 0)
            ce({
              element: 'p',
              className: "quality absolute bottom-0 left-0 w-full h-[1.2rem] text-white font-black text-center leading-4 text-md pt-[0.1em] " + qualitystyle,
              inner: quality,
              append: imgcover
            })

          const spac = ce({
            className: "spac pt-1 flex flex-wrap items-start max-w-[350px] min-w-[290px]",
            append: typecover
          })

          ce({
            element: "p",
            className: `item-name text-lg ${style2} font-black leading-4 w-full`,
            inner: equipment[i].Name,
            append: spac
          });
          if (!!info?.transendence) {
            ce({
              element: 'p',
              className: ` font-black flex items-center justify-center pt-1 mr-1 text-sm `,
              inner: `<img src="./img/trancendence.png" class="w-5 w-[${s}px] h-[${s}px] max-w-[${s}px] max-h-[${s}px] mr-1" /> 
              <b class="text-[#D9AB48]" >${info.transendence}</b>`,
              append: spac
            })
          }

          ce({
            element: 'p',
            className: `advence tracking-tight font-black text-sm p-1 flex items-center text-[#]`,
            inner: info?.advenceLevel,
            append: spac
          })

          if (!!info?.option) {
            ce({
              element: 'p',
              className: `text-sm font-bold text-[#999]`,
              inner: info.option,
              append: spac
            })
          }

        }
      }
      // // 장비
      eq_ce(0, 6);

      // // 악세
      eq_ce(6, 13)

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
        className: "gemeffects-cover flex justify-between relative",
        // inner: title2("착용 보석 효과",'grid-cols-10'),
        append: gemcover,
      });
      // const gemscover = ce({ element: 'div', className: "gems-cover", inner: title2('착용 보석'), append: gemcover });
      gemeffects?.map((el, i) => {

        const gems_ = gems?.filter((x) => x.Slot === el.GemSlot);
        const gemlv = ce({ inner: gems_[0].Name }).textContent.split('레벨')[0];
        const gemkind = ce({ inner: gems_[0].Name }).textContent.split('레벨')[1].trim();
        let [from, to] = ['#1a230e', '#374e18'];
        if (gemlv > 9) {
          from = '#3b1303';
          to = '#a23405';
        } else if (gemlv <= 9 && gemlv > 6) {
          from = '#3c2201';
          to = '#a86200';
        } else if (gemlv <= 6 && gemlv > 4) {
          from = '#27013d';
          to = '#6e00aa';
        } else if (gemlv <= 4 && gemlv > 2) {
          from = '#111d29'
          to = '#103550'
        }
        const slotbox = ce({
          element: "div",
          className: "gem-slot group/gems bg-white p-1 rounded-md mb-2 lg:relative col-span-1 " + css.gradient(from, to),
          append: gemeffectscover,
        });
        const imgcover = ce({
          className: 'gem-imgcover  max-w-[64px]',
          append: slotbox
        })
        ce({
          element: "img",
          className: "gem-img",
          inner: gems_[0].Icon,
          append: imgcover,
        });


        const gemdiv = ce({
          className: `gems-cover-div min-w-[200px] z-20 rounded-lg group-hover/gems:block absolute bg-[rgba(0,0,0,0.9)] p-3 z-10 top-full  ${css.xCenter} hidden`,
          append: slotbox
        })
        ce({
          element: "h4",
          className: "gem-name mb-2",
          inner: gems_[0].Name,
          append: gemdiv
        })
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

      //----------- 카드
      const card = data.ArmoryCard;
      const cardcover = ce({
        ...coverInit,
        className: "card",
        inner: title("카드"),
      });
      const cards = ce({
        element: "div",
        className: "cards grid gap-1 grid-cols-3 lg:grid-cols-6",
        append: cardcover,
      });
      card?.Cards.map((el) => {
        const grade = el.Grade;
        const awakeCount = el.AwakeCount;
        const awakeTotal = el.AwakeTotal; // Max 5
        const typecover = ce({ element: 'div', className: "card-img-box relative", append: cards })
        style = 'card-teduri '
        switch (grade) {
          case '전설': style += 'card-legend';
            break;
          case '영웅': style += 'card-hero';
            break;
          case '희귀': style += 'card-rare';
            break;
        }

        ce({
          element: "img",
          className: "card-img w-[136px] h-[207px] pt-1 pl-1 pb-1 ",
          inner: el.Icon,
          append: typecover,
        });
        const teduri = ce({
          element: 'div', className: "w-full h-full max-w-[140px] absolute z-10 top-0 left-0 " + style, append: typecover
        })
        const awake = ce({
          element: 'div', className: "grid grid-cols-5 absolute bottom-[7%] pl-3 pr-3", append: teduri
        })
        let i = 0;
        if (awakeCount === 5)
          for (i = 0; i < awakeTotal; i++) {
            ce({ element: 'img', className: "w-[36px]", inner: './img/card_active.png', append: awake })
          }
        else {
          for (i = 0; i < awakeCount; i++) {
            ce({ element: 'img', className: "w-[36px]", inner: './img/card_active.png', append: awake })
          }
          for (i = 0; i < awakeTotal - awakeCount; i++) {
            ce({ element: 'img', className: "w-[36px]", inner: './img/card_noactive.png', append: awake })
          }
        }
      });
      const cardeffects = ce({
        element: "div",
        className: "card-effects mt-5",
        inner: title("카드 효과"),
        append: cardcover,
      });
      card?.Effects.map((el) => {
        ce({
          element: "p",
          className: "card-slot mb-3 text-xl bg-violet-100 text-indigo-600 rounded-full pl-3 pr-3  inline-block overflow-hidden",
          inner: `<b class='pr-2 pt-1 pb-1 border-r border-solid border-violet-600 font-black'>카드 슬롯</b>  ` + el.CardSlots.map((t) => ` ${t}`),
          append: cardeffects,
        });
        el.Items.map((t) => {
          ce({
            element: "p",
            className: "card-items text-white text-thin text-sm mb-2",
            inner: t.Name + " " + t.Description,
            append: cardeffects,
          });
        });
      });

      // ------------------각인
      const engraving = data.ArmoryEngraving;
      const engravingeffectcover = ce({
        ...coverInit,
        className: `engraving-effects grid grid-cols-3`,
        inner: title("각인", `col-span${engraving?.Effects.length}`),
      });

      engraving?.Effects.map((el) => {
        const typecover = ce({
          element: 'div',
          className: "engraving-cover flex mb-3",
          append: engravingeffectcover
        })
        ce({
          element: "img",
          className: "engravingeffect-img max-w-[64px] max-h-[64px] r mr-4 rounded-full",
          inner: el.Icon,
          append: typecover,
        });
        ce({
          element: "p",
          className: "description break-keep text-sm pl-1",
          inner: `<b class="text-white mb-1 text-lg">${el.Name}</b>`,
          append: typecover,
        });
        const text = ce({
          element: "p",
          className: "description break-keep text-sm pl-1",
          inner: `<b class="text-violet-700 mb-1 text-lg ${css.border}">${el.Name}</b> <br/> <span class="pl-2 block">${el.Description}</span>`,
          append: typecover,
        });
        tooltip2(text)
      });


      const avatars = !!data.ArmoryAvatars ? data.ArmoryAvatars : '';
      style = '';
      const avatarcover = ce({
        ...coverInit,
        className: "avatar relative " + css.cover_div,
        inner: title("아바타"),
      });
      const avatar_ce = (type) => {
        const filt = !!avatars ? avatars.filter((x) => x.Type === type) : [];
        if (filt.length < 2)
          style = `col-span-${filt.length} `;
        const typeavatar = ce({
          element: "div",
          className: `avatar_under grid-flow-dense grid-cols-${filt.length}  ` + style + css.avatar,
          append: avatarcover,
        });
        ce({
          element: "h4",
          className: `avatar-title col-span-${filt.length} ` + css.small_title,
          inner: type,
          append: typeavatar,
        });

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
            className: `avatar-imgcover w-40 md:w-32 m-auto mb-3 rounded-lg max-w-24 sm:max-w-28 md:max-w-none ` + grade,
            append: typeavatar,
          });
          ce({
            element: "img",
            className: "avatar-img hover:scale-110",
            inner: el.Icon,
            append: imgCover,
          });
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



      // const skill = !!data.ArmorySkills ? data.ArmorySkills : [];
      // const skillcover = ce({ ...coverInit, className: 'skill-cover', inner: title('스킬') })

      // console.log(skill)

      // const collectibles = data.Collectibles;
      // const collectiblescover = ce({
      //   ...coverInit,
      //   className: "collectibles-cover",
      //   inner: title("수집품"),
      // });
      // collectibles?.map((el) => {
      //   const typecover = ce({
      //     element: "div",
      //     className: "collection",
      //     inner: title2(el.Type),
      //     append: collectiblescover,
      //   });
      //   ce({
      //     element: "img",
      //     className: "collection-img",
      //     inner: el.Icon,
      //     append: typecover,
      //   });
      //   ce({
      //     element: "p",
      //     className: "collection-point",
      //     inner: `${el.Point} / ${el.MaxPoint}`,
      //     append: typecover,
      //   });
      //   const des = ce({
      //     element: "div",
      //     className: "description",
      //     append: typecover,
      //   });
      //   el.CollectiblePoints.map((t) => {
      //     ce({
      //       element: "p",
      //       className: "collection-point-detail",
      //       inner: label(
      //         t.PointName,
      //         t.Point === t.MaxPoint
      //           ? `${t.Point}/${t.MaxPoint} <b>(수집 완료)</b>`
      //           : `${t.Point}/${t.MaxPoint}`
      //       ),
      //       append: des,
      //     });
      //   });
      // });
      console.log(userSpec)
      outputview.append(character);

      // siblings
      // axios
      //   .get(url + `/characters/${target}/siblings`, { headers })
      //   .then((res) => {
      //     const data = res.data;

      //     ce({
      //       element: "h3",
      //       className: "characters",
      //       inner: "보유캐릭터",
      //       append: outputview,
      //     });
      //     data?.map((char, index) => {
      //       const cover = ce({ element: "div", className: "cover" });

      //       ce({
      //         element: "p",
      //         className: "server",
      //         inner: label("서버", char.ServerName),
      //         append: cover,
      //       });
      //       ce({
      //         element: "p",
      //         className: "character-name",
      //         inner: label("캐릭터 이름", char.CharacterName),
      //         append: cover,
      //       });
      //       ce({
      //         element: "p",
      //         className: "character-level",
      //         inner: label("캐릭터 레벨", char.CharacterLevel),
      //         append: cover,
      //       });
      //       ce({
      //         element: "p",
      //         className: "character-class",
      //         inner: label("클래스", char.CharacterClassName),
      //         append: cover,
      //       });
      //       ce({
      //         element: "p",
      //         className: "server",
      //         inner: label("현재 아이템 레벨", char.ItemAvgLevel),
      //         append: cover,
      //       });
      //       ce({
      //         element: "p",
      //         className: "server",
      //         inner: label("최고 달성 레벨", char.ItemMaxLevel),
      //         append: cover,
      //       });

      //       outputview.append(cover);
      //     });
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    })
    .catch((err) => {
      console.error(err);
    });
}

// function axios_auction(target) {
//     // axios.get(url + '/auctions/options', { headers })
//     //     .then((res) => { console.log(res.data) })

//     let sample = {
//         "ItemLevelMin": 0,
//         "ItemLevelMax": 0,
//         "ItemGradeQuality": null,
//         "SkillOptions": [
//             {
//                 "FirstOption": null,
//                 "SecondOption": null,
//                 "MinValue": null,
//                 "MaxValue": null
//             }
//         ],
//         "EtcOptions": [
//             {
//                 "FirstOption": null,
//                 "SecondOption": null,
//                 "MinValue": null,
//                 "MaxValue": null
//             }
//         ],
//         "Sort": "BIDSTART_PRICE",
//         "CategoryCode": 20005,
//         "CharacterClass": "버서커",
//         "ItemTier": null,
//         "ItemGrade": "유물",
//         "ItemName": "string",
//         "PageNo": 0,
//         "SortCondition": "ASC"
//     }
//     axios.post(url + '/auctions/items', sample, {
//         headers: { ...headers, "Cotent-Type": "application/json" }
//     })
//         .then(res => {
//             console.log(res.data)
//         })

//     outputview.innerHTML = null;
// }

// function axios_market() {
//     axios.get()
// }
// axios_auction()
axios_character("개연구");

