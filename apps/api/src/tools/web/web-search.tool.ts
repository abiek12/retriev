import { tavily } from "@tavily/core";
import { ITool } from "../tool.interface";
import { env } from "../../config/env";

class WebSearchTool implements ITool<{ query: string }, string> {
  readonly name: string = "webSearch";
  readonly description: string =
    "allows models to retrieve real-time information from the internet and supply answers with direct source citations.";
  private readonly tvly = tavily({ apiKey: env.tavilyApiKey });

  async execute(args: { query: string }): Promise<string> {
    console.log("Web search called!");

    const response = await this.tvly.search(args.query);

    return response.results.map((i) => i.content).join("\n\n");
  }
}

export default WebSearchTool;
