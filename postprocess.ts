import { readJSON } from "https://deno.land/x/flat/mod.ts";
import { IShopeeTrendResponse } from "./interfaces.ts";
import { getMongoClient } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/database.ts";
import {
  ITrend,
  ITrendSchema,
} from "https://raw.githubusercontent.com/siral-id/deno-utility/main/interfaces.ts";

const mongoUri = Deno.env.get("MONGO_URI");
if (!mongoUri) throw new Error("MONGO_URI not found");

const client = await getMongoClient(mongoUri);
const trendCollection = client.database().trendCollection<ITrendSchema>("trends");

const filename = Deno.args[0]; // Same name as downloaded_filename
const response: IShopeeTrendResponse = await readJSON(filename);

if (response["error"] !== 0) {
  console.log("Error", response["error"]);
}

const section = response["data"]["sections"][0];
const products = section["data"]["top_product"];

const trends: ITrend[] = products.map(({ name, images, count }) => {
  const image = `https://cf.shopee.co.id/file/${images[0]}`;
  const timestamp = new Date().toISOString();

  return {
    keyword: name,
    count,
    image,
    source: "SHOPEE",
    timestamp,
  };
});

await trendCollection.insertMany(trends);
