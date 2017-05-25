import * as React from "react";

export function NotFoundView() {
  const imgProps = {
    // className,
    src: require(`../../../resources/images/zalamany-zawodnik-fc-koeln.jpg`),
  };

  return (
    <div className="view view--not-found">
      <img {...imgProps} />
      <span className="not-found-header">404</span>
      <span className="not-found-text">Page not found. Try again in 4 years.</span>
    </div>
  );
}
