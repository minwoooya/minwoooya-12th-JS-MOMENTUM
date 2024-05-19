document.title="hello from JS";

const title=document.getElementById("title");
console.dir(title.textContent);

title.innerText="like its magnetic"
console.log(title.textContent);

function handleTitleClick(){
    console.log("you clicked");
    alert("haha!!");
}
title.addEventListener("click",handleTitleClick);

const object = { a: 1, b: 2 };
const { a,b } = object;
console.log(b); // 1