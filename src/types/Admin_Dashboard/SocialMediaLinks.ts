
export interface ISocialMediaLink {
  id: string;
  platform: string;
  url: string;
}

export interface ISocialMediaLinksResponse {
  data: ISocialMediaLink[];
  totalCount: number;
}

export interface IGetSocialMediaLinksParams {
  page?: number;
  limit?: number;
}
export interface ICreateSocialMediaLinkPayload {
  platform: string;
  url: string;
}
export interface IUpdateSocialMediaLinkPayload {
  id: string;
  platform: string;
  url: string;
}