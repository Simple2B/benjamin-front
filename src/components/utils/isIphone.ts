export const isIOS = () => {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};

export const isSafary = () => {
  return isIOS() && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};
