"use client";
import { useRouter, usePathname } from "next/navigation";
import styled from "styled-components";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderItem active={false} onClick={() => router.push("/")}>
          <HeaderIcon src="/blink_at_home_logo.png" />
        </HeaderItem>
        <HeaderItem
          active={pathname.includes("/board")}
          onClick={() => router.push("/board")}
        >
          Board
        </HeaderItem>
        <HeaderItem
          active={pathname.includes("/activity")}
          onClick={() => router.push("/activity")}
        >
          Activity
        </HeaderItem>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid lightgray;
`;

const HeaderWrapper = styled.div`
  width: 80%;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

const HeaderIcon = styled.img`
  width: auto;
  height: 60%;

  box-sizing: border-box;
`;

const HeaderItem = styled.div<{ active: boolean }>`
  width: fit-content;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 8px 20px 0px 20px;
  ${(props) => props.active && "color: rgb(255, 0, 162);"}
  ${(props) => props.active && "border-bottom: 3px solid rgb(255, 0, 162);"}

  &:hover {
    color: rgba(255, 0, 162, 0.5);
  }
  transition: all 0.3s;

  cursor: pointer;
`;
