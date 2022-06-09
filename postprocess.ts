import { Octokit } from "https://cdn.skypack.dev/octokit@v1.7.2?dts";
import { readJSON } from "https://deno.land/x/flat@0.0.15/mod.ts";
import { v4 } from "https://deno.land/std@0.142.0/uuid/mod.ts";
import { IShopeeTrendResponse } from "./mod.ts";
import {
  ICreateTrend,
  Source,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

export function setupOctokit(octokit: Octokit, ghToken?: string): Octokit {
  if (!ghToken) throw new Error("GH_TOKEN not found");
  return octokit({ auth: ghToken });
}

export async function loadResponse(
  filename: string,
): Promise<IShopeeTrendResponse> {
  return await readJSON(filename);
}

export function serializeResponse(
  response: IShopeeTrendResponse,
): ICreateTrend[] {
  const section = response["data"]["sections"][0];
  const products = section["data"]["top_product"];

  return products.map(({ name, images, count }) => {
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
}

export async function upload(octokit: Octokit, data: ICreateTrend[]) {
  const uuid = v4.generate();

  await octokit.rest.issues.create({
    owner: "siral-id",
    repo: "core",
    title: `WRITE_TRENDS_SHOPEE_${uuid}`,
    body: JSON.stringify(data),
  });
}
