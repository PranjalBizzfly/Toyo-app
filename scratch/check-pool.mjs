const POOL = 8;
function poolImage(slug) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `/images/pool/p${h % POOL}.webp`;
}

const solutions = [
  'streamline-daily-business-operations',
  'manage-your-people-from-hire-to-growth',
  'prepare-for-launch-and-fundraising'
];

for (const s of solutions) {
  console.log(`Solution '${s}' -> pool image: ${poolImage(s)}`);
}
