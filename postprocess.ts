import { readJSON, writeJSON } from "https://deno.land/x/flat/mod.ts";

interface IShopeeTrendDataSectionIndex {
  data_type: string;
  key: string;
  filtered?: string;
  filtered_dunit?: string;
}

interface IShopeeTrendDataSectionDataTopProduct {
  info: string;
  count: number;
  data_type: string;
  name: string;
  label: string;
  key: string;
  images: string[];
  list?: string[];
}

interface IShopeeTrendDataSectionData {
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

interface IShopeeTrendDataSection {
  total: number;
  key: string;
  index: IShopeeTrendDataSectionIndex[];
  data: IShopeeTrendDataSectionData;
  item_card_type: string;
}

interface IShopeeTrendData {
  update_time: number;
  version: string;
  sections: IShopeeTrendDataSection[];
  expire: number;
  tab_meta_data?: string;
  misc_info?: string;
}

interface IShopeeTrendResponse {
  bff_meta?: string;
  error: number;
  error_msg?: string;
  data: IShopeeTrendData;
}

interface trend {
  keyword: string;
  image: string;
  count: number;
  source: string;
}

const filename = Deno.args[0]; // Same name as downloaded_filename
const data: IShopeeTrendResponse = await readJSON(filename);

if (data["error"] !== 0) {
  console.log("Error", data["error"]);
}

const section = data["data"]["sections"][0];
const products = section["data"]["top_product"];

const trends: trend[] = products.map(({ name, images, count }) => {
  const image = `https://cf.shopee.co.id/file/${images[0]}`;
  return {
    keyword: name,
    count,
    image,
    source: "SHOPEE",
  };
});

const newfile = `shopee_trends.json`;
await writeJSON(newfile, trends);
