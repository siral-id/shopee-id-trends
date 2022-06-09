import {
  loadResponse,
  serializeResponse,
  setupOctokit,
  upload,
} from "./mod.ts";

const ghToken = Deno.env.get("GH_TOKEN");
const octokit = setupOctokit(ghToken);

const filename = Deno.args[0];
const response = await loadResponse(filename);

const serializedData = serializeResponse(response);

await upload(octokit, serializedData);

Deno.exit();
