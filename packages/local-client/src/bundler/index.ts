import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../bundler/plugins/unpkg-path-plugin';
import { fetchPlugin } from '../bundler/plugins/fetch-plugin';

let service: esbuild.Service;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });
    
    return {
      code: result.outputFiles[0].text,
      err: ''
    }
  } catch (error) {
    return {
      code: '',
      err: error.message
    }
  }

};