import styled, { keyframes } from "styled-components";

export const move = keyframes`
0%{
    opacity:0;
}
95%{
    opacity:1;
}
`;
export const BackgroundBox = styled.div`
  .text1 {
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.clicked ? "translateX(0)" : "translateX(100%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }
  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;
    transform: ${(props) =>
      props.clicked ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }
  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-50%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-500")};
    transform: ${(props) => (props.clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

export const Box1 = styled.div`
  background-color: #ffffff;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform: ${(props) =>
    props.clicked ? "translateX(90%)" : "translateX(10%)"};
  transition: transform 1s;
  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: -200;
  }
  &::before {
    top: 3rem;
    border-radius: 23px;
    border: 4px solid #000000;
  }
  &::after {
    bottom: 3rem;
    border-radius: 23px 23px 0 0;
    border-top: 4px solid #000000;
    border-right: 4px solid #000000;
    border-left: 4px solid #000000;
  }
`;

export const Box2 = styled.div`
  background-color: #000000;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;
  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

export const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;
  /* z-index: 100; */
`;

export const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;
  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;
  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

export const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;
  box-shadow: 0 7px #999;
  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
  &:focus {
    outline: none;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

export const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

export const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;
  right: ${(props) => (props.clicked ? "52%" : "42%")};
  transform: ${(props) => (props.clicked ? "rotate(360deg)" : "rotate(0)")};
  transition: all 1.5s;
  background-color: transparent;
  &::before {
    content: "🚲";
    font-size: 4rem;
  }
  &:focus {
    outline: none;
  }
`;

export const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;
  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }
  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 100%;
    font-size: 7rem;
  }
`;
