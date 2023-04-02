export class ConflictAuthorAlreadyExists extends Error {
  constructor() {
    super('Conflict author already exists');
    this.name = 'ConflictAuthorAlreadyExists';
  }
}
