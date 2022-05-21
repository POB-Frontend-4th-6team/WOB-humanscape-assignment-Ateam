# Human Scape Search Recommend Web
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
    - 단어를 입력할 때 단어를 다 입력했을때 api 요청을 보내기 위해 사용
    - debounce 함수에 useMemo를 감싸지 않아서 작동하지 않았었다.

### Search Result
1. 키보드 이벤트
    - 추후 수정
2. 입력한 단어에 일치하는 부분 bold 처리
    - 검색 결과 문자을 split해서 한 글자씩 입력한 단어와 매칭
    - 매칭되는 글자는 `<mark>`태그를 사용해서 bold 처리
3. fuzzy 문자열 검색
    - 추후 수정

### api 요청
1. 한 글자씩 API 요청 보내기
    - 나중에 퍼지 검색을 하기 위해 입력된 단어를 배열화 하여 한 글자씩 나누어 API 요청
    - 한 글자당 axios.get으로 묶어서 axios.all에 한번에 넣어서 동시에 API 요청
    - 해당 API가 너무 느려서 개발, 테스트가 힘들었다.
2. API 호출 최적화
    - 추후 수정

## 실행 순서
1. 검색창 클릭 후 질병명 입력

![image](https://user-images.githubusercontent.com/52916848/169663521-76ee8d6b-ef2f-465b-b36c-e71f5eee5c5f.png)
- 유의 사항: API가 느리므로 좀 오래 기다려야 한다.
2. 입력 후 추천 검색어 결과

![image](https://user-images.githubusercontent.com/52916848/169663571-df444d67-14b0-46d8-8b00-b8ce5e2e4c69.png)
- 입력한 단어와 매칭되는 부분은 bold 처리
3. 입력창에 포커스 되어 있을 때 키보드 아래, 위 버튼 이벤트

![image](https://user-images.githubusercontent.com/52916848/169663657-e73f86a5-0fe9-4f24-b0f4-87d901e707c5.png)
- 밑으로 내리면 따라서 검색 창의 글씨도 바뀐다.
- 해당 목록은 배경색이 달라진다.
