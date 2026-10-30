const P = {
  home: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  plug: "M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5",
  back: "M15 18l-6-6 6-6",
  check: "M5 12l5 5 9-10",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6z",
  clock: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 5v5l3 3",
  wallet: "M21 18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM3 10h18",
  down: "M6 9l6 6 6-6"
};

export default function Icon({ n, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[n]} />
    </svg>
  );
}