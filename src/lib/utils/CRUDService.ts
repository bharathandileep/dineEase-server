import mongoose, { Model, Document, FilterQuery } from "mongoose";

interface CRUDOptions {
  populate?: string | string[];
  lean?: boolean;
}

export class CRUDService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return await document.save();
  }

  async findById(id: string, options: CRUDOptions = {}): Promise<T | null> {
    const query = this.model.findById(id);
    if (options.populate) query.populate(options.populate);
    if (options.lean) query.lean();
    return await query.exec();
  }
  async find(filter: Partial<T> = {}, options: CRUDOptions = {}): Promise<T[]> {
    const query = this.model.find(filter as FilterQuery<T>);
    if (options.populate) query.populate(options.populate);
    if (options.lean) query.lean();
    return await query.exec();
  }

  async updateById(
    id: string,
    data: Partial<T>,
    options: { new?: boolean } = { new: true }
  ): Promise<T | null> {
    return await this.model
      .findByIdAndUpdate(id, data, {
        new: options.new,
        runValidators: true,
      })
      .exec();
  }

  async deleteById(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
  async count(filter: Partial<T> = {}): Promise<number> {
    return await this.model.countDocuments(filter as FilterQuery<T>).exec();
  }
}
