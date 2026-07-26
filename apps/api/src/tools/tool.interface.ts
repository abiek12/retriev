export interface ITool<TArgs = unknown, TResult = unknown> {
  readonly name: string;
  readonly description: string;

  execute(args: TArgs): Promise<TResult>;
}
