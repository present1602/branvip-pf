export interface ITrademarkSummary {
  title?: string;
  application_number: string;
  image_url: string;
  small_image_url?: string;
  status: string;
  tags?: string[] | null;
  labels?: ITrademarkLabel[];
}

// export interface ITrademarkSummary {
//   title?: string;
//   application_number: string;
//   image_url: string;
//   application_reference_number?: string,
//   small_image_url?: string;
//   status: string;
//   tags?: string[] | null;
//   applicant_name?: string[] | null;
//   agent_name?: string[] | null;
//   labels?: ITrademarkLabel[];
// }

export interface ITrademarkLabel {
  label: {
    title: string;
    id: number;
  };
}
