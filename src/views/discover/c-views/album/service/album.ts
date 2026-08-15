import hyRequest from "@/service";

export const getNewAlbums = (
  params?: {
    limit?: number;
    offset?: number;
    area?: "ALL" | "ZH" | "EA" | "KR" | "JP";
  }
) => {
  return hyRequest.request({
    url: "/album/new",
    method: "GET",
    params,
  });
};

export const getAlbumDetail = (id: number) => {
  return hyRequest.get({
    url: "/album",
    params: { id },
  });
};
