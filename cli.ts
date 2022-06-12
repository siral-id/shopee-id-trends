import { loadResponse, serializeResponse } from "./mod.ts";
import {
  ICreateTrend,
  setupOctokit,
  sleep,
  upload,
} from "https://raw.githubusercontent.com/siral-id/core/main/mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");
const octokit = setupOctokit(ghToken);

const filename = Deno.args[0];
const response = await loadResponse(filename);

const serializedData = serializeResponse(response);

const uploadWithRetry = async <T>(
  data: T,
  retryCount = 0,
  maxRetry = 60,
  lastError?: string,
): Promise<void> => {
  if (retryCount > maxRetry) throw new Error(lastError);
  try {
    await upload<T>(
      octokit,
      data,
      "WRITE_SHOPEE_TRENDS",
    );
  } catch (error) {
    await sleep(retryCount);
    await uploadWithRetry(data, retryCount + 1, error);
  }
};

await uploadWithRetry<ICreateTrend[]>(serializedData);

Deno.exit();
