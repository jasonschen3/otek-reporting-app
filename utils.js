export const formatMoney = (amount) => {
  if (!amount || isNaN(amount)) {
    return "";
  }

  const parts = Number(amount).toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Remove the trailing ".00" if the amount is an integer
  if (parts[1] === "00") {
    return `$${parts[0]}`;
  }

  return `$${parts.join(".")}`;
};

export const formatUrl = (url) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `http://${url}`;
  }
  return url;
};
