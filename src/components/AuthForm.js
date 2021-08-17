import { authService } from 'fbase';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Error = styled.div`
  height: 25px;
  width: 390px;
  border-radius: 3px;
  text-align: center;
  line-height: 25px;
`;

const ErrorText = styled.div`
  font-size: 13px;
  font-weight: 600;
  height: 25px;
  width: 390px;
  border-radius: 3px;
  background: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
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

const Login = styled.input`
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
  &:focus {
    color: blue;
  }
`;

const Text = styled.span`
  vertical-align: middle;
  line-height: 40px;
`;

const AuthForm = () => {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      await authService.signInWithEmailAndPassword(email, password);
    } catch(error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Error>
        {error && <ErrorText>
          ID 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 ID 입니다.
        </ErrorText>}
      </Error>
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
        />
        <Login type="submit" value="로그인"></Login>
        <SLink to="/Account">
          <Text>계정생성</Text>
        </SLink>
      </Form>
    </>
  )
}
export default AuthForm;