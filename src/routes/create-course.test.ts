import { test, expect } from "vitest"

function soma(a: number, b: number) {
  return a + b
}

test("somar 2 valores", () => {
  const sum = soma(1, 2)

  expect(sum).toEqual(3)
})
