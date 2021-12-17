import React, { useState } from "react";
import {
  BackgroundBox,
  Box1,
  Box2,
  ButtonAnimate,
  Form,
  Input,
  Button,
  Title,
  Link,
  Text,
} from "./Styledcomponents";
import "./style.css";

function FormComponent() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      {" "}
      <BackgroundBox className='background-box' clicked={click}>
        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>

        <Form className='signin'>
          <Title>Log In</Title>
          <Input type='email' name='email' id='emailId' placeholder='Email' />
          <Input
            type='password'
            name='password'
            id='passwordId'
            placeholder='Password'
          />
          <Link href='#'>Forgot Your Password?</Link>
          <Button>Log In</Button>
        </Form>

        <Form className='signup'>
          <Title>Sign Up</Title>
          <Input
            type='text'
            name='username'
            id='usernameId'
            placeholder='Username'
          />

          <Input type='email' name='email' id='emailId' placeholder='Email' />
          <Input
            type='password'
            name='password'
            id='passwordId'
            placeholder='Password'
          />
          <Link href='#' onClick={handleClick}>
            Already have an Account?
          </Link>
          <Button>Sign Up</Button>
        </Form>

        <Text className='text1' clicked={click}>
          <h1>Welcome!</h1>
          Don't have an account?
          <br />
          <span className='attention'>Click my Bike</span>
          <span className='attention-icon'>⤶</span>
        </Text>

        <Text className='text2' clicked={click}>
          <h1>Hi There!</h1>
          Already have an account?
          <br />
          <span className='attention'>Click my Bike</span>
          <span className='attention-icon'>⤷</span>
        </Text>

        <Box1 clicked={click} />
        <Box2 clicked={click} />
      </BackgroundBox>
    </>
  );
}

export default FormComponent;
