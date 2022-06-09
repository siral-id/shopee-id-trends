import { readJSON } from "https://deno.land/x/flat@0.0.15/mod.ts";
import { IShopeeTrendResponse } from "./mod.ts";
import {
  ICreateTrend,
  Source,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

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
