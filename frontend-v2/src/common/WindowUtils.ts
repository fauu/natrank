export const scrollToTop = () => {
  const top = window.pageYOffset - document.documentElement.clientTop;

  if (top > 0) {
    window.scrollTo(0, top - 500);
    setTimeout(scrollToTop, 10);
  }
};

export const scrollToBottom = () => {
  const bottom = window.pageYOffset + window.innerHeight;

  if (bottom < getDocumentSize()) {
    window.scrollTo(0, bottom + 500);
    setTimeout(scrollToBottom, 10);
  }
};

const getDocumentSize = () => {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );
};
