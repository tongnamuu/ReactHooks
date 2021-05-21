const useConfirm = (message = "", callback, cancel) => {
  if (typeof callback !== "function") {
    return;
  }
  if (typeof cancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      callback();
    } else {
      cancel();
    }
  };
  return confirmAction;
};

export default useConfirm;
