# 한밭대학교 SNS 마케팅 자동화 Lambda 함수

학사공지를 SNS 마케팅 콘텐츠로 자동 변환하는 AWS Lambda 함수입니다.

## 🚀 주요 기능

- OpenAI GPT-4를 활용한 텍스트 최적화
- 학사공지를 SNS 친화적인 콘텐츠로 변환
- AWS Lambda를 통한 서버리스 아키텍처

## 🛠 기술 스택

- Node.js 20
- TypeScript
- OpenAI API
- AWS Lambda
- Docker

## ⚙️ 환경 변수

- `OPENAI_API_KEY`: OpenAI API 키

## 🚨 주의사항

- Lambda 함수의 타임아웃은 최소 15초 이상으로 설정해주세요.
- 메모리는 최소 512MB 이상을 권장합니다.
- API 키는 절대 소스 코드에 직접 포함하지 마세요.

## 📄 라이선스

MIT License

## 👥 기여하기

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다
3. 변경사항을 커밋합니다
4. 브랜치에 푸시합니다
5. Pull Request를 생성합니다
