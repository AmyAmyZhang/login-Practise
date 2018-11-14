document.addEventListener('DOMContentLoaded', start);
var number = 0;
function start() {
	var name = localStorage["userName"];
	console.log(name);
	document.getElementById("get_name_info").innerHTML = name;
	//get the full 20 images from the data .js file
	var mainPart = document.getElementById("main_part");
	var result = results_1.results;
	getFullImages(result, mainPart);
	
	//image-lists
	var movie_list = document.getElementsByClassName("image_list"); 
	// console.log(movie_list);
	
	//image-div lists
	var div_list = document.getElementsByClassName("whole_image");
	//image-liked-list
	var list = document.getElementById("liked_list");
	var drag_list = document.getElementById("second_part_drag_table");
	//add click event to every image div
	clickImage(div_list,list,movie_list);
	
	//open like-list
	document.getElementById("like_icon").onclick = openLikeLists;
	//get drag lists & open this page
	document.getElementById("second_part_lists_icon").onclick = openDragLists;
	document.getElementById("close").onclick = returnToParentPage;	
}


	//display the full images info from the data file
	function getFullImages(result, mainPart) {
		for (var i = 0; i < result.length; i++) {
			// first create div and then create img and title etc 
			var div = document.createElement("div");
			div.setAttribute("class", "whole_image");
			var image = document.createElement("img");
			image.className = "image_list";
			image.src = "https://image.tmdb.org/t/p/w500"+result[i].poster_path;
			image.width = "235";
			image.height = "235";
			image.style.padding = "20px";
			image.style.margin = "18px";

			var like = document.createElement("img");
			like.src = "images/like_big.png";
//			like.style.float = "left";
			like.style.position = "relative";
			like.style.left = "230px";
			like.style.top = "5px";
			like.title = "Click to add to liked list";

			like.setAttribute("class", "main_part_like_heart");
			var p = document.createElement("p");
			p.innerHTML = result[i].title;
			
			p.style.padding = "0";
			// p.style.paddingTop = "5px";
			p.style.margin = "0";
			p.style.textAlign = "center";

			div.appendChild(like);
			div.appendChild(image);
			div.appendChild(p);
			// div.style.width = "300px";
			div.style.margin = "0";
//			div.style.float = "left";
//			div.style.display = "flex";
			mainPart.appendChild(div);
			
		}
	}

	//add click event to every image div
	function clickImage(div_list,list,movie_list) {
		// console.log(div_list.length);
		// console.log(movie_list.length);
		for (var i = 0; i < div_list.length; i++) {
			var div_clicked = div_list[i];
			var movie = movie_list[i];
			div_clicked.style.cursor = "pointer";
			//add click event (if click the heart will be red) to every image element
			movie.onclick = changeColor;
			// div_clicked.setAttribute("class", "beenClicked");
			// var flag = "true";
			// addToLikedList(i,list,div_clicked,flag);
			addToLikedList(i,list,div_clicked);	
		}
	}
	
	function changeColor() {
		this.previousSibling.src = "images/like_red.png";
		// console.log(this.previousSibling);
		// div_clicked.childNodes[0].src = "images/like_red.png";
	}

	//to fix the closure problem,using this method
	//add every clicked image info the like-list page
	function addToLikedList(i,list,div_clicked) {
		// if (!flag) {
		// 	return;
		// }
		
		div_clicked.onclick = function () {
			// if(document.getElementById("like_number").innerHTML == "null") {
			// 	document.getElementById("like_number").innerHTML = "1";
			// }
			console.log(div_clicked.classList.contains('beenClicked') == true);
			if (div_clicked.classList.contains( "beenClicked")) {
				return false; 
			}
			
			// console.log(5);
			
			var movie = div_clicked.childNodes[1];

		// var checkP = div_clicked.childNodes[2];
		// if (list.childNodes.length >= 1) {
		// 	var checkResult = checkDuplicate(list, checkP);
		// 	if (!checkResult) {
		// 		return false;
		// 	}
		// }
			var div_text = document.createElement("div");
			div_text.setAttribute("class","draggable_div");
			div_text.style.cursor = "pointer";
			var liked_image = document.createElement("img");
			liked_image.src = movie.src;
			liked_image.width = "235";
			liked_image.height = "235";
			liked_image.style.padding = "20px";
			
			var like_1 = document.createElement("img");
			like_1.src = "images/like_red.png";
			like_1.style.position = "relative";

			var p_text = div_clicked.childNodes[2];
			var p_1 = document.createElement("p");
			p_1.innerHTML = p_text.innerHTML;
		
			div_text.appendChild(like_1);
			div_text.appendChild(liked_image);
			div_text.appendChild(p_1);
			div_text.style.width = "300px";
			div_text.style.margin = "0";

			div_clicked.className += " " + "beenClicked";
			
			list.appendChild(div_text);	
			
			number++;
			document.getElementById("list_number").innerHTML = number;
			document.getElementById("list_number").style.display = "inline";
			return true;
			
		}
	}

	// function checkDuplicate(list, ) {
	// 	for (var j = 0; j < list.childNodes.length; j++) {
	// 		var divCompared = list.childNodes[j];
	// 		console.log(divCompared);
	// 		if (divCompared.childNodes[2] == checkP) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }
	
	
	//display the like-list
	function openLikeLists() {
		// console.log(list.length);
		// console.log(list);
		
		document.getElementById("show_movie_list").style.textDecoration = "none";
		document.getElementById("list_number").style.textDecoration = "none";
		document.getElementById("show_liked_list").style.textDecoration = "underline plum";
		document.getElementsByClassName("second_part")[0].style.display = "none";
		document.getElementsByClassName("second_part_lists")[0].style.display = "block";
	}
	
	function openDragLists() {
		document.getElementsByClassName("second_part_lists")[0].style.display = "none";
		var draged_list = document.getElementById("second_part_drag_table_body");
		draged_list.style.border = "2px solid red";
		var compared = document.getElementsByClassName("draggable_div");
		for (var i = 0; i < compared.length; i++) {
			var drag_list_row = document.createElement("tr");
			var drag_list_number = document.createElement("td");
			var drag_list_whole = document.createElement("td");
//			var drag_list_title = document.createElement("td");
		
			drag_list_row.id = "drag_table_" + (i+1);
			drag_list_whole.id = "drag_row_" + (i+1);
			drag_list_row.style.position = "relative";
			drag_list_row.style.left = "100px";
			drag_list_row.style.border = "2px solid #8cd0e3";
			drag_list_row.style.cursor = "pointer";
//			drag_list_row.draggable = "true";
//			drag_list_row.ondragstart = "drag(event)";
//			drag_list_row.ondragover = "allowDrop(event)";
//			drag_list_row.ondrop = "drop(event)";
			
			var drag_div = document.createElement("div");
			drag_div.style.cursor = "pointer";
			drag_div.style.padding = "10px";
			
			drag_div.id = "drag_div_" + (i + 1);
			drag_div.style.cursor = "move";
			drag_div.draggable = "true";
			drag_div.ondragstart = drag;
			drag_div.ondragover = allowDrop;
			drag_div.ondrop = drop;
			
			var icon_dragged = compared[i].childNodes[0];
			var movie_dragged = compared[i].childNodes[1];
			var title_dragged = compared[i].childNodes[2];
			
			var drag_number = document.createElement("h3");
			drag_number.id = "drag_number_" + (i + 1);
			var drag_image = document.createElement("img");
			drag_image.id = "drag_image_" + (i + 1);
			var drag_like = document.createElement("img");
			drag_like.id = "drag_like_" + (i + 1);
			drag_like.style.padding = "15px";
			var drag_title = document.createElement("p");
			drag_title.id = "drag_title_" + (i + 1);
			
			drag_number.innerHTML = i + 1;
			drag_number.style.padding = "40px";
			drag_number.style.color = "#ff6397";
			drag_image.src = movie_dragged.src;
			drag_image.width = "230";
			drag_image.height = "230";
			drag_like.src = icon_dragged.src;
			drag_title.innerHTML = title_dragged.innerHTML;
			drag_title.style.margin = "0px";
			
			drag_div.appendChild(drag_image);
			drag_div.appendChild(drag_like);
			drag_div.appendChild(drag_title);
			
			drag_list_number.appendChild(drag_number);
			drag_list_whole.appendChild(drag_div);
//			drag_list_image.appendChild(drag_image);
//			drag_list_image.appendChild(drag_like);
			
			drag_list_row.appendChild(drag_list_number);
			drag_list_row.appendChild(drag_list_whole);
			draged_list.appendChild(drag_list_row);	
		}
		document.getElementsByClassName("second_part_drag")[0].style.display = "block";
	}
	
	function drag(event) {
		console.log(5);
		if (event.target.tagName.toLowerCase() !== "div") {
			event.dataTransfer.setData("target_id", event.target.parentNode.id);
			event.dataTransfer.setData("parent_id", event.target.parentNode.parentNode.id);	
		} else {
		event.dataTransfer.setData("target_id", event.target.id);
		event.dataTransfer.setData("parent_id", event.target.parentNode.id);	
		}
	}
	
	//阻止dragover的默认行为
	function allowDrop(event) {
		event.preventDefault();
	}
		
	// finally did it !!!! 0:40 08/15/2018
	function drop(event) {
		event.preventDefault();
		
		var child2_temp = event.target; 
		var child2;
		
		if (child2_temp.tagName.toLowerCase() !== 'div') {
			child2 = child2_temp.parentNode; //div2
			
		} else {
			child2 = child2_temp; //div2
		}
		var 	parent2 = child2.parentNode; //td2
		console.log(child2);
	
		var parent1_id = event.dataTransfer.getData("parent_id"); //td1_id
	    var parent1 = document.getElementById(parent1_id); // td1
//	    console.log(parent1);
//		//要插入位置的父元素
//	    var drop_parent;
//	    //需要交换的元素
//	    var drag_target;
	    
//	    if (!drop_parent.classList.contains('item')) {
//	    	return;
//	    }
//	   
	    var child1_id = event.dataTransfer.getData("target_id"); // div1_id
//	    console.log(child1_id);
	    var child1 = document.getElementById(child1_id); //div1
//	    var child1 = parent1.childNodes[0];
	   
	    var swap = child1;
//	    console.log(swap);
	    //交换元素
//	    parent1.replaceChild(child2, parent1.childNodes[0]);
	    parent1.removeChild(child1);
	    parent1.appendChild(child2);
	    parent2.appendChild(swap);

	}

	function returnToParentPage() {
		document.getElementsByClassName("second_part_lists")[0].style.display = "block";
		document.getElementsByClassName("second_part_drag")[0].style.display = "none";
	}
	

	// function clickImage(movie_list,div_list,list) {
	// 	for (var i = 0; i < movie_list.length; i++) {
	// 		var div_clicked = div_list[i];
	// 		var movie = movie_list[i];
	// 		movie.style.cursor = "pointer";
	// 		var flag = "true";
	// 		addToLikedList(i,list,div_clicked);
	// 		//add click event (if click the heart will be red) to every image element
	// 		movie.onclick = changeColor;
	// 	}
	// }