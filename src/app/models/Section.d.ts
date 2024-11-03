export interface Section {
  id: number;
  tag: string;
  item_order: number;
  title?: string;
  body: string;
  created_at?: Date;
  updated_at?: Date;
  image?: string;
}
