import { Command } from 'commander'
import { serve } from '../../../local-api/src/index'

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open file for editing')
  .option('-p, --port <number>', 'specify the port where to run the server', '4005')
  .action((filename='notebook.js', options: { port: string }) => {
    console.log(filename, options)
    serve(parseInt(options.port), filename, '/')
  })
