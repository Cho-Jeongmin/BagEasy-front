import React, { useState } from "react";
import { styled } from "styled-components";
import place from "../../assets/modal/place.png";
import { GetUniList } from "../../api/uni";
//리스트 중 하나 클릭했을때 uni에 선택한 아이템의 스트링이 저장되고 모달이 닫히도록 함
//퍼블리싱 단계에서는 첫번째 아이템에서만 작동
//모달 밖을 선택했을때도 모달이 닫힘
//uni, isOpen등 변수명은 바꾸셔도 됩니다.
//자동 완성이 아닌 검색시 키워드를 포함한 리스트를 보여줍니다. (버튼 추가 예정)

const Modal = ({ isOpen, setIsOpen, uni, setUni }) => {
  const [uniList, setUniList] = useState([]);
  const handleUniChange = e => {
    setUni(e.target.value);
  };

  const handleItemClick = selectedUni => {
    setUni(selectedUni);
    setIsOpen(false);
  };
  const getUniList = async () => {
    if (uni) {
      try {
        //프로미스 해결 및 데이터 접근
        const data = await GetUniList(uni);
        console.log(data);
        setUniList(data);
      } catch (error) {
        console.log("에러 발생", error);
      }
    }
  };

  return (
    <>
      <Layer
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      ></Layer>
      <Container>
        <p>영문 학교명을 입력해주세요!</p>
        <div className="wrapper">
          <Input>
            <Place src={place} alt="" />
            <input value={uni} onChange={handleUniChange} />
          </Input>
          <SearchBtn onClick={getUniList}>검색</SearchBtn>
        </div>

        <List>
          {uniList &&
            uniList.map(uni => {
              return (
                <Item onClick={() => handleItemClick(uni.name)}>
                  {uni.name}
                </Item>
              );
            })}
        </List>
      </Container>
    </>
  );
};

export default Modal;

const Place = styled.img`
  width: 17px;
  height: 18px;
  margin-left: 7px;
`;
const SearchBtn = styled.div`
  width: 50.07px;
  height: 31px;
  border-radius: 100px;
  background: #ffc701;
  display: flex;
  margin-top: 19px;
  margin-left: 6.5px;

  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Layer = styled.div`
  display: block;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const List = styled.div`
  margin-top: 16px;
  margin-left: 28px;
  overflow: auto;
`;
const Item = styled.div`
  margin-bottom: 16px;
  width: 90%;
  color: #000;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Container = styled.div`
  width: 80%;
  height: 248px;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  p {
    margin: 30px 0px 0px 32px;
    color: #eeba00;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  }

  .wrapper {
    display: flex;
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const Input = styled.div`
  width: 233px;
  height: 31px;
  border-radius: 100px;
  background: #efefef;

  align-self: center;
  margin-top: 19px;

  background: #f5f5f5;
  display: flex;
  align-items: center;

  input {
    width: 80%;
    background: #f5f5f5;
    border: none;
    outline: none;
    margin-left: 5px;
    color: #000;
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
