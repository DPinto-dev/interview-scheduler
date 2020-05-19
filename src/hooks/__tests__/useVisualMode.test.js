import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

//Refactored the tests from Compass to maintain syntax consistency and group related tests in a describe block
describe("useVisualMode", () => {
  it("useVisualMode should initialize with default value", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    expect(result.current.mode).toBe(FIRST);
  });

  it("useVisualMode should transition to another mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  });

  it("useVisualMode should return to previous mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);

    act(() => result.current.transition(THIRD));
    expect(result.current.mode).toBe(THIRD);

    act(() => result.current.back());
    expect(result.current.mode).toBe(SECOND);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });

  it("useVisualMode should not return to previous mode if already at initial", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });

  it("useVisualMode should replace the current mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));

    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);

    act(() => result.current.transition(THIRD, true));
    expect(result.current.mode).toBe(THIRD);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });
});
