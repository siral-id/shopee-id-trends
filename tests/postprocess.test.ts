import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";
import { assertInstanceOf } from "https://deno.land/std@0.142.0/testing/asserts.ts";

import { loadResponse, serializeResponse } from "../mod.ts";

Deno.test("Make sure loadResponse is correct", async () => {
  assertInstanceOf(await loadResponse("data.json"), Object);
});

Deno.test("Make sure serializeResponse is correct", async () => {
  const expect = chai.expect;

  const response = await loadResponse("data.json");

  expect(serializeResponse(response)[0]).to.have.property("keyword");
  expect(serializeResponse(response)[0]).to.have.property("count");
  expect(serializeResponse(response)[0]).to.have.property("image");
  expect(serializeResponse(response)[0]).to.have.property("source");
  expect(serializeResponse(response)[0]).to.have.property("timestamp");
});
