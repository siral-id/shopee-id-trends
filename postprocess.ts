import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import { readJSON } from "https://deno.land/x/flat/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { IShopeeTrendResponse } from "./interfaces.ts";
import {
  ITrend,
} from "https://raw.githubusercontent.com/siral-id/deno-utility/main/interfaces.ts";
import { Source } from "https://raw.githubusercontent.com/siral-id/deno-utility/main/enum.ts";

const ghToken = Deno.env.get("GH_TOKEN");
if (!ghToken) throw new Error("GH_TOKEN not found");

const octokit = new Octokit({ auth: ghToken });

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
    source: Source.SHOPEE,
    timestamp,
  };
});

const uuid = v4.generate();

await octokit.rest.issues.create({
  owner: "siral-id",
  repo: "core",
  title: `WRITE_TRENDS_SHOPEE_${uuid}`,
  body: JSON.stringify(trends),
});
