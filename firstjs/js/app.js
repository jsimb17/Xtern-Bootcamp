var listItem ={
 +  init: function() {
 +  document.querySelector('form').onsubmit = listItem.addToList;
 +},
 +  promo : function(ev) {
 +   //this.ev.preventDefault();
 +   debugger;
 +   this.parentNode.style.border= "solid blue" ;
 +
 + },
 +
 +  del : function(ev){
 +   //this.parentNode.ev.preventDefault();
 +   this.parentNode.remove();
 + },
 +
 + buildList : function(name) {
 + var listElement = document.createElement('dt');
 +var dd = document.createElement('dd');
 +dd.innerHTML =name;
 +listElement.appendChild(dd);
 +var delBtn = document.createElement('button');
 +
 +delBtn. onclick = this.del;
 +delBtn.style = "padding-left: 50px";
 +delBtn.innerHTML = 'Delete';
 +listElement.appendChild(delBtn);
 +
 +var promoBtn = document.createElement('button');
 +promoBtn.innerHTML = 'Promote </dd></dt>';
 +promoBtn.onclick = this.promo;
 +promoBtn.style = 'padding-left: 50px';
 +listElement.appendChild(promoBtn);
 +return listElement;
 +},
 +
 +
 + addToList : function(ev) {
 +  ev.preventDefault();
 +  debugger;
 + var nameList =  document.querySelector('#nameList');
 + /*if(!nameList.hasChildNodes){
 +  nameList.appendChild(listItem.buildList(this.name.value));
 +  }
 +  else{*/
 +    nameList.insertBefore(listItem.buildList(this.name.value),nameList.childNodes[0]);
 +    flag = 0;
 +
 +
 +},
 +
 +};
 +listItem.init();
