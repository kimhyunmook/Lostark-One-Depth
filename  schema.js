export const userSpec = {
  name: "",
  level: 0,
  itemlevel: 0,
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

export const general = {
  kamem_normal: raidSchema({
    raidname: "카멘_노말",
    itemlevel: {
      suitability: 1610,
      pluslevel: 5,
    },
    title: ["빛을 꺼뜨린 자",
      "별을 제패한 자",
      "이클립스",
      "카멘 The 3rd",
      "카멘 The 2rd",
      "카멘 The 1st",
      "카멘 The TOP10"],
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
      attk: 9,
      cool: 7,
    },
  }),
};
