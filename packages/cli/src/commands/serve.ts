import { Command } from 'commander'

export const serveCommand = new Command()
  .command('serve')
  .description('Open file for editing')
  .action(() => console.log('Preparing file to serve'))