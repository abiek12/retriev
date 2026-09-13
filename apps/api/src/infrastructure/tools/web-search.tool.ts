import { tavily } from "@tavily/core";
import { ITool } from "./types/tool.interface";
import { env } from "../../config/env";

export class WebSearchTool implements ITool<{ query: string }, string> {
  readonly name: string = "webSearch";
  readonly description: string =
    "allows models to retrieve real-time information from the internet and supply answers with direct source citations.";
  private readonly tvly = tavily({ apiKey: env.tavilyApiKey });

  async execute(args: { query: string }): Promise<string> {
    const response = await this.tvly.search(args.query);

    return response.results.map((i) => i.content).join("\n\n");
  }
}
