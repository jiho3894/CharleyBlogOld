import { authService } from 'fbase';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Error = styled.div`
  height: 25px;
  border-radius: 3px;
  text-align: center;
  line-height: 25px;
  margin-top: 10px;
`;

const ErrorText = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 600;
  height: 25px;
  width: 240px;
  border-radius: 3px;
  background: red;
`;

const Body = styled.div`
  font-size: 13px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 420px;
  height: 420px;
  border-radius: 18%;
  background-color: gold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 260px;
`;

const IDPW = styled.input`
  font-size: 17px;
  width: 220px;
  height: 36px;
  color: black;
  outline: none;
  background: none;
  border: none;
  border-bottom: 2px solid #95a5a6;
  &:focus::-webkit-input-placeholder {
    color:transparent;
  }
`;

const Login = styled.button`
  width: 240px;
  height: 40px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  outline: none;
  border: none;
  background: white;
  margin:15px 0 15px 0;
  &:hover {
    box-shadow: 0px 0px 4px #666666 inset;
  }
`;

const SLink = styled(Link)`
  width: 240px;
  height: 40px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  background-color: white;
  &:hover {
    box-shadow: 0px 0px 4px #666666 inset;
  }
`;

const Text = styled.span`
  vertical-align: middle;
  line-height: 40px;
`;

const AuthForm = () => {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck,setPasswordCheck] = useState('');
  const [passwordError,setPasswordError] = useState(false);

  const onChange = (event) => {
    const {target: { name, value }} = event;
    if(name === "email") {
      setEmail(value);
    } else if(name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      
      await authService.createUserWithEmailAndPassword(email, password);
    } catch(error) {
      if(password !== passwordCheck) {
        return alert('비밀번호와 비밀번호 확인이 일치해야 합니다.')
      }
    }
  };

  const onChangePasswordChk = async (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  return (
    <Body>
      <Container>
        <Form onSubmit={onSubmit}>
          <IDPW 
            name="email" 
            type="text" 
            placeholder="이메일" 
            required value={email} 
            onChange={onChange}
          />
          <IDPW 
            name="password" 
            type="password" 
            placeholder="비밀번호" 
            required value={password} 
            onChange={onChange}
            minLength="6"
          />
          <IDPW 
            name="passwordCheck" 
            type="password" 
            placeholder="비밀번호 확인" 
            value={passwordCheck}
            required onChange={onChangePasswordChk}
            minLength="6"
          />
          <Error>
            {passwordError && <ErrorText>
              비밀번호가 일치하지 않습니다.
            </ErrorText>}
          </Error>
          <Login type="submit" >계정생성</Login>
          <SLink to="/">
            <Text>돌아가기</Text>
          </SLink>
        </Form>
      </Container>
    </Body>
  )
}
export default AuthForm;