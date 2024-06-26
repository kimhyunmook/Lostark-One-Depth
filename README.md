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

Lostark 는 여러 스팩업 요소가 존재하며 해당 스팩들을 전부 검사하는데 꽤 시간이 걸리며 놓치는 부분도 존재합니다. 로아와, 클로아 등 유저의 스팩등을 한눈에 보도록 검사하는 사이트는 존재하지만 해당 사이트에서도 그 유저의 스팩을 보고 실제 파티원을 구하는 유저가 판다해야된다는 점이 있습니다. 다른 점이라고 하면 유저 검색과 동시에 클릭 한번만으로 원하는 레이드의 그 유저가 적합한지 판단하여 점수화 시켜 보여 주어 좀 더 빠르게 파티원을 모집할 수 있지 않을까하는 생각에 제작하게 되었습니다. 

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


## 동작 모습
### 홈페이지 전체적 모습
![lostark 전체모습](https://github.com/kimhyunmook/myProject/assets/71058188/14c1273e-1632-45e0-bace-42556fb80b9b)
* PC

### 팝업
![lostark_popup](https://github.com/kimhyunmook/myProject/assets/71058188/0827d243-c024-4b79-bbfe-20bc5af6bf2b)
![lostark_쿠키](https://github.com/kimhyunmook/myProject/assets/71058188/35413f95-e9a1-4a70-afce-47ada09a8e85)
* 쿠키로 하루 동안 안 볼 수 있음


### 유저 스팩 검사
![lostark 동작](https://github.com/kimhyunmook/myProject/assets/71058188/a9907473-bc19-467d-b0f7-cf094a865277)
* [메뉴] - 레이드 리스트 해당 레이드를 클릭하고 스팩검사시 점수를 표시

### end_spec (100)
![end](https://github.com/kimhyunmook/myProject/assets/71058188/4b6cafde-5daa-4284-8f00-d69a3ae90d54)
### over_spec (90~99)
![over](https://github.com/kimhyunmook/myProject/assets/71058188/1cbae531-a8f4-4649-8877-52d87b23bb9f)
### best_spec (80~89)
![best](https://github.com/kimhyunmook/myProject/assets/71058188/74ee48cc-c0a7-4257-a161-cba8087eff41)
### nice_spec (70~79)
![nice](https://github.com/kimhyunmook/myProject/assets/71058188/f65a7798-01d0-49f7-bf2a-98e04da3d060)
### cut_line (60~69)
![cut_line](https://github.com/kimhyunmook/myProject/assets/71058188/5ce58eb0-6d9f-4f8b-b3eb-39bb10667971)
### bad_spec (0~59)
![bad](https://github.com/kimhyunmook/Lostark-One-Depth/assets/71058188/15947b85-df62-49bc-ae86-3ad66497cb19)