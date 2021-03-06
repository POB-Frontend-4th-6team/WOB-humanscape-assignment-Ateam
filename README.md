# Human Scape Search Recommend Web
## 웹 주소
주소: https://wanted-humanscape-6a.netlify.app/
## 파일 구조
```
├─assets
│  └─svgs
├─hooks
│  └─worker
├─pages
│  ├─components
│  │  ├─Footer
│  │  └─Header
│  └─SearchPage
│      ├─Input
│      └─Result
├─services
├─states
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
```
## 사용 라이브러리
- `@reduxjs/toolkit`
- `axios`
- `classnames`
- `korean-regexp`
- `lodash`
- `react`
- `react-dom`
- `react-query`
- `react-redux`

## 기능
### Search Input
1. lodash의 debounce 사용
    - 단어를 입력할 때 단어를 다 입력했을때 api 요청을 보내기 위해 사용.
    - debounce 함수에 useMemo를 감싸지 않아서 작동하지 않았음.

### Search Result
1. 키보드 이벤트
    - KeyboardEvent를 이용해서 위, 아래 방향키 인식.
    - 검색 결과를 이동함에 따라 검색 입력창 값 변경.
    - 검색 결과 중 사용자의 키보드 이벤트에 따라 선택된 질병명을 배경색을 변경하여 표시.
2. fuzzy 문자열 검색
    - korean-regexp 라이브러리를 통해 searchText에 맞춘 정규식을 생성, useQuery로 반환된 배열에 사용 후 조건과 일치하는 데이터만 재반환.
3. 입력한 단어에 일치하는 부분 bold 처리
    - 검색 결과 문자을 split해서 한 글자씩 입력한 단어와 매칭.
    - 매칭되는 글자는 `<mark>`태그를 사용해서 bold 처리.

### api 요청
1. 한 글자씩 API 요청 보내기
    - 나중에 퍼지 검색을 하기 위해 입력된 단어를 배열화 하여 한 글자씩 나누어 API 요청.
    - 한 글자당 axios.get으로 묶어서 axios.all에 한번에 넣어서 동시에 API 요청.
    - 해당 API 요청이 느려 개발, 테스트에 어려움이 있었음.
2. API 호출 최적화
    - 로컬 캐싱: useQuery사용시 설정값으로 cacheTime, staleTime을 지정, 해당시간동안 같은 키값으로 쿼리 발생 시 로컬 캐싱 적용.
    - debounce: lodash의 debounce를 사용하여 의도적인 시간내에 적용된 함수 중 마지막 함수만 실행, 검색 입력 후 정해진 시간 동안 입력이 없으면 입력된 단어로 API 호출.

## 실행 순서
1. 검색창 클릭 후 질병명 입력

![image](https://user-images.githubusercontent.com/52916848/169663521-76ee8d6b-ef2f-465b-b36c-e71f5eee5c5f.png)

- 유의 사항: API 요청이 느리므로 결과값을 받아오기 전까지 약간의 시간이 소요됨.


2. 입력 후 추천 검색어 결과

![image](https://user-images.githubusercontent.com/52916848/169663571-df444d67-14b0-46d8-8b00-b8ce5e2e4c69.png)

- 입력한 단어와 매칭되는 부분은 bold 처리.


3. 입력창에 포커스 되어 있을 때 키보드 아래, 위 버튼 이벤트

![image](https://user-images.githubusercontent.com/52916848/169663657-e73f86a5-0fe9-4f24-b0f4-87d901e707c5.png)
- 키보드 이벤트에 따라 사용자가 각각의 질병명을 선택했을 때, 검색 창의 내용이 바뀜.
- 해당 목록은 다른 배경색 적용.
