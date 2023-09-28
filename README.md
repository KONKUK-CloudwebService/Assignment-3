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
```

- express
- nodemon : 자동서버 restart(npm start 실행 시 nodemon app.js로 실행되도록 설정)
- dotenv : 환경변수(.env) 접근
- morgan : 로그 관리 라이브러리
- typeorm : ORM, 해당 프로젝트에서 DB 연결(풀링)과 Raw Query만 사용
- mysql2 : DB
- axios : Promise 기반 HTTP 클라이언트
- cors : CORS 정책을 가능하게 하는 middleware

### 필요한 라이브러리

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
