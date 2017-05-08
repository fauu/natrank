export const urlfriendlifyString = (s: string) => (
  s.replace(/[^a-z0-9]/gi, "-").toLowerCase()
);
