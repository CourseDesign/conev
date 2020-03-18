export default interface Source {
  build(): Promise<Map<string, object>>;
}
