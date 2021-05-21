export const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }

  const fireNotification = () => {
    if (!Notification.permission !== "granted") {
      console.log("No Permission");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Now Permission");
          let n = new Notification(title, options);
          console.log(n);
        } else {
          console.log("Never Permission");
          return;
        }
      });
    } else {
      console.log("already granted");
      new Notification(title, options);
    }
  };
  return fireNotification;
};
