export interface Source {
  build(): Promise<Map<string, object>>;
}
