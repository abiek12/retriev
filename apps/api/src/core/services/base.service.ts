import type { IBaseRepository } from "../repositories";

export interface IBaseService {}

export abstract class BaseService<TRepository extends IBaseRepository>
  implements IBaseService
{
  constructor(protected readonly repository: TRepository) {}
}
