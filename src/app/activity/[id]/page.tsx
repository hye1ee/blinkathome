"use client";
import PageContainer from "@/components/PageContainer";
import BlinkConnector from "@/lib/BlinkConnector";
import { VideoData } from "@/lib/type";
import { mockVideos } from "@/lib/videodata";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { BiCaretRightCircle } from "react-icons/bi";

export default function Page({ params }: { params: { id: string } }) {
  const videoRef = useRef<ReactPlayer>(null);

  const [data, setData] = useState<VideoData>();
  const [indicies, setIndicies] = useState<Set<number>>();
  const [currtime, setCurrtime] = useState<number>(0);

  useEffect(() => {
    setData(mockVideos.filter((el) => el.id === params.id)[0]);
  }, []);

  useEffect(() => {
    if (data) setIndicies(new Set(data.notes.map((note) => note.index)));
  }, [data]);

  useEffect(() => {
    const currtimeInt = Math.floor(currtime);
    if (indicies && indicies.has(currtimeInt)) {
      const newCommand = data?.notes.find(
        (note) => note.index === currtimeInt
      )?.command;
      if (newCommand) BlinkConnector.get().runCommand(newCommand);
    }
  }, [currtime]);

  const seekTo = (time: number) => {
    videoRef?.current?.seekTo(time, "seconds");
  };

  return (
    <PageContainer>
      <PageWrapper>
        <VideoTitleWrapper>
          <VideoId> #{params.id}</VideoId>
          <VideoTitle>{data?.label}</VideoTitle>
        </VideoTitleWrapper>
        <ContentWrapper>
          <ReactPlayer
            width={900}
            height={506}
            controls={true}
            ref={videoRef}
            onProgress={(state) => {
              setCurrtime(state.playedSeconds);
            }}
            url={`https://www.youtube.com/watch?v=${params.id}`}
          />
          <NoteContainer>
            {data?.notes.map((note, idx) => (
              <NoteItem key={note.index} onClick={() => seekTo(note.index)}>
                {`${idx + 1}. ${note.label}`}
                <NoteTag time={note.index} />
              </NoteItem>
            ))}
          </NoteContainer>
        </ContentWrapper>
      </PageWrapper>
    </PageContainer>
  );
}

const PageWrapper = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  gap: 20px;
`;

const VideoTitleWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const VideoId = styled.div`
  color: rgb(255, 0, 162);
`;

const VideoTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
`;

const NoteContainer = styled.div`
  flex: 1;
  height: 506px;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;

  box-sizing: border-box;
  padding: 24px;
  border: 1px solid lightgray;
  border-radius: 8px;
`;

const NoteItem = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  font-size: 1.1rem;
  white-space: pre-wrap;
  gap: 8px;

  &:hover {
    color: rgb(255, 0, 162);
  }
`;

const NoteTag = ({ time }: { time: number }) => {
  return (
    <NoteTagContainer>
      <BiCaretRightCircle />
      {formatTime(time)}
    </NoteTagContainer>
  );
};

const NoteTagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  box-sizing: border-box;
  padding: 8px;
  border-radius: 8px;

  font-size: 0.8rem;

  background-color: rgba(255, 0, 162, 0.1);
`;

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
  } else {
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }
}

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}
