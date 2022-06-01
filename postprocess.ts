import { readJSON } from "https://deno.land/x/flat/mod.ts";
import { IShopeeTrendResponse, ITrend, ITrendSchema } from "./interfaces.ts";
import { appendJSON } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/utility.ts";
import { getMongoClient } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/database.ts";

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

const output = `shopee_trends.json`;
await appendJSON(output, trends);

const mongoUri = Deno.env.get("MONGO_URI");
if (!mongoUri) throw new Error("MONGO_URI not found");

const client = await getMongoClient(mongoUri);
const collection = client.database().collection<ITrendSchema>("trends");
await collection.insertMany(trends);
