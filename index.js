import { foods } from "./data/exampleData";
import { user } from "./data/userData";

import Fuse from "Fuse.js";
//ARAMA YAPMAK İÇİN HAZIR BİR KÜTÜPHANE KULLANILDI
const fuse = new Fuse(foods, {
  keys: ["title"],
});
//GEREKLİ ELEMENTLER BULUNDU
document.getElementById("sayHello").innerText = `Merhaba ${user[0].name}`;
var listItem = document.getElementById("listItem");
var liItem = document.getElementsByTagName("li");
var input = document.getElementById("search");
var favoriList = document.getElementById("favoriList");
//SAYFA AÇILDIĞINDA LOCALSTROGEDAN FAVORİ YEMEKLER GETİRİLDİ
for (var a in localStorage) {
  if (
    a != "length" &&
    a != "clear" &&
    a != "getItem" &&
    a != "key" &&
    a != "removeItem" &&
    a != "setItem"
  ) {
    var y = document.createElement("li");
    y.innerText = a;
    favoriList.appendChild(y);
  }
}
//BAZI ELEMENLERE EVENTLİSTENER METHODU EKLENDİ
input.addEventListener("input", Search);
liItem.addEventListener("click", liClick);
//ARAMA KISMINDA YAPILACAK İŞLEMLER
function Search() {
  var result = fuse.search(input.value);
  console.log(result);

  listItem.innerHTML = "";

  for (let i = 0; i < result.length; i++) {
    var x = document.createElement("li");
    x.className = "list-group-item mt-4";
    x.setAttribute("style", " text-align: center");
    x.setAttribute("id", i);
    x.innerText = result[i].item.title;
    listItem.appendChild(x);
  }

  for (let index = 0; index < liItem.length; index++) {
    liItem[index].addEventListener(
      "click",
      addLocalStroge,

      false
    );
  }
}
//LOCAL STORAGE EKLEME BÖLÜMÜ
function addLocalStroge(e) {
  //localStorage.clear();
  localStorage.setItem(e.target.innerText, e.target.innerText);
  e.target.className = "list-group-item mt-4 active";

  favoriList.innerHTML = "";
  for (var a in localStorage) {
    if (
      a != "length" &&
      a != "clear" &&
      a != "getItem" &&
      a != "key" &&
      a != "removeItem" &&
      a != "setItem"
    ) {
      var y = document.createElement("li");
      y.innerText = a;
      favoriList.appendChild(y);
    }
  }
}
