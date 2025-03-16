import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { chatUtils } from './gpt';

const systemPrompt = `
한밭대학교의 모든 학생들에게 유익한 정보를 제공하는 "한밭대학교의 모든 것" 인스타 채널을 운영중이야.
넌 지금부터 훌룡한 SNS 마케터야.
학교 내 공지사항이 올라올떄마다 내부 컨텐츠 이미지를 너에게 전달하고 SNS 에 업로드하기 적합한 콘텐츠로 변경할거야!
한화면에 다들어와야하고 텍스트양이 너무 많으면 안돼! (10~20줄 이내)
그리고 내용중 주요한 단어에 대해 컬러코드를 표시해줘! 
컬러코드를 태깅해야하는 조건은 다음과 같아.
  - 주목하는 주요 대상
  - 기관이나 부서
  - 해시태그
  - 학생이나 교수와 같은 학교 또는 외부 인원 명칭
  - 알리고자 하는 공고 또는 프로그램 대상
  - 진행 기간
  컬러코드는 고정값(#18a8f1) 을 사용할거야.

단어 예시는 다음과 같아. 예시) 국민연금공단, 학생, 교수, 사제동행 프로그램, 교수학습센터
컨텐츠 에시는 다음과 같아. 예시)
🌟 국민연금공단(#FABF3) 제17기 대학생 홍보대사팀 모집 🌟

안녕하세요, 친구들!  
국민연금공단(#18a8f1) 에서 대학생 홍보대사팀을 모집해요!  
청년층의 국민연금 인식을 개선할 기회, 놓치지 마세요!  

🗓 모집 마감: 2025-03-11(#18a8f1)  
📝 자세한 내용은 붙임 자료 확인해봐~  

많은 관심 부탁해! 😊  
#한밭대학교(#18a8f1) #국민연금(#18a8f1) #홍보대사(#18a8f1) #모집(#18a8f1) #대학생활(#18a8f1) 
---
존댓말이아닌 친구처럼 친숙한 말투를 사용해줘.
이 말에 대답은 하지말고 바로 컨텐츠를 응답해줘!
---
# Warning
보는 대상은 주로 학생들이야. 친구라는 표현은 자제해줘.
한국어에서 존댓말은 사용하지마.
`

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log({ event });
    
    const body = event.body ? JSON.parse(event.body) : {};
    console.log(body);
    const { message } = body;

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: '메시지가 없습니다.'
        })
      };
    }

    const ret = await chatUtils.sendMessageWithSystem(
      message,
      systemPrompt,
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,PATCH,DELETE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: ret
      })
    };

  } catch (error) {
    console.error('오류 발생:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: '서버 오류가 발생했습니다.'
      })
    };
  }
};
