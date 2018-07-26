import * as React from "react"
import styled from "styled-components"
import styles from "../util/style"
import InputText from "./InputText"
import Icon, { I } from "./icon/Icon"

interface LProps {
  name: string
  pass: string
  passRe: string
  handleChange: (e: React.FormEvent) => void
  handleClick: (key: string) => void
  signin: () => Promise<any>
}

export default ({ name, pass, passRe, handleChange, handleClick, signin }: LProps) => (
  <Wrapper>
    <GridContainer>
      <TitleWrapper>
        <Icon i={I.LogoTypo} />
        <div>アカウントの作成</div>
      </TitleWrapper>
      <FormWrapper>
        <div>
          <InputText label={"ユーザー名"} name={"name"} value={name} handleChange={handleChange} />
          <p>３文字以上で入力して下さい</p>
        </div>
        <div>
          <PassWrapper>
            <InputText
              label={"パスワード"}
              type={"password"}
              name={"pass"}
              value={pass}
              handleChange={handleChange}
            />
            <Divider />
            <InputText
              label={"パスワードの確認"}
              type={"password"}
              name={"passRe"}
              value={passRe}
              handleChange={handleChange}
            />
          </PassWrapper>
          <p>半角英字、数字、記号を組み合わせて４文字以上で入力してください</p>{" "}
        </div>
      </FormWrapper>
      <ButtonWrapper>
        <p onClick={() => handleClick("signin")}>キャンセル</p>
        <styles.SC.Button blue onClick={signin}>
          アカウントを作成
        </styles.SC.Button>
      </ButtonWrapper>
      <Agreement>
        <div>
          <Icon i={I.Logo} />
          <div>免責事項</div>
        </div>
        <p>ほげほげほげほげほげほげほげほげほげほえほげほげほげほえほえｇへおｇほえｇ</p>
        <p>ほげほげほげほげほげほげほげほげほげほえほげほげほげほえほえｇへおｇほえｇ</p>
        <p>ほげほげほげほげほげほげほげほげほげほえほげほげほげほえほえｇへおｇほえｇ</p>
        <p>ほげほげほげほげほげほげほげほげほげほえほげほげほげほえほえｇへおｇほえｇ</p>
      </Agreement>
    </GridContainer>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;

  background-color: ${styles.Color.BGWhite};
`

const GridContainer = styled.div`
  width: 750px;
  height: 600px;
  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-rows: 30% 50% 20%;
  grid-template-areas:
    "TitleWrapper  Agreement"
    "FormWrapper   Agreement"
    "ButtonWrapper Agreement";

  padding: 48px 40px 36px;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 8px;
`

const TitleWrapper = styled.div`
  grid-area: TitleWrapper;
  align-self: center;

  img {
    width: 80%;
  }

  div {
    color: ${styles.Color.FontDrak};
    padding-right: 5px;
    font-size: 1.5rem;
  }
`

const FormWrapper = styled.div`
  grid-area: FormWrapper;
  display: flex;
  padding: 10px 0;
  flex-wrap: wrap;
  align-content: space-around;

  label {
    font-size: 0.9rem;
    color: ${styles.Color.FontNormal};
  }

  p {
    margin: 10px 0;
    font-size: 0.75rem;
    color: ${styles.Color.FontDrak};
  }
`

const PassWrapper = styled.div`
  display: flex;
`
const Divider = styled.div`
  width: 30px;
`

const ButtonWrapper = styled.div`
  grid-area: ButtonWrapper;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: ${styles.Color.Blue};
  }
  span {
    padding: 5px 30px;
  }
`

const Agreement = styled.div`
  grid-area: Agreement;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 50px 0 50px 50px;
  color: ${styles.Color.FontDrak};

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20%;
    }

    div {
      padding-left: 10px;
      font-size: 1.5rem;
    }
  }

  p {
    margin: 10px 0;
  }
`
