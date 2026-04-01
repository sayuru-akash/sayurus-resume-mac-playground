import { useState, useEffect } from "react";
import { FaApple } from "react-icons/fa";
import { useInterval } from "~/hooks";

interface BootProps {
  restart: boolean;
  sleep: boolean;
  setBooting: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const loadingInterval = 1;
const bootingInterval = 500;

export default function Boot({ restart, sleep, setBooting }: BootProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    if (restart && !sleep) setLoading(true);
  }, [restart, sleep]);

  useInterval(
    () => {
      const newPercent = percent + 0.15;
      if (newPercent >= 100) {
        setTimeout(() => {
          setBooting(false);
          setLoading(false);
        }, bootingInterval);
      } else setPercent(newPercent);
    },
    loading ? loadingInterval : null
  );

  const handleClick = () => {
    if (sleep) setBooting(false);
    else if (restart || loading) return;
    else setLoading(true);
  };

  return (
    <div
      className="w-full h-full bg-black flex-center flex-col"
      onClick={handleClick}
    >
      <FaApple className="text-white -mt-4 w-20 h-20 sm:w-24 sm:h-24" />
      {loading && (
        <div className="absolute top-1/2 left-0 right-0 w-56 h-1 mt-16 mx-auto overflow-hidden rounded bg-gray-500 sm:h-1.5 sm:mt-24">
          <span
            className="absolute top-0 bg-white h-full rounded-sm"
            style={{
              width: `${percent.toString()}%`
            }}
          />
        </div>
      )}
      {!restart && !loading && (
        <div className="absolute top-1/2 left-0 right-0 mt-16 mx-auto text-center text-sm text-gray-200 sm:mt-20">
          Click to {sleep ? "wake up" : "boot"}
        </div>
      )}
    </div>
  );
}
