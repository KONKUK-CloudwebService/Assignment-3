### 설치목록

```
npm install express
npm install nodemon --save-dev
npm install dotenv
npm install morgan
npm install typeorm
npm install mysql2
npm install axios
npm install cors
npm install -g dbmate
```

- express
- nodemon : 자동서버 restart(npm start 실행 시 nodemon app.js로 실행되도록 설정)
- dotenv : 환경변수(.env) 접근
- morgan : 로그 관리 라이브러리
- typeorm : ORM, 해당 프로젝트에서 DB 연결(풀링)과 Raw Query만 사용
- mysql2 : DB
- axios : Promise 기반 HTTP 클라이언트
- cors : CORS 정책을 가능하게 하는 middleware
- dbmate : DB 스키마 생성 및 이력관리

### 필요한 라이브러리(미설치)

```
npm install bcrypt
npm install jsonwebtoken
npm install multer
npm install multer-s3
npm install aws-sdk
npm install mysql2
npm install axios
```

- bcrypt : 암호화 모듈
- jsonwebtoken : JWT 토큰
- multer, multer-s3 : multipart.form-data를 다루기 위한 node.js 미들웨어
- aws-sdk : aws를 위한 npm 패키지

### DB 생성

```
create database assignment3 character set utf8mb4 collate utf8mb4_general_ci;
```

- mysql -u root -p 접속 후 생성 명령어 실행

### dbmate

- dbmate up : 마이그레이션도 같이 진행 (DB 없는 경우 생성)
- dbmate drop : DB를 삭제
- dbmate create : DB를 생성 // -> 외래키 설정 시 키제약 호환성 에러가 남(utf8mb4 : 이모지 표현)

- 구조

```
-- migrate:up
dbmate up 명령어 입력 시 수행할 SQL

-- migrate:drop
dbmate drop 명령어 입력 시 수행할 SQL

주석은 그대로 두고 밑에 SQL문 작성
아니면 에러나요!
```

- 테이블 수정

```
// 기존 migration 파일을 직접 수정하지 않고 새로운 migration을 진행
예시)
1. migration 파일 생성
dbmate new fic_data_set_table

2. 수정을 하고 싶은 부분 수정
-- migrate:up
ALTER TABLE users MODIFY created_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();
ALTER TABLE users MODIFY updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- migrate:down
DROP TABLE users;

```
