"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <PageContainer style={{ gap: "10px", marginBottom: "120px" }}>
      <LogoImg src="/blink_at_home_logo.png" />
      <Button
        width={300}
        label="What is Blinkboard?"
        onClick={() => {
          window.open("https://makinteract.gitbook.io/blinkboard");
        }}
      />
    </PageContainer>
  );
}

const LogoImg = styled.img`
  width: 400px;
  height: auto;
`;
