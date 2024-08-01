import { UserIdentity } from "../types/common";

const getIdentity = () => {
  const identity = localStorage.getItem("userIdentity");
  if (!identity) return undefined;
  const deserializedObject = JSON.parse(identity);
  if (!deserializedObject) return undefined;
  const userIdentity = deserializedObject as UserIdentity;
  console.log(userIdentity);
  return userIdentity;
};

export const getAccessToken = () => {
  const userIdentity = getIdentity();
  if (!userIdentity) return undefined;
  return userIdentity.access_token;
};
