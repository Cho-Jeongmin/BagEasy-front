import React from "react";
import { styled } from "styled-components";
import Item from "./Item";

const List = ({ posts, setRefresh, offset = "97px", liked = false }) => {
  return (
    <Wrapper offset={offset}>
      {!posts || posts.length === 0 ? (
        <NoList>목록이 없어요.</NoList>
      ) : (
        posts.map((post, key) => (
          <Item post={post} setRefresh={setRefresh} liked={true} key={key} />
        ))
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.offset};
  padding-bottom: ${props => props.offset};
  box-sizing: border-box;
  overflow: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default List;
