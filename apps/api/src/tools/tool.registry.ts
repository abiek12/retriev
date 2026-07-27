import { ITool } from "./tool.interface";

class ToolRegistry {
  private readonly tools = new Map<string, ITool>();

  register(tool: ITool): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool '${tool.name}' already registered.`);
    }
    this.tools.set(tool.name, tool);
  }

  get(name: string): ITool {
    const tool = this.tools.get(name);

    if (!tool) {
      throw new Error(`Tool '${name}' not found.`);
    }

    return tool;
  }

  getAll(): ITool[] {
    return [...this.tools.values()];
  }
}

export default ToolRegistry;
