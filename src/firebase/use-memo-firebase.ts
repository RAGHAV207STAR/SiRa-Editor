
'use client';

import { useMemo, type DependencyList } from 'react';

export function useMemoFirebase<T>(
    factory: () => T | null,
    deps: DependencyList
  ): (T & { __memo: true }) | null {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoized = useMemo(factory, deps);
  
    if (!memoized) {
      return null;
    }
  
    // Add a non-enumerable property to the object to mark it as memoized.
    if (typeof memoized === 'object' && memoized !== null && !('__memo' in memoized)) {
      Object.defineProperty(memoized, "__memo", {
          value: true,
          writable: false,
          enumerable: false,
          configurable: false,
      });
    }
  
    return memoized as T & { __memo: true };
  }
  