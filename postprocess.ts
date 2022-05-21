import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts'

interface trend {
  keyword: string;
  image: string;
  count: string;
  source: string;
}

const filename = Deno.args[0] // Same name as downloaded_filename
const data = await readJSON(filename)

if (data["error"] !== 0){
  console.log("Error", data["error"])
}

const section = data["data"]["sections"][0]
const products = section["data"]["top_product"]

const processedProducts = products.map(({name, images, count})=> {
  return {
    keyword: name,
    count,
    image: images[0],
    source: "SHOPEE"
  }
})

const newfile = `shopee_trends.json`
await writeJSON(newfile, processedProducts)
