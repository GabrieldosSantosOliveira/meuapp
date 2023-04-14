export class ConflictCategoryAlreadyExists extends Error {
  constructor() {
    super('Conflict category already exists');
    this.name = 'ConflictCategoryAlreadyExists';
  }
}
