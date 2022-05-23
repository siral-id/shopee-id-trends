export interface IShopeeTrendDataSectionIndex {
  data_type: string;
  key: string;
  filtered?: string;
  filtered_dunit?: string;
}

export interface IShopeeTrendDataSectionDataTopProduct {
  info: string;
  count: number;
  data_type: string;
  name: string;
  label: string;
  key: string;
  images: string[];
  list?: string[];
}

export interface IShopeeTrendDataSectionData {
  item?: string;
  keyword: string[];
  ads?: string;
  top_product: IShopeeTrendDataSectionDataTopProduct[];
  collection?: string;
  item_lite?: string;
  video?: string;
  voucher?: string;
  voucher_detail?: string;
  l1cat?: string;
  collection_lite?: string;
  l2cat?: string;
  shop?: string;
  shop_lite?: string;
  shopcat?: string;
  feed?: string;
  feed_tab?: string;
  stream?: string;
  promotion?: string;
  knode?: string;
  food_item?: string;
}

export interface IShopeeTrendDataSection {
  total: number;
  key: string;
  index: IShopeeTrendDataSectionIndex[];
  data: IShopeeTrendDataSectionData;
  item_card_type: string;
}

export interface IShopeeTrendData {
  update_time: number;
  version: string;
  sections: IShopeeTrendDataSection[];
  expire: number;
  tab_meta_data?: string;
  misc_info?: string;
}

export interface IShopeeTrendResponse {
  bff_meta?: string;
  error: number;
  error_msg?: string;
  data: IShopeeTrendData;
}

export interface ITrend {
  keyword: string;
  image: string;
  count: number;
  source: string;
  timestamp: string;
}
