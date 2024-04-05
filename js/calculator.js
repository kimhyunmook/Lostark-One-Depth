export default function Calculator(userSpec, raidname = {}) {
  //   console.log(endContent.kamen_normal);
  console.log(userSpec);
  const [cut, nice, best, over, end] = [60, 70, 80, 90, 100];
  let total = 0;
  let state = "bad";

  const compare = (user, raid, type) => {
    // console.log(typeof user, typeof raid);
    let resScore = 0;
    let result = [];

    if (typeof user === "object" && typeof raid === "object") {
      let [user_key, user_val] = [Object.keys(user), Object.values(user)];
      let [raid_key, raid_val] = [Object.keys(raid), Object.values(raid)];
      let item = [];

      user_val.map((uv, i) => {
        let uk = user_key[i];
        let [rk, rv] = [raid_key[i], raid_val[i]];
        let score = 0;
        let [max, min] = [100, 0];
        let normal = 100;

        if (uk === rk) {
          switch (uk) {
            //armor
            case "stage":
              max = 1;
              min = -1;
              normal = 10;
              break;
            case "itemlevel":
              max = 5;
              min = -5;
              break;
            case "quality":
              max = 5;
              min = -5;
              break;
            //gem
            case "attk":
              max = 0;
              min = -1;
              break;
            case "cool":
              max = 0;
              min = -1;
              break;
          }

          let cp = Math.round((uv - rv) * 10) / 10;
          let ifitem = uk === "stage" || uk === "itemlevel";
          if (uk === "transcendence") {
            max = 1;
            min = 1;
            let divide = type === "armor" ? 5 : 1;
            let userlv = Math.floor(uv / 5 / divide);
            let raidlv = Math.floor(rv / 5 / divide);
            let cp = userlv - raidlv;
            // console.log(userlv, raidlv);
            // console.log(userlv);
            if (userlv === 4) {
              result.push(100);
            } else if (cp >= max) {
              result.push(100);
            } else if (cp === 0) {
              result.push(70);
            } else if (cp >= min) {
              result.push(40);
            } else {
              result.push(0);
            }
          } else if (uv >= rv && !!rv) {
            if (cp > max) {
              score = 100;
              if (ifitem) item.push(score);
              else result.push(score);
            } else {
              if (max === 0) max = 1;
              let sign = normal / max;
              if (cp === 0) cp = 1;
              score = sign * cp;
              if (ifitem) item.push(score);
              else result.push(score);
            }
          } else {
            if (cp >= min && !!rv) {
              score = 50 - (50 / Math.abs(min)) * Math.abs(cp);
              if (ifitem) item.push(score);
              else result.push(score);
            } else if (!!rv) {
              if (ifitem) item.push(0);
              else result.push(0);
            }
          }
          if (type === "armor") {
            // console.log(uk, uv);
            // console.log(rk, rv);
            // console.log(result, item);
          }
        }
      });
      let divide = item.length > 0 ? 2 : 1;
      item =
        item.length > 0 ? item.reduce((a, c) => (a += c), 0) / item.length : 0;
      resScore = Math.round(
        (result.reduce((a, c) => (a += c), 0) / result.length + item) / divide
      );
      // console.log(resScore)
    } else {
      let score = 0;
      switch (type) {
        case "elixir":
          if (user.special && user.lv >= 40) score += 100;
          else if (raid === 0) {
            score += 50;
          } else {
            score = 0;
          }
          break;
      }
      resScore = Math.round(score);
    }

    return resScore;
  };

  const wepon = compare(userSpec.wepon, raidname.wepon, "wepon");
  const armor = compare(userSpec.armor, raidname.armor, "armor");
  const gem = compare(userSpec.gem, raidname.gem, "gem"); //비교값
  // const gem = gem_sco();
  // function gem_sco() {
  //   const attk = userSpec.gem.attk;
  //   const cool = userSpec.gem.cool;
  //   let sco = 70;
  //   let result = Math.round(
  //     (sco * (attk / 100) + (100 - sco) * (cool / 100)) * 10
  //   );
  //   console.log(result);
  //   return result;
  // } //절대값
  const elixir = compare(userSpec.elixir, raidname.elixir, "elixir");
  const level =
    userSpec.level === 60
      ? 100
      : userSpec.level < 60 && userSpec.level >= 55
        ? 50
        : 0;
  const skillPoint = Math.round((100 / 420) * userSpec.skillpoint);
  const status = Math.round((100 / 2500) * userSpec.status.sum);
  // const statusName = Object.values(userSpec.status.value)?.reduce((a, c) => {
  //   a.push(c.name);
  //   return a;
  // }, []);
  const title = !!raidname
    ? [...raidname?.title].reduce((a, c) => {
        if (c === userSpec.title) a += 100;
        return a;
      }, 0)
    : 0;
  const cardList = [
    { name: "세상을 구하는 빛" },
    { name: "세 우마르가 오리라", score: 50 },
    { name: "카제로스의 군단장" },
    { name: "라제니스의 운명", score: 50 },
  ];
  const card = () => {
    let arr = [];
    let result = 0;
    cardList.map((v, i) => {
      const t = [...userSpec.card].filter((x) => {
        if (x.title === v.name) {
          x.score = !!v.score ? v.score : 100;
          x.score = x.score * (x.awake / x.max);
          return x;
        }
      });
      if (t.length > 0) arr.push(t[0]);
    });
    if (arr.length > 1) {
      result = arr.reduce((a, c) => (a += c.score), 0);
    } else result = arr[0]?.score;
    return result;
  };
  const engraving = userSpec.engraving.lv?.reduce((a, c, i) => {
    a += c;
    return a;
  }, 0);
  const legendAvatar = userSpec.legendAvatar.reduce(
    (a, c) => (c ? (a += 25) : (a += 0)),
    0
  );

  let res = {
    level,
    wepon,
    armor,
    gem,
    skillPoint,
    status,
    title,
    elixir,
    engraving,
    legendAvatar,
    card: card(),
  };

  console.log("res", res);

  total = Object.values(res)?.reduce((a, c, i) => {
    let max,
      score = 0;

    switch (Object.keys(res)[i]) {
      case "level":
        max = 2;
        break;
      case "wepon":
        max = 24;
        break;
      case "armor":
        max = 10;
        break;
      case "gem":
        max = 20;
        break;
      case "skillPoint":
        max = 2;
        break;
      case "status":
        max = 3;
        break;
      case "title":
        max = 3;
        break;
      case "elixir":
        max = 15;
        break;
      case "card":
        max = 12;
        break;
      case "engraving":
        if (c === 15) a += 5;
        else if (c === 16) a += 6;
        else if (c === 17) a += 8;
        break;
      case "legendAvatar":
        max = 3;
        break;
    }
    if (!!max) score = max * (c / 100);
    if (!!score) a += score;
    if (a > 100) a = 100;
    return a;
  }, total);

  console.log("total", total);
  if (total < cut) {
    state = "bad spec";
  } else if (total >= cut && total < nice) {
    state = "cut spec";
  } else if (total >= nice && total < best) {
    state = "nice spec";
  } else if (total >= best && total < over) {
    state = "best spec";
  } else if (total < end) {
    state = "over spec";
  } else {
    state = "end spec";
  }
  return {
    total: Math.round(total * 10) / 10,
    state,
  };
}
