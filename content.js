console.log("work 2");

const addBorders = () => {
  const tokens = document.querySelectorAll("a");
  tokens.forEach((token) => {
    if (token.href.includes("assets/ethereum")) {
      console.log(token);
      token.style.border = "1px solid red";
    }
  });
};

setTimeout(() => addBorders(), 5000);
