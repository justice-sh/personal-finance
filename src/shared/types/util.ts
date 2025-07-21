export type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${Path<T[K]>}` | K : K) : never
    }[keyof T]
  : never

export type ValueOfPath<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer Head}.${infer Tail}`
    ? Head extends keyof T
      ? T[Head] extends object
        ? ValueOfPath<T[Head], Tail>
        : never
      : never
    : never

export type ExactPathForValue<T, V> = {
  [K in Path<T>]: [V] extends [ValueOfPath<T, K>] ? ([ValueOfPath<T, K>] extends [V] ? K : never) : never
}[Path<T>]
