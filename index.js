let currDrag = "";
const elem = {};
fetch("datafile.json")
.then(response => response.json())
.then(data => {
	elem['wrapper'] = document.getElementById("wrapper");
	
	addDiv('topBand', 'wrapper', 'id', elem);
	addDiv('bottomBand', 'wrapper', 'id', elem);
	addDiv('pageTitle1', 'topBand', 'id', elem);
    addDiv('pageTitle2', 'topBand', 'id', elem);
    addDiv('greyLine', 'topBand', 'id', elem);
	addDiv('pageFrame','bottomBand','id',elem);
    addDiv('titleDiv','pageFrame','id',elem);
    addDiv('blueLine','pageFrame','id',elem);
    addDiv('state1','pageFrame','id',elem);
    addDiv('state2','pageFrame','id',elem);
    addDiv('bgImage','pageFrame','id',elem);

    elem['pageTitle1'].innerHTML=data.title1;
    elem['pageTitle2'].innerHTML=data.title2;
    elem['titleDiv'].innerHTML=data.state0;
    elem['state1'].innerHTML=data.state1;
    elem['state2'].innerHTML=data.state2;
    for(let i=0;i<6;i++){
        addDiv('txt_'+i+'_parent','bgImage','id',elem);
        elem['txt_'+i+'_parent'].className='txt_'+i+'_parent';
        elem['txt_'+i+'_parent'].innerHTML=data.data[i].srno;

        addDiv('txt_'+i+'_parent1','bgImage','id',elem);
        elem['txt_'+i+'_parent1'].className='txt_'+i+'_parent1';
        elem['txt_'+i+'_parent1'].innerHTML=data.data[i].Que;

        addDiv('drag_'+i, 'pageFrame', 'id', elem);
        elem['drag_'+i].innerHTML=data.data[i].ran;
        addDiv('dropItem_'+i, 'pageFrame', 'id', elem);
        elem['drag_'+i].className='dragCls'+i;
        elem['dropItem_'+i].className='dropCls'+i;
    }
    for(let i=0;i<6;i++){
        elem['drag_'+i].style.left = data.dragPos[i].left;
		elem['drag_'+i].style.top = data.dragPos[i].top;
        elem['dropItem_'+i].style.left = data.dropPos[i].left;
		elem['dropItem_'+i].style.top = data.dropPos[i].top;

        elem['drag_'+i].setAttribute("ref", "");
        elem['dropItem_'+i].setAttribute("isDropped", false);
        document.addEventListener('mousedown',onMouseDown);
    }

    addDiv('buttonsContainer','pageFrame','id',elem);
    elem['buttonsContainer'].className='buttonsContainer';
    addDiv('submit','buttonsContainer','id',elem);
    elem['submit'].className='submit';
    addDiv('reset','buttonsContainer','id',elem);
    elem['reset'].className='reset';
    addDiv('showme','buttonsContainer','id',elem);
    elem['showme'].className='showme';
})
function onMouseDown(e){
	currDrag = e.target;
    console.log(currDrag);
	// const dropref = currDrag.getAttribute("ref");
	// if(dropref){
	// 	document.getElementById(ref).setAttribute("isDropped", false);
	// } 
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}
function onMouseMove(e)
{
	currDrag.style.left = (e.pageX - document.getElementById("pageFrame").offsetLeft - currDrag.getBoundingClientRect().width / 2) + "px";
	currDrag.style.top = (e.pageY - document.getElementById("pageFrame").offsetTop - currDrag.getBoundingClientRect().height / 2) + "px";
}

function onMouseUp(e)
{
	var _left = e.pageX;
	var _top = e.pageY;
	for(var i=0; i<6; i++){
	console.log(_top, elem['dropItem_'+i].getBoundingClientRect().top - document.getElementById("pageFrame").offsetTop);
		if(_top > elem['dropItem_'+i].getBoundingClientRect().top && _top < (elem['dropItem_'+i].getBoundingClientRect().top + elem['dropItem_'+i].getBoundingClientRect().height)){
			if(elem['dropItem_'+i].getAttribute('isDropped') === 'false'){				
				currDrag.setAttribute('ref', elem['dropItem_'+i].id);
				elem['dropItem_'+i].setAttribute('isDropped', true);
			}
			console.log(i);
			break;
		}
	}
	currDrag = "";
	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', onMouseUp);
}
function addDiv(id, _parent, typeofDiv, elem){
	elem[id] = document.createElement('div');
	if(typeofDiv === 'class'){
		elem[id].attr('class', id);
	}
	else
	{
		elem[id].id = id;
	}	
	elem[_parent].appendChild(elem[id]);
}
	