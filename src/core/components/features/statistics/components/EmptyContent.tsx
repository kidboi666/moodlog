import * as S from './EmptyContent.styled';

export const EmptyContent = () => {
  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.Title>컨텐츠가 없습니다.</S.Title>
        <S.Description>
          일기를 작성하면 관련된 정보를 볼 수 있습니다.
        </S.Description>
      </S.YStackContainer>
    </S.ViewContainer>
  );
};
