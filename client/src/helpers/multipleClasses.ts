export const multipleClasses = (...args: string[]) => {
  return args.filter(Boolean).join(' ');
};
