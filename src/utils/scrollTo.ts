function scrollTo(selector: string) {
  const element = document.querySelector(selector);
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

export default scrollTo;
