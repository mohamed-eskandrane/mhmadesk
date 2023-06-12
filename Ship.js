const sheetId = '1HVrx52ZVDQdN8c93XVvGSaVEcvGq412TNBpQEjq4wuM';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName1 = 'International';
const sheetName2 = 'Local';
let query = encodeURIComponent('Select *');
let url = `${base}&sheet=${sheetName1}&tq=${query}`;
let url2 = `${base}&sheet=${sheetName2}&tq=${query}`;
let data = [];
let data2 = [];
document.addEventListener('DOMContentLoaded', init)
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                }
            })
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            Loadinput();
        })


        fetch(url2)
        .then(res => res.text())
        .then(rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz2 = [];
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column2 = heading.label;
                    colz2.push(column2);
                }
            })
            jsonData.table.rows.forEach((rowData) => {
                const row2 = {};
                colz2.forEach((ele, ind) => {
                    row2[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data2.push(row2);
            })
            Loadinput2();
        })
        ActiveTwo();
        Activeone();
    }
function Loadinput(){
let myDropdown= document.getElementById("myDropdown");
let myDropdown2= document.getElementById("myDropdown2");
let A_myDropdown
let A_myDropdown2
for (let index = 1; index < data.length; index++) {
  A_myDropdown=document.createElement("a");
  A_myDropdown.id="my_" + index;
  A_myDropdown.textContent=data[index].Name;
  A_myDropdown.href='#'+ data[index].Name;
  A_myDropdown.onclick=function(){MoveName1(this)} ;
  myDropdown.appendChild(A_myDropdown);
  A_myDropdown2=document.createElement("a");
  A_myDropdown2.id="my_" + data[index].Code;
  A_myDropdown2.textContent=data[index].Name;
  A_myDropdown2.href='#'+ data[index].Name;
  A_myDropdown2.onclick=function(){MoveName2(this)} ;
  myDropdown2.appendChild(A_myDropdown2);
}
}
function MoveName1(XXX){
  let myInput=document.getElementById("myInput")
  myInput.value=XXX.textContent;
    let zz=[];
     zz=String(XXX.id).split('_');
    document.getElementById("IndmyInput1").textContent=  Number(zz[1]) ;
    myInput.style.borderColor= "#ccc" ;
    myInput.style.borderWidth="1px";
    FoucusOutInput1();
}
function FoucusInput1() {
  document.getElementById("myDropdown").className="dropdown-content";
  document.getElementById("myDropdown").style.top=document.getElementById("myInput").offsetTop + 40
  FoucusOutInput2()
}
function FoucusOutInput1() {
    document.getElementById("myDropdown").className="Unshow";
}
function filterFunction1() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
function MoveName2(XXX){
  let myInput2=document.getElementById("myInput2")
  myInput2.value=XXX.textContent;
    let zz=[];
     zz=String(XXX.id).split('_');
    document.getElementById("IndmyInput2").textContent=  zz[1] ;
    myInput2.style.borderColor= "#ccc" ;
    myInput2.style.borderWidth="1px";
    FoucusOutInput2();
}
function FoucusInput2() {
  document.getElementById("myDropdown2").className="dropdown-content";
  document.getElementById("myDropdown2").style.top=document.getElementById("myInput2").offsetTop + 40
  FoucusOutInput1()
}
function FoucusOutInput2() {
    document.getElementById("myDropdown2").className="Unshow";
}
function filterFunction2() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown2");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
function FoucusOutInput00() {
    document.getElementById("myDropdown").className="Unshow";
    document.getElementById("myDropdown2").className="Unshow";
}
function Getprice1(){
  let IndmyInput2=document.getElementById("IndmyInput2");
  let myInput2=document.getElementById("myInput2");
  let IndmyInput1=document.getElementById("IndmyInput1");
  let myInput=document.getElementById("myInput");
  let SelectUnit=document.getElementById("SelectUnit");
  if (IndmyInput1.textContent =="" || myInput.value==""){
    myInput.style.borderColor="red";
    myInput.style.borderWidth="2px";
    IndmyInput1.textContent =""
    return}
  if (IndmyInput2.textContent=="" || myInput2.value==""){
    myInput2.style.borderColor="red";
    myInput2.style.borderWidth="2px";
    IndmyInput2.textContent=""
    return}
  let XX=String(IndmyInput2.textContent)
  let Zz=Number(IndmyInput1.textContent)
  let weight=document.getElementById("weight").value
  if (SelectUnit.value=="LB"){
      document.getElementById("Result1").value=Math.round(data[Zz][XX] * 0.45359237 * weight);
    }else{
      document.getElementById("Result1").value=Math.round(data[Zz][XX] * weight);
    }
  document.getElementById("DivResult1").className="form-group col-md-4";

}
function Loadinput2(){
let myDropdown3= document.getElementById("myDropdown3");
let myDropdown4= document.getElementById("myDropdown4");
let A_myDropdown3
let A_myDropdown4
for (let index = 1; index < data2.length; index++) {
  A_myDropdown3=document.createElement("a");
  A_myDropdown3.id="my_" + index;
  A_myDropdown3.textContent=data2[index].Name;
  A_myDropdown3.href='#'+ data2[index].Name;
  A_myDropdown3.onclick=function(){MoveName3(this)} ;
  myDropdown3.appendChild(A_myDropdown3);
  A_myDropdown4=document.createElement("a");
  A_myDropdown4.id="my_" + data2[index].Code;
  A_myDropdown4.textContent=data2[index].Name;
  A_myDropdown4.href='#'+ data2[index].Name;
  A_myDropdown4.onclick=function(){MoveName4(this)} ;
  myDropdown4.appendChild(A_myDropdown4);
}
}
function MoveName3(XXX){
  let myInput3=document.getElementById("myInput3");
  myInput3.value=XXX.textContent;
    let zz=[];
     zz=String(XXX.id).split('_');
    document.getElementById("IndmyInput3").textContent=  Number(zz[1]) ;
    myInput3.style.borderColor= "#ccc" ;
    myInput3.style.borderWidth="1px";
    FoucusOutInput3();
}
function FoucusInput3() {
  document.getElementById("myDropdown3").className="dropdown-content";
  document.getElementById("myDropdown3").style.top=document.getElementById("myInput3").offsetTop + 40
  FoucusOutInput4()
}
function FoucusOutInput3() {
    document.getElementById("myDropdown3").className="Unshow";
}
function filterFunction3() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput3");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown3");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
function MoveName4(XXX){
  let myInput4=document.getElementById("myInput4")
  myInput4.value=XXX.textContent;
    let zz=[];
     zz=String(XXX.id).split('_');
    document.getElementById("IndmyInput4").textContent=  zz[1] ;
    myInput4.style.borderColor= "#ccc" ;
    myInput4.style.borderWidth="1px";
    FoucusOutInput4();
}
function FoucusInput4() {
  document.getElementById("myDropdown4").className="dropdown-content";
  document.getElementById("myDropdown4").style.top=document.getElementById("myInput4").offsetTop + 40
  FoucusOutInput3()
}
function FoucusOutInput4() {
    document.getElementById("myDropdown4").className="Unshow";
}
function filterFunction4() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput4");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown4");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
function FoucusOutInput02() {
    document.getElementById("myDropdown3").className="Unshow";
    document.getElementById("myDropdown4").className="Unshow";
}
function FoucusOutInput33() {
    document.getElementById("myDropdown").className="Unshow";
    document.getElementById("myDropdown2").className="Unshow";
    document.getElementById("myDropdown3").className="Unshow";
    document.getElementById("myDropdown4").className="Unshow";
}
function Getprice2(){
  let IndmyInput3=document.getElementById("IndmyInput3");
  let myInput3=document.getElementById("myInput3");
  let IndmyInput4=document.getElementById("IndmyInput4");
  let myInput4=document.getElementById("myInput4");
  let SelectUnit2=document.getElementById("SelectUnit2");
  if (IndmyInput3.textContent =="" || myInput3.value==""){
    myInput3.style.borderColor="red";
    myInput3.style.borderWidth="2px";
    IndmyInput3.textContent =""
    return}
  if (IndmyInput4.textContent=="" || myInput4.value==""){
    myInput4.style.borderColor="red";
    myInput4.style.borderWidth="2px";
    IndmyInput4.textContent=""
    return}
  let XX=String(IndmyInput4.textContent)
  let Zz=Number(IndmyInput3.textContent)
  let weight2=document.getElementById("weight2").value
    if (SelectUnit2.value=="LB"){
      document.getElementById("Result2").value=Math.round(data2[Zz][XX] * 0.45359237 * weight2);
    }else{
      document.getElementById("Result2").value=Math.round(data2[Zz][XX] * weight2);
    }
  document.getElementById("DivResult2").className="form-group col-md-4";

}
function Activeone(){
    document.getElementById("exp").style.display="flex"
    document.getElementById("dom").style.display="none"
    document.getElementById("Activeone").style.color="#ffffff"
    document.getElementById("Activeone").style.backgroundColor="#DC291E"
    document.getElementById("Activeone").style.borderRadius=" 22.5px"
    document.getElementById("ActiveTwoP").style.color="#DC291E"
    document.getElementById("ActiveTwo").style.backgroundColor="#ffffff"
    document.getElementById("ActiveTwo2").style.display="none"
    document.getElementById("ActiveTwo1").style.display="block"
    document.getElementById("ActiveoneP").style.color="#ffffff"
    document.getElementById("Activeone1").style.display="none"
    document.getElementById("Activeone2").style.display="block"

}
function ActiveTwo(){
  document.getElementById("exp").style.display="none"
  document.getElementById("dom").style.display="flex"
  document.getElementById("ActiveTwo").style.color="#ffffff"
  document.getElementById("ActiveTwo").style.backgroundColor="#DC291E"
  document.getElementById("ActiveTwo").style.borderRadius=" 22.5px"
  document.getElementById("ActiveoneP").style.color="#DC291E"
  document.getElementById("Activeone").style.backgroundColor="#ffffff"
  document.getElementById("Activeone2").style.display="none"
  document.getElementById("Activeone1").style.display="block"
  document.getElementById("ActiveTwoP").style.color="#ffffff"
  document.getElementById("ActiveTwo1").style.display="none"
  document.getElementById("ActiveTwo2").style.display="block"
  
}
