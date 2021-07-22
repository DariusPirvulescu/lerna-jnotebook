import { Command } from 'commander'
import path from 'path'
import {serve} from 'local-api'

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open file for editing')
  .option('-p, --port <number>', 'specify the port where to run the server', '4005')
  .action((filename='notebook.js', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), dir)
  })
