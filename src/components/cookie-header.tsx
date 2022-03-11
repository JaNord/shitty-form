import { useState } from "react";

export const CookieHeader = () => {
  const [count, setCount] = useState<number>(1);
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <div
      className={`alert  w-auto m-2 transition-all z-10 ${hidden ? "hidden" : ""} `}
      style={{ minHeight: `${count * 5}rem` }}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-error flex-shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>We use cookies for no reason.</span>
      </div>
      <div className="flex-none h-full">
        <button className="btn btn-sm btn-ghost h-full" onClick={() => setCount(count + 5)}>
          Deny Coksies
        </button>
        <button
          className="btn btn-sm btn-primary h-full"
          onClick={() => {
            if (count == 1) {
              setTimeout(() => setHidden(false), 40 * 1000);
              setHidden(true);
            } else {
              setCount(count > 1 ? count - 1 : 1);
            }
          }}
        >
          Accept Conkies
        </button>
      </div>
    </div>
  );
};
