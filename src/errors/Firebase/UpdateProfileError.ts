export class FirebaseUpdateProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirebaseUpdateProfileError';
  }
}
