import { ce, title, title2, label, tooltip } from "./util.js";
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
  axios
    .get(url + `/armories/characters/${target}`, { headers })
    .then((res) => {
      const data = res.data;
      if (!!!data) {
        alert("존재하지 않는 유저입니다.");
        return;
      }

      outputview.innerHTML = null;
      console.log(data);
      const character = ce({
        element: "div",
        className: "cover-character " + css.cover,
      });

      const avatars = data.ArmoryAvatars;
      let coverInit = {
        element: "div",
        append: character,
      };
      const avatarcover = ce({
        ...coverInit,
        className: "avatar " + css.cover_div,
        inner: title("아바타"),
      });
      const avatar_ce = (type) => {
        const typeavatar = ce({
          element: "div",
          className: "avatar_under " + css.avatar,
          append: avatarcover,
        });
        ce({
          element: "h4",
          className: "avatar-title " + css.small_title,
          inner: type,
          append: typeavatar,
        });
        const filt = avatars?.filter((x) => x.Type === type);
        filt?.map((el) => {
          console.log("el", el.Grade);
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
            className: "avatar-imgcover w-32 m-auto mb-3 rounded-lg " + grade,
            append: typeavatar,
          });
          let img = ce({
            element: "img",
            className: "avatar-img ",
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

      const card = data.ArmoryCard;
      const cardcover = ce({
        ...coverInit,
        className: "card",
        inner: title("카드"),
      });
      const cards = ce({
        element: "div",
        className: "cards",
        // inner: title("장착 카드"),
        append: cardcover,
      });
      card?.Cards.map((el) => {
        let img = ce({
          element: "img",
          className: "card-img",
          inner: el.Icon,
          append: cards,
        });
        let name = ce({
          element: "h4",
          className: "card-name",
          inner: el.Name,
          append: cards,
        });
        tooltip([img, name], el.Tooltip);
      });
      const cardeffects = ce({
        element: "div",
        className: "card-effects",
        inner: title("카드 효과"),
        append: cardcover,
      });
      card?.Effects.map((el) => {
        ce({
          element: "p",
          className: "card-slot",
          inner: "카드 슬롯 : " + el.CardSlots.map((t) => " " + t),
          append: cardeffects,
        });
        el.Items.map((t) => {
          ce({
            element: "p",
            className: "card-items",
            inner: t.Name + " " + t.Description,
            append: cardeffects,
          });
        });
      });

      const engraving = data.ArmoryEngraving;
      const engravingeffectcover = ce({
        ...coverInit,
        className: "engraving-effects",
        inner: title("각인"),
      });
      const engravingscover = ce({
        ...coverInit,
        className: "engravings",
        inner: title("착용 각인"),
      });
      engraving?.Effects.map((el) => {
        ce({
          element: "img",
          className: "engravingeffect-img",
          inner: el.Icon,
          append: engravingeffectcover,
        });
        ce({
          element: "p",
          className: "description",
          inner: `<b>${el.Name}</b> <br/> ${el.Description}`,
          append: engravingeffectcover,
        });
      });
      engraving?.Engravings.map((el) => {
        ce({
          element: "img",
          className: "engravings-img",
          inner: el.Icon,
          append: engravingscover,
        });
      });

      const equipment = data.ArmoryEquipment;
      const equipmentcover = ce({
        ...coverInit,
        className: "equipment-cover",
        inner: title("착용 장비"),
      });
      equipment?.map((el) => {
        // tooltip <-이건 정재 해야됨
        const typecover = ce({
          element: "div",
          element: "equipment-cover",
          inner: title(el.Type),
          append: equipmentcover,
        });
        ce({
          element: "img",
          className: "equipment-img",
          inner: el.Icon,
          append: typecover,
        });
        ce({
          element: "h4",
          className: "equipment-name",
          inner: el.Name,
          append: typecover,
        });
      });

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
        className: "gemeffects-cover",
        inner: title2("착용 보석 효과"),
        append: gemcover,
      });
      // const gemscover = ce({ element: 'div', className: "gems-cover", inner: title2('착용 보석'), append: gemcover });
      gemeffects?.map((el) => {
        const slotbox = ce({
          element: "div",
          className: "gem-slot",
          append: gemeffectscover,
        });
        const gems_ = gems?.filter((x) => x.Slot === el.GemSlot);

        ce({
          element: "img",
          className: "gem-img",
          inner: gems_[0].Icon,
          append: slotbox,
        });
        ce({
          element: "img",
          className: "gemeffect-img",
          inner: el.Icon,
          append: slotbox,
        });
        ce({
          element: "h4",
          className: "gemeffect-Name",
          inner: el.Name,
          append: slotbox,
        });
        ce({
          element: "p",
          className: "escription",
          inner: el.Description,
          append: slotbox,
        });
      });
      // gems?.map((el, i) => {

      // })

      const profile = data.ArmoryProfile;
      const profilecover = ce({
        ...coverInit,
        className: "profile-cover",
        inner: title("Profile"),
      });
      const infocover = ce({
        element: "div",
        className: "profile-info-cover",
        append: profilecover,
      });
      const statscover = ce({
        element: "div",
        className: "profile-stats-cover",
        inner: title2("특성"),
        append: profilecover,
      });
      const tendenciescover = ce({
        element: "div",
        className: "profile-tendencies-cover",
        inner: title2("성향"),
        append: profilecover,
      });
      const infoInit = {
        element: "p",
        append: infocover,
      };
      /** 정보 */
      ce({
        element: "img",
        className: "character-img",
        inner: profile.CharacterImage,
        append: infocover,
      });
      ce({
        element: "h3",
        className: "name",
        inner: profile.CharacterName,
        append: infocover,
      });
      ce({
        ...infoInit,
        className: "server",
        inner: label("서버", profile.ServerName),
      });
      ce({
        ...infoInit,
        className: "class",
        inner: label("클래스", profile.CharacterClassName),
      });
      ce({
        ...infoInit,
        className: "level",
        inner: label("전투", profile.CharacterLevel),
      });
      ce({
        ...infoInit,
        className: "itemlevel",
        inner: label("아이템", profile.ItemAvgLevel),
      });
      ce({
        ...infoInit,
        className: "expeditionlevel",
        inner: label("원정대", profile.ExpeditionLevel),
      });
      ce({
        ...infoInit,
        className: "title",
        inner: label("칭호", profile.Title),
      });
      ce({
        ...infoInit,
        className: "guild",
        inner: label("길드", profile.GuildName),
      });
      ce({
        ...infoInit,
        className: "guildgrade",
        inner: label("길드 등급", profile.GuildMemberGrade),
      });
      ce({
        ...infoInit,
        className: "pvp",
        inner: label("PVP", profile.PvpGradeName),
      });
      ce({
        ...infoInit,
        className: "totalskilpoint",
        inner: label("획득 스킬포인트", profile.TotalSkillPoint),
      });
      ce({
        ...infoInit,
        className: "townName",
        inner: label("영지이름", profile.TownName),
      });
      ce({
        ...infoInit,
        className: "townLevel",
        inner: label("영지레벨", profile.TownLevel),
      });

      /** 특성 */
      profile.Stats?.map((el) => {
        ce({
          element: "p",
          className: "stats",
          inner: label(el.Type, el.Value),
          append: statscover,
        });
      });

      /** 성향 */
      profile.Tendencies?.map((el) => {
        ce({
          element: "p",
          className: "tendencies",
          inner: label(el.Type, el.Point) + `/<b>${el.MaxPoint}</b>`,
          append: tendenciescover,
        });
      });

      // const skill = !!data.ArmorySkills ? data.ArmorySkills : [];
      // const skillcover = ce({ ...coverInit, className: 'skill-cover', inner: title('스킬') })

      // console.log(skill)

      const collectibles = data.Collectibles;
      const collectiblescover = ce({
        ...coverInit,
        className: "collectibles-cover",
        inner: title("수집품"),
      });
      collectibles?.map((el) => {
        const typecover = ce({
          element: "div",
          className: "collection",
          inner: title2(el.Type),
          append: collectiblescover,
        });
        ce({
          element: "img",
          className: "collection-img",
          inner: el.Icon,
          append: typecover,
        });
        ce({
          element: "p",
          className: "collection-point",
          inner: `${el.Point} / ${el.MaxPoint}`,
          append: typecover,
        });
        const des = ce({
          element: "div",
          className: "description",
          append: typecover,
        });
        el.CollectiblePoints.map((t) => {
          ce({
            element: "p",
            className: "collection-point-detail",
            inner: label(
              t.PointName,
              t.Point === t.MaxPoint
                ? `${t.Point}/${t.MaxPoint} <b>(수집 완료)</b>`
                : `${t.Point}/${t.MaxPoint}`
            ),
            append: des,
          });
        });
      });

      outputview.append(character);

      // siblings
      axios
        .get(url + `/characters/${target}/siblings`, { headers })
        .then((res) => {
          const data = res.data;

          ce({
            element: "h3",
            className: "characters",
            inner: "보유캐릭터",
            append: outputview,
          });
          data?.map((char, index) => {
            const cover = ce({ element: "div", className: "cover" });

            ce({
              element: "p",
              className: "server",
              inner: label("서버", char.ServerName),
              append: cover,
            });
            ce({
              element: "p",
              className: "character-name",
              inner: label("캐릭터 이름", char.CharacterName),
              append: cover,
            });
            ce({
              element: "p",
              className: "character-level",
              inner: label("캐릭터 레벨", char.CharacterLevel),
              append: cover,
            });
            ce({
              element: "p",
              className: "character-class",
              inner: label("클래스", char.CharacterClassName),
              append: cover,
            });
            ce({
              element: "p",
              className: "server",
              inner: label("현재 아이템 레벨", char.ItemAvgLevel),
              append: cover,
            });
            ce({
              element: "p",
              className: "server",
              inner: label("최고 달성 레벨", char.ItemMaxLevel),
              append: cover,
            });

            outputview.append(cover);
          });
        })
        .catch((err) => {
          console.error(err);
        });
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
