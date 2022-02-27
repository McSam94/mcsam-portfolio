import * as React from "react";

const useWindowEffect = (fn: () => void, deps: Array<any>) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMounted) fn?.();
  }, [deps]);
};

export default useWindowEffect;
