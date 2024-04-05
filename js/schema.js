export const userSpec = {
  name: "",
  level: 0,
  itemlevel: 0,
  legendAvatar: 0,
  status: {
    sum: 0,
    value: [],
  },
  skillpoint: 0,
  title: "",
  elixir: {
    lv: 0,
    special: true,
  },
  wepon: {
    stage: 0,
    itemlevel: 0,
    quality: 0,
    transcendence: 0,
  },
  armor: {
    stage: 0, //평균치
    itemlevel: 0, //평균치
    quality: 0, //평균치
    transcendence: 0,
  },
  gem: {
    attk: 0, //평균치
    cool: 0, //평균치
  },
  card: [],
};

export const raidSchema = (
  target = {
    raidname: "",
    itemlevel: {
      suitability: [],
      pluslevel: 0,
    },
    skillpoint: 420,
    title: [],
    status: 2400,
    elixir: 0,
    wepon: {
      stage: 0,
      quality: 80,
      itemlevel: 0,
      transcendence: 0,
    },
    armor: {
      stage: 0,
      quality: 60,
      itemlevel: 0,
      transcendence: 0,
    },
    gem: {
      attk: 5,
      cool: 5,
    },
    card: [
      {
        title: "세상을 구하는 빛",
        awake: 18,
      },
    ],
  }
) => {
  return {
    raidname: !!target.raidname ? target.raidname : "",
    itemlevel: target.itemlevel,
    skillpoint: !!target.skillpoint ? target.skillpoint : 420,
    title: !!target.title ? target.title : "없음",
    status: !!target.status ? target.status : 2400,
    elixir: target.elixir,
    wepon: !!target.wepon
      ? target.wepon
      : {
          stage: 0,
          itemlevel: 0,
          quality: 80,
          transcendence: 0,
        },
    armor: !!target.armor
      ? target.armor
      : {
          stage: 0,
          quality: 60,
          transcendence: 0,
        },
    gem: !!target.gem
      ? target.gem
      : {
          attk: 5,
          cool: 5,
        },
    card: !!target.card
      ? target.card
      : [
          {
            title: "세상을 구하는 빛",
            awake: 18,
          },
        ],
  };
};

export const endContent = {
  ivorytower_hard: raidSchema({
    raidname: "상아탑_하드",
    itemlevel: {
      suitability: 1620,
      pluslevel: 5,
    },
    title: ["꽃돌이", "꽃순이"],
    elixir: 40,
    wepon: {
      stage: 20,
      itemlevel: 1620,
      quality: 80,
      transcendence: 0,
    },
    armor: {
      stage: 19,
      itemlevel: 1620,
      quality: 45,
      transcendence: 0,
    },
    gem: {
      attk: 8.5,
      cool: 7,
    },
  }),
  kamen_normal: raidSchema({
    raidname: "카멘_노말",
    itemlevel: {
      suitability: 1610,
      pluslevel: 5,
    },
    title: [
      "빛을 꺼뜨린 자",
      "별을 제패한 자",
      "이클립스",
      "카멘 The 3rd",
      "카멘 The 2rd",
      "카멘 The 1st",
      "카멘 The TOP10",
    ],
    elixir: 0,
    wepon: {
      stage: 19,
      itemlevel: 1610,
      quality: 80,
      transcendence: 0,
    },
    armor: {
      stage: 17,
      itemlevel: 1610,
      quality: 75,
      transcendence: 0,
    },
    gem: {
      attk: 8.5,
      cool: 7,
    },
  }),
  kamen_hard: raidSchema({
    raidname: "카멘_하드(1-3)",
    itemlevel: {
      suitability: 1630,
      pluslevel: 5,
    },
    title: [
      "빛을 꺼뜨린 자",
      "별을 제패한 자",
      "이클립스",
      "카멘 The 3rd",
      "카멘 The 2rd",
      "카멘 The 1st",
      "카멘 The TOP10",
    ],
    elixir: 40,
    wepon: {
      stage: 23,
      itemlevel: 1630,
      quality: 90,
      transcendence: 0,
    },
    armor: {
      stage: 21,
      itemlevel: 1630,
      quality: 80,
      transcendence: 75,
    },
    gem: {
      attk: 9.5,
      cool: 9,
    },
  }),
  kamen_hard_4: raidSchema({
    raidname: "카멘_하드 4관",
    itemlevel: {
      suitability: 1630,
      pluslevel: 5,
    },
    title: [
      "별을 제패한 자",
      "이클립스",
      "카멘 The 3rd",
      "카멘 The 2rd",
      "카멘 The 1st",
      "카멘 The TOP10",
    ],
    elixir: 40,
    wepon: {
      stage: 25,
      itemlevel: 1630,
      quality: 90,
      transcendence: 0,
    },
    armor: {
      stage: 21,
      itemlevel: 1630,
      quality: 80,
      transcendence: 105,
    },
    gem: {
      attk: 10,
      cool: 10,
    },
  }),
  echidna_normal: raidSchema({
    raidname: "에키드나_노말",
    itemlevel: {
      suitability: 1620,
      pluslevel: 5,
    },
    title: ["욕망의 주인"],
    elixir: 40,
    wepon: {
      stage: 21,
      itemlevel: 1620,
      quality: 85,
      transcendence: 0,
    },
    armor: {
      stage: 19,
      itemlevel: 1620,
      quality: 75,
      transcendence: 75,
    },
    gem: {
      attk: 8.5,
      cool: 7,
    },
  }),
  echidna_hard: raidSchema({
    raidname: "에키드나_하드",
    itemlevel: {
      suitability: 1630,
      pluslevel: 5,
    },
    title: ["욕망의 주인"],
    elixir: 40,
    wepon: {
      stage: 24,
      itemlevel: 1640,
      quality: 90,
      transcendence: 0,
    },
    armor: {
      stage: 21,
      itemlevel: 1630,
      quality: 80,
      transcendence: 75,
    },
    gem: {
      attk: 9.5,
      cool: 8.5,
    },
  }),
  behemoth_normal: raidSchema({
    raidname: "베히모스_노말",
    itemlevel: {
      suitability: 1640,
      pluslevel: 5,
    },
    title: [""],
    elixir: 40,
    wepon: {
      stage: 25,
      itemlevel: 1660,
      quality: 90,
      transcendence: 0,
    },
    armor: {
      stage: 23,
      itemlevel: 1640,
      quality: 80,
      transcendence: 1055,
    },
    gem: {
      attk: 10,
      cool: 10,
    },
  }),
};
