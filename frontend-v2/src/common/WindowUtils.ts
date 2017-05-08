// FIXME: Both should scroll at the same speed

export const scrollToTop = () => {
  const top = window.pageYOffset - document.documentElement.clientTop;

  if (top > 0) {
    window.scrollTo(0, top - 500);
    setTimeout(scrollToTop, 10);
  }
};

export const scrollToBottom = () => {
  const bottom = window.pageYOffset + window.innerHeight;

  if (bottom < document.body.scrollHeight) {
    window.scrollTo(0, bottom + 500);
    setTimeout(scrollToBottom, 10);
  }
};
