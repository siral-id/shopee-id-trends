import { loadResponse, serializeResponse } from "./mod.ts";
import {
  ICreateTrend,
  setupOctokit,
  upload,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");
const octokit = setupOctokit(ghToken);

const filename = Deno.args[0];
const response = await loadResponse(filename);

const serializedData = serializeResponse(response);

await upload<ICreateTrend[]>(octokit, serializedData, "WRITE_SHOPEE_TRENDS");

Deno.exit();
