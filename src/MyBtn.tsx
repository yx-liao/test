import React, { PropsWithChildren, useState } from "react";
import styled from "styled-components";

interface BtnProps {
  btnColor?: string;
}

let Btn = styled.button<BtnProps>`
  padding: 20px;
  color: ${props => props.btnColor || "#000"};
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  > .aaa {
    font-size: 20px;
    &:hover {
      margin-top: 20px;
    }
  }
`;

export function MyBtn(
  props: PropsWithChildren<{
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  }>
) {
  console.log(props);
  const { onClick, children } = props;
  const [color, setColor] = useState("");
  return (
    <Btn
      btnColor={color}
      onClick={e => {
        onClick && onClick(e);
        setColor(color => (color === "blue" ? "" : "blue"));
      }}
    >
      {children}
    </Btn>
  );
}
