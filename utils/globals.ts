export const makeRandomID = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  let id = "";
  let i = 0;
  for (i; i < length; i += 1) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return id;
};

export const encoded = (value: string) => {
  return Buffer.from(value).toString("base64");
};

export const decoded = (value: string) => {
  return Buffer.from(value, "base64").toString();
};
