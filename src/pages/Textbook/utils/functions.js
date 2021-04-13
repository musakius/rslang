export const isAuth = () => {
  if (!localStorage.getItem("user")) return false;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.token) {
    return !!user.token;
  }
};

export const setLS = (mode, group, dictionarySection) => {
  if (mode === "textbook") {
    localStorage.setItem("textbookGroup", group);
  } else {
    localStorage.setItem("dictionaryGroup", group);
    localStorage.setItem("queryFilter", dictionarySection);
  }
};

export const getCurrentPage = (mode) => {
  const page =
    mode === "textbook"
      ? localStorage.getItem("textbookPage") || 1
      : localStorage.getItem("dictionaryPage") || 1;
  return +page;
};

export const setBtnDisabled = (id, disabled) => {
  if (!document.getElementById(`difficultyBtn${id}`)) return;
  const difficultyBtn = document.getElementById(`difficultyBtn${id}`);
  difficultyBtn.disabled = disabled;
};

export const show = () => {
  document.getElementById("modalBox").style.display = "block";
  document.getElementById("modalBox").classList.add("show");
};
