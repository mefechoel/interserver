/**
 * The callback handler, that will be called when the `isIntersecting` state changes.
 */
export type InterserverOnChange = (isIntersecting: boolean) => void;

/**
 * The observer options,
 * consisting of offset margins for the container (`top`, `right`, `bottom`, `left`)
 * and `once`.
 * With `once` set to `true`, observing stops after the element is first intersecting.
 */
export interface InterserverOptions {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  once?: boolean;
}

/**
 * The `unsubscribe` function returned from a call to `interserver`.
 * It should be called, when the observation is not needed any more,
 * to prevent memory leaks.
 * If `InterserverOptions.once` is set to true, the `unsubscribe`
 * function will be called internally.
 */
export type InterserverUnsubscribe = () => void;

export type Interserver = (
  container: Element,
  onChange: InterserverOnChange,
  options?: InterserverOptions,
) => InterserverUnsubscribe;

/**
 * Observe an element and invoke a callback, when it is intersecting the viewport.
 *
 * @param container The DOM element that is being observed.
 * @param onChange The callback handler,
 * that will be called when the `isIntersecting` state changes.
 * @param options The observer options,
 * consisting of offset margins for the container (`top`, `right`, `bottom`, `left`)
 * and `once`. With `once` set to `true`,
 * observing stops after the element is first intersecting.
 *
 * @returns The `unobserve` function. Observation is canceled, when it is called.
 */
function interserver(
  container: Element,
  onChange: InterserverOnChange,
  options?: InterserverOptions,
): InterserverUnsubscribe {
  const { top = 0, right = 0, bottom = 0, left = 0, once = false } =
    options || {};
  let isIntersecting: boolean | null = null;

  // Use native `IntersectionObserver` if supported
  if (typeof IntersectionObserver !== "undefined") {
    const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;
    const cb: IntersectionObserverCallback = (entries, observer) => {
      [{ isIntersecting }] = entries;
      if (isIntersecting && once) {
        observer.unobserve(container);
      }
      onChange(isIntersecting);
    };
    const observer = new IntersectionObserver(cb, { rootMargin });
    observer.observe(container);
    // Return unobserve function
    return () => observer.unobserve(container);
  }

  // Fallback to scroll events if `IntersectionObserver` is not supported
  function handleScroll() {
    const clientRect = container.getBoundingClientRect();
    const intersecting =
      clientRect.bottom + bottom > 0 &&
      clientRect.right + right > 0 &&
      clientRect.top - top < window.innerHeight &&
      clientRect.left - left < window.innerWidth;
    if (intersecting && once) {
      window.removeEventListener("scroll", handleScroll);
    }
    if (intersecting !== isIntersecting) {
      isIntersecting = intersecting;
      onChange(isIntersecting);
    }
  }
  window.addEventListener("scroll", handleScroll);
  // Return unobserve function
  return () => window.removeEventListener("scroll", handleScroll);
}

export default interserver as Interserver;
