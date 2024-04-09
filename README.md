# Lostark One Depth 캐릭터 간단 검색

## 사이트 설명

로아와 같은 통계 사이트와 달리 depth를 줄여 보다 간편히 캐릭터 검색을 할 수 있는 기능.
파티를 구할 때 좀 더 편하고 쉽게 체크 할 수 있는 사이트 제작.
스팩 검사 기준은 제작자의 주관적인 기준 (베히모스 전까지 클리어함) 검사 기준은 클리어 할 정도의 스팩.
유저들이 많이 보는 부분들을 점수화 시켜 클릭 한번으로 보여줌.
팔찌 특옵은 계산에 포함 안됨.
세트 레벨은 현재 계산에 포함 안됨.
카드 추가피해 계산에 포함 안됨. (Lostark Api에서 지원 안함)

## 제작 이유

Lostark 는 현재 국내 RPG게임 중 유저 수가 많은 게임 중 하나입니다. 현재 Lostark 는 여러 스팩업 요소가 존재하며 해당 스팩들을 전부 검사하는데 꽤 시간이 걸리며 놓치는 부분도 존재합니다. 로아와, 클로아 등 유저의 스팩등을 한눈에 보도록 검사하는 사이트는 존재하지만 해당 사이트에서도 그 유저의 스팩을 보고 실제 구인구직하는 유저가 판다해야된다는 점이 있습니다. 그와 달리 이 사이트는 유저이름 검색과 동시에 클릭 한번만으로 원하는 레이드의 그 유저가 적합한지 판단하여 점수화 시켜 보여 주어 좀 더 빠르게 파티원을 모집할 수 있지 않을까하는 생각에 제작하게 되었습니다. 배포할 의향은 없습니다 Portfolio 용 및 지인,개인이 사용할 예정

## 개발관련

1인 프로젝트인만큼 혼자서 개발 구상과 UI 및 기능 구현에 있어서 어려운 점이 많았습니다. 기존의 있던 프로젝트를 중단하고 좀 더 완성도있는 프로젝트를 하나 만들어 봐야겠다 생각해서 시작한 프로젝트이며, 처음부터 가볍고 간단한 기능만 제공하기 위해 react와 같은 프레임워크 말고 바닐라 javascript를 이용했습니다. react와 비슷하게 랜더링 되는 부분을 구현해보고싶어 페이지가 넘어가지 않고 한페이지에서 랜더링되는 모습을 확인할 수 있습니다.
css는 위에서와는 상반되지만 css 프레임워크가 편리한 점이 많아져서 한번 사용해봤습니다. 기존 css를 짜는 것보다 훨씬 시간 절약에 되었던 점이 좋았던거 같습니다.

단점을 좀 말해보자면 유지 보수가 굉장히 어려울거 같습니다. 협업이 아니기에 제 마음가는대로 코드를 짜서 처음 보는 사람은 난해할거라고 생각됩니다

## 미흡한 점

아직 손볼 부분이 많지만 혼자 만든 프로젝트인큼 너무 욕심내지 않고 기술적 완성의 집중하였고 편의 기능 및 UI에 부족함이 있다고 생각합니다.
시간이 된다면 보완할 예정

## 제작 tool

Lostark 공식 api, vanilla Javascript, [module] axios, tailwind

## 참고 및 출처

Lostark 공식 홈페이지 및 개발자의 Brain

### User 검사 schema

userSpec = {
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
