"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BlinkConnector from "@/lib/BlinkConnector";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import Button from "@/components/Button";
import { BlinkJSON } from "@/lib/type";

interface Video {
  id: string;
  title: string;
}

export default function Home() {
  const router = useRouter();

  const [commandVal, setCommandVal] = useState("");
  const [isConnected, setIsConnected] = useState(
    BlinkConnector.get().isConnected()
  );
  const [outputVal, setOutputVal] = useState("");

  useEffect(() => {
    BlinkConnector.get().addlistener({
      onReceive: (output) => setOutputVal(output),
      onConnect: (isConnected) => setIsConnected(isConnected),
    });
  }, []);

  function runCommand() {
    // type check is needed
    BlinkConnector.get().runCommand(JSON.parse(commandVal) as BlinkJSON);
  }

  async function connectDevice() {
    BlinkConnector.get().connect();
  }

  const disconnectDevice = () => {
    BlinkConnector.get().disconnect();
  };

  return (
    <PageContainer style={{ gap: "20px" }}>
      <Button
        width={300}
        label={isConnected ? "Click to Disconnect" : "Click to Connect"}
        onClick={isConnected ? disconnectDevice : connectDevice}
      />
      <Button
        width={300}
        label={"Clear the Board"}
        onClick={() => {
          BlinkConnector.get().runCommand({ cmd: "reset" });
        }}
      />
      <div
        style={{
          width: "50%",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          {/* <CommandInput
            value={commandVal}
            onChange={(e) => setCommandVal(e.target.value)}
          />
          <Button onClick={runCommand}>Submit</Button> */}
        </div>
        {/* <CommandOutput>{outputVal}</CommandOutput> */}
      </div>
    </PageContainer>
  );
}

const CommandInput = styled.input`
  flex: 8;
  height: 50px;

  border: none;
  border-radius: 8px;
`;

const CommandOutput = styled.div`
  width: 100%;
  height: 300px;

  background-color: white;
  border-radius: 8px;
`;

const Title = styled.div`
  font-weight: medium;
  font-size: 2.5rem;
  margin: 150px 0px;
`;
