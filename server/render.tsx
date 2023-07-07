import React from "react"
import { renderToPipeableStream } from "react-dom/server"
import App from "../src/components/App"

export const render = (response) => {
  const stream = renderToPipeableStream(<App />, {
    bootstrapScripts: ["/index.js"],
    onShellReady() {
      response.setHeader("content-type", "text/html")
      stream.pipe(response)
    },
  })
}
