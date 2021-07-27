import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from 'path'
import { createCellsRouter } from "./Routes/cells";


export const serve = (port: number, filename: string, dir: string, isProxy: boolean) => {
  const app = express();
  const packagePath = require.resolve('local-client/build/index.html')

  if (isProxy) {
    app.use(createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      logLevel: 'silent'
    }))
  } else {
    app.use(express.static(path.dirname(packagePath)))
  }

  app.use(createCellsRouter(filename, dir))

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
};
