export interface ITrademarkCard {
  id?: number;
  application_number: string | null;
  image_url: string | null;
  thumbnail_url?: string | null;
  status: string | null;
  trademark_name?: string | null;
  trademark_name_name_en?: string | null;
  trademark_product_type?: {
    id: number;
    trademark_id: number;
    product_type_id: number;
    product_type: {
      code: string | null;
      title: string | null;
    };
  }[];
  labels: {
    id: number;
    trademark_id: number;
    label_id: number;
    label: {
      id: number;
      title: string;
      image_url: string;
    };
  }[];
}
