export const userSpec = {
  name: "",
  level: 0,
  itemlevel: 0,
  status: {
    sum: 0,
    value: [],
  },
  skilpoint: 0,
  title: "",
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
    level: 60,
    itemlevel: {
      suitability: [],
      pluslevel: 0,
    },
    skillpoint: 420,
    title: [],
    status: 2400,
    wepon: {
      stage: [0, 0],
      quality: 80,
      itemlevel: [0, 0],
      transcedence: [0, 0],
    },
    armor: {
      stage: [0, 0],
      quality: 60,
      transcedence: [0, 0],
      itemlevel: [0, 0],
    },
    gem: 5,
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
    level: !!target.level ? target.level : 60,
    itemlevel: target.itemlevel,
    skillpoint: !!target.skillpoint ? target.skillpoint : 420,
    title: !!target.title ? target.title : "없음",
    status: !!target.status ? target.status : 2400,
    wepon: !!target.wepon
      ? target.wepon
      : {
          stage: [0, 0],
          itemlevel: [0, 0],
          quality: [80],
          transcedence: [0, 0],
        },
    armor: !!target.armor
      ? target.armor
      : {
          stage: [0, 0],
          quality: [60],
          transcedence: [0, 0],
        },
    gem: !!target.gem ? target.gem : 5,
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

export const kamem = raidSchema({
  raidname: "카멘",
  itemlevel: {
    suitability: [1610, 1630],
    pluslevel: 5,
  },
  title: ["빛을 꺼뜨린 자"],
  wepon: {
    stage: [19, 23],
    itemlevel: [1620, 1640],
    quality: 90,
  },
  armor: {
    stage: [19, 21],
    itemlevel: [1610, 1630],
    quality: 80,
    transcedence: [0, 75],
  },
  gem: [8.5, 9.5],
});
