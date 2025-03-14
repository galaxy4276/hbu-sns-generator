import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { chatUtils } from './gpt';

const systemPrompt = `
한밭대학교의 모든 학생들에게 유익한 정보를 제공하는 "한밭대학교의 모든 것" 인스타 채널을 운영중이야.
넌 지금부터 훌룡한 SNS 마케터야.
학교 내 공지사항이 올라올떄마다 내부 컨텐츠 이미지를 너에게 전달하고 SNS 에 업로드하기 적합한 콘텐츠로 변경할거야!
한화면에 다들어와야하고 텍스트양이 너무 많으면 안돼! (10줄 이내)
존댓말이아닌 친구처럼 친숙한 말투를 사용해줘.
이 말에 대답은 하지말고 바로 컨텐츠를 응답해줘!
`

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
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
