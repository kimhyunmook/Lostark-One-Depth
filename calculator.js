import { general } from "./ schema.js";

export default function Calculator(userSpec, raidname) {
  console.log(general.kamem_normal);
  console.log(userSpec);
  const [cut, nice, best, over] = [70, 80, 90, 100];
  let total = 0;
  let state = "bad";

  const compare = (user, raid) => {
    console.log(typeof user, typeof raid);
    if (typeof user === "object" && typeof raid === "object") {
      let [user_key, user_val] = [Object.keys(user), Object.values(user)];
      let [raid_key, raid_val] = [Object.keys(raid), Object.values(raid)];
      user_val.map((uv, i) => {
        let uk = user_key[i];
        let [rk, rv] = [raid_key[i], raid_val[i]];
        console.log(uk === rk);
      });
    }
  };

  compare(userSpec.armor, general.kamem_normal.armor);
  //   compare(userSpec.gem, general.kamem_normal.gem);

  return {
    total,
    state,
  };
}
