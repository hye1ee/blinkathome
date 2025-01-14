import styled from "styled-components";

interface ButtonProps {
  width?: number;
  label: string;
  onClick: () => void;
}

const Button = ({ width, label, onClick }: ButtonProps) => {
  return (
    <ButtonContainer style={{ width }} onClick={onClick}>
      {label}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.div`
  width: fit-content;

  box-sizing: border-box;
  padding: 14px 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 0, 162, 0.1);
  /* border: 1px solid rgb(255, 0, 162); */
  border-radius: 8px;

  color: rgb(255, 0, 162);

  &:hover {
    background-color: rgba(255, 0, 162, 0.2);
  }
  transition: all 0.3s;

  cursor: pointer;
`;
