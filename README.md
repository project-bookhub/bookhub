# 경일 Node.js 첫 프로젝트
강수빈, 황현준

## 소개
- 일반 회원이 전자책을 작성할 수 있고 무료로 독서가 가능한 서비스입니다.

<br>


# 역할 분배
- 강수빈: HTML, CSS, JS 담당
- 황현준: Backend 전반 담당 및 이미지 처리


## 화면 구성
<img width="1239" alt="image" src="https://github.com/project-bookhub/bookhub/assets/54355780/1e4dcd65-b56e-461d-9656-5690e118bb55">


## ERD
<img width="959" alt="image" src="https://github.com/project-bookhub/bookhub/assets/54355780/a243b994-3091-41ff-996c-2efe4f749197">



## 칸반보드
- 칸반보드를 통해 효율적인 작업
![image](https://github.com/project-bookhub/bookhub/assets/54355780/50638cbd-51ad-41a1-b56a-7d8c7c675f07)


## S3 이미지 관리
- multer-s3, aws-sdk 사용
- Multer-s3 미들웨어를 사용하여 multipart/form-data로 전송되는 파일에대한 처리.
- S3에 저장된 이미지 객체는 파일을 업로드한 시간_파일명.확장자로 관리
<img width="964" alt="image" src="https://github.com/project-bookhub/bookhub/assets/54355780/f2d7d498-14d9-4555-83db-91a27eae6f30">
