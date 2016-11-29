
function f(id){
	return typeof id=="string" ?document.getElementById(id):id
}



window.onload=function(){
	var ChangeTitle=f('move-change-title').getElementsByTagName("a");
	var ChangeContent=f('move-change-content').getElementsByTagName("ul");
//	alert(ChangeTitle.length);
//	alert(ChangeContent.length);
	for (var i=0;i<ChangeTitle.length;i++) {
		ChangeTitle[i].id=i;  
		ChangeContent[i].id=i;
			ChangeTitle[i].onmouseenter=function(){
				for (var i=0;i<ChangeTitle.length;i++){
					ChangeTitle[i].className="";
					ChangeContent[i].style.display="none";
				}
			ChangeTitle[this.id].className="move-change-title-selected";
			ChangeContent[this.id].style.display="block";
		}
	}
}
