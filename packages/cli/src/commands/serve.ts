import { Command } from "commander";
import path from "path";
import { serve } from "local-api";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open file for editing")
  .option(
    "-p, --port <number>",
    "specify the port where to run the server",
    "4005"
  )
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
      console.log(
        `${filename} is served. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${options.port} already in use.\nTry running on a different port:\n> serve -p <port-number>`
        );
      } else {
        console.log("There was a problme running the command", err.message);
      }
      process.exit(1);
    }
  });
