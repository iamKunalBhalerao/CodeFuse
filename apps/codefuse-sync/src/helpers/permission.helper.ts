export const canEdit = (role: "OWNER" | "EDITOR") => {
  return role === "OWNER" || role === "EDITOR";
};
