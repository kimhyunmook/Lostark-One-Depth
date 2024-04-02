import { general } from "./ schema.js";

export default function Calculator(userSpec, raidname) {
  // console.log(general.kamem_normal);
  console.log(userSpec);
  const [cut, nice, best, over] = [70, 80, 90, 100];
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

        if (uk === rk) {
          switch (uk) {
            //armor
            case "stage":
              max = 1;
              min = -1;
              break;
            case "itemlevel":
              max = 5;
              min = -5;
              break;
            case "quality":
              max = 5;
              min = -5;
              break;
            case "transcendence":
              max = 105;
              min = 0;
              break;
            //gem
            case "attk":
              max = 0;
              min = -1;
              break;
            case "cool":
              max = 0.5;
              min = -1;
              break;
          }

          let cp = Math.round((uv - rv) * 10) / 10;
          let ifitem = uk === "stage" || uk === "itemlevel";
          if (uv >= rv && !!rv) {
            if (cp > max) {
              score = 100;
              if (ifitem) item.push(score);
              else result.push(score);
            } else {
              let sign = 100 / max;
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
          // console.log(uk, uv)
          // console.log(rk, rv)
          // console.log(result, item)
        }
      });
      let divide = item.length > 0 ? 2 : 1;
      item =
        item.length > 0 ? item.reduce((a, c) => (a += c), 0) / item.length : 0;
      resScore = Math.round(
        (result.reduce((a, c) => (a += c), 0) / result.length + item) / divide
      );
    }

    return resScore;
  };

  const wepon = compare(userSpec.wepon, general.kamem_normal.wepon, "wepon");
  const armor = compare(userSpec.armor, general.kamem_normal.armor);
  const gem = compare(userSpec.gem, general.kamem_normal.gem);
  const skillPoint = Math.round((100 / 420) * userSpec.skillpoint);
  const status = Math.round((100 / 2500) * userSpec.status.sum);
  const statusName = Object.values(userSpec.status.value)?.reduce((a, c) => {
    a.push(c.name);
    return a;
  }, []);
  const title = [...general.kamem_normal.title].reduce((a, c) => {
    if (c === userSpec.title) a += 100;
    return a;
  }, 0);

  let res = {
    wepon,
    armor,
    gem,
    skillPoint,
    status,
    title,
  };
  // console.log('res', res);

  return {
    total,
    state,
  };
}
