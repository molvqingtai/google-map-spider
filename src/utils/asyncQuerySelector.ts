import asyncLoopTimer from './asyncLoopTimer'

export type Options = number | { timeout?: number; root?: Element }

function asyncQuerySelector<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  options?: Options
): Promise<HTMLElementTagNameMap[K] | null>
function asyncQuerySelector<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  options?: Options
): Promise<SVGElementTagNameMap[K] | null>
function asyncQuerySelector<K extends keyof MathMLElementTagNameMap>(
  selectors: K,
  options?: Options
): Promise<MathMLElementTagNameMap[K] | null>
function asyncQuerySelector<K extends keyof HTMLElementDeprecatedTagNameMap>(
  selectors: K,
  options?: Options
): Promise<HTMLElementDeprecatedTagNameMap[K] | null>
function asyncQuerySelector<E extends Element = Element>(selector: string, options?: Options): Promise<E | null>

async function asyncQuerySelector<E extends Element = Element>(selector: string, options?: Options): Promise<E | null> {
  if (typeof options === 'number') {
    return await asyncLoopTimer(() => document.querySelector<E>(selector), options)
  } else {
    return await asyncLoopTimer(() => (options?.root ?? document).querySelector<E>(selector), options?.timeout)
  }
}

export default asyncQuerySelector
