const setUpCopyright = () => {
  const copyright = document.getElementById("copyright");
  const startYear = 2008;
  const endYear = new Date().getFullYear();

  if (!copyright) {
    return;
  }
  const copyrightText = `&copy; ${startYear}${
    startYear !== endYear ? `-${endYear}` : ""
  } C.2.B project. All rights reserved.`;
  copyright.innerHTML = copyrightText;
};

document.addEventListener("DOMContentLoaded", () => {
  setUpCopyright();
});
