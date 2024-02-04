import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

cookies.set("myCat", "Pacman");
console.log(cookies.get("myCat")); // Pacman

console.log("1");
