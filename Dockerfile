# 빌드 스테이지
FROM public.ecr.aws/lambda/nodejs:20 as builder

# 작업 디렉토리 설정
WORKDIR /build

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 파일 복사 및 빌드
COPY function/ ./function/
COPY tsconfig.json ./
RUN npm run build

# 프로덕션 스테이지
FROM public.ecr.aws/lambda/nodejs:20

# 프로덕션 의존성만 설치
COPY package*.json ${LAMBDA_TASK_ROOT}/
COPY node_modules/ ${LAMBDA_TASK_ROOT}/node_modules/

# 빌드된 파일 복사
COPY --from=builder /build/dist ${LAMBDA_TASK_ROOT}/dist

# Lambda 핸들러 설정
CMD [ "dist/index.handler" ]
