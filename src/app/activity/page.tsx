"use client";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import Video from "@/components/Video";
import { mockVideos } from "@/lib/videodata";
import { VideoData } from "@/lib/type";

export default function Page() {
  const router = useRouter();

  const [videos, setVideos] = useState<VideoData[]>(mockVideos);

  return (
    <PageContainer>
      <VideoGrid>
        {videos.map((video) => (
          <Video
            id={video.id}
            label={video.label}
            key={video.id}
            onClick={() => router.push(`/activity/${video.id}`)}
          />
        ))}
      </VideoGrid>
    </PageContainer>
  );
}

const VideoGrid = styled.div`
  width: 80%;

  display: flex;
  flex-wrap: wrap;

  align-items: flex-start;
  justify-content: space-between;
  /* gap: 20px; */
`;
