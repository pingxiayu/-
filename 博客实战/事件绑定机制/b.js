/*window.onload=function(){
	alert('1');
}
window.onload=function(){
	alert('2');
}
window.onload=function(){
	alert('3');
}*/

/*EventUtil.addHander(window,'load',function(){
	alert('1');
});
EventUtil.addHander(window,'load',function(){
	alert('2');
});
EventUtil.addHander(window,'load',function(){
	alert('3');
});*/

window.onload=function(){
	var button=document.getElementById('button');
	EventUtil.addHander(button,'click',fn);
	//EventUtil.removeHander(button,'click',fn);

}
function fn(e){
	//alert('1');
	alert(e.clientX);
	//alert(this.value);
}
