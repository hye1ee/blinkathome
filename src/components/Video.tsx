import { getYoutubeThumbnail } from "@/lib/utils";
import { useState } from "react";
import styled from "styled-components";

interface VideoProps {
  id: string;
  label: string;
  onClick: () => void;
}

const Video = ({ id, label, onClick }: VideoProps) => {
  const [hover, setHover] = useState(false);

  return (
    <VideoContainer
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Thumbnail src={getYoutubeThumbnail(id)} alt={label} />
      <VideoInfo active={hover}>{label}</VideoInfo>
    </VideoContainer>
  );
};

export default Video;

const VideoContainer = styled.div`
  width: 32%;

  background-color: #ffffff;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;

  border-radius: 8px;
`;

const VideoInfo = styled.div<{ active: boolean }>`
  box-sizing: border-box;
  padding: 12px;
  margin-bottom: 20px;

  /* font-weight: 600; */

  ${(props) => props.active && "color: rgba(255, 0, 162); font-weight: 600;"}
  transition: all 0.3s;
`;
