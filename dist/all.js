
document.addEventListener('DOMContentLoaded', start);
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
	//image-div lists
	var div_list = document.getElementsByClassName("whole_image");
	//image-liked-list
	var list = document.getElementById("liked_list");
	var drag_list = document.getElementById("second_part_drag_table");
	//add click event to every image div
	clickImage(movie_list,div_list,list);
	//open like-list
	document.getElementById("like_icon").onclick = openLikeLists;
	//get drag lists & open this page
	document.getElementById("second_part_lists_icon").onclick = openDragLists;	
}

	//add click event to every image div
	function clickImage(movie_list,div_list,list) {
		for (var i = 0; i < movie_list.length; i++) {
			var div_clicked = div_list[i];
			var movie = movie_list[i];
			movie.style.cursor = "pointer";
			addToLikedList(i,list,div_clicked);
			//add click event (if click the heart will be red) to every image element
			movie.onclick = changeColor;
		}
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

			var like = document.createElement("img");
			like.src = "images/like_big.png";
//			like.style.float = "left";
			like.style.position = "relative";
			like.style.left = "230px";
			like.style.top = "20px";
			like.title = "Click to add to liked list";

			like.setAttribute("class", "main_part_like_heart");
			var p = document.createElement("p");
			p.innerHTML = result[i].title;
			p.style.padding = "0";

			div.appendChild(like);
			div.appendChild(image);
			div.appendChild(p);
			div.style.width = "300px";
			div.style.margin = "0";
//			div.style.float = "left";
//			div.style.display = "flex";
			mainPart.appendChild(div);
		}
	}

	//to fix the closure problem,using this method
	//add every clicked image info the like-list page
	function addToLikedList(i,list,div_clicked) {
		div_clicked.onclick = function () {
		var movie = div_clicked.childNodes[1];
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
//		like_1.style.float = "left";
		like_1.style.position = "relative";
//		like_1.style.left = "210px";
//		like_1.style.top = "20px";
		
		var p_text = div_clicked.childNodes[2];
 		var p_1 = document.createElement("p");
 		p_1.innerHTML = p_text.innerHTML;
       
		div_text.appendChild(like_1);
		div_text.appendChild(liked_image);
		div_text.appendChild(p_1);
		div_text.style.width = "300px";
		div_text.style.margin = "0";
//		div_text.style.float = "left";
		list.appendChild(div_text);	
		}
	}
	
	function changeColor() {
//		this.style.cursor = "pointer";
		this.previousSibling.src = "images/like_red.png";
	}
	
	//display the like-list
	function openLikeLists() {
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
	
var results_1 = {
	"page": 1,
	"total_results": 19776,
	"total_pages": 989,
	"results": [{
		"vote_count": 6526,
		"id": 299536,
		"video": false,
		"vote_average": 8.3,
		"title": "Avengers: Infinity War",
		"popularity": 350.154,
		"poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
		"original_language": "en",
		"original_title": "Avengers: Infinity War",
		"genre_ids": [12, 878, 14, 28],
		"backdrop_path": "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
		"adult": false,
		"overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
		"release_date": "2018-04-25"
	}, {
		"vote_count": 614,
		"id": 353081,
		"video": false,
		"vote_average": 7.4,
		"title": "Mission: Impossible - Fallout",
		"popularity": 234.677,
		"poster_path": "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
		"original_language": "en",
		"original_title": "Mission: Impossible - Fallout",
		"genre_ids": [12, 28, 53],
		"backdrop_path": "/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg",
		"adult": false,
		"overview": "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
		"release_date": "2018-07-25"
	}, {
		"vote_count": 3532,
		"id": 383498,
		"video": false,
		"vote_average": 7.6,
		"title": "Deadpool 2",
		"popularity": 156.499,
		"poster_path": "/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
		"original_language": "en",
		"original_title": "Deadpool 2",
		"genre_ids": [28, 35, 878],
		"backdrop_path": "/lRPH3X1q0Pp3s27df1BveqwLBA8.jpg",
		"adult": false,
		"overview": "Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.",
		"release_date": "2018-05-15"
	}, {
		"vote_count": 1123,
		"id": 363088,
		"video": false,
		"vote_average": 7,
		"title": "Ant-Man and the Wasp",
		"popularity": 139.892,
		"poster_path": "/rv1AWImgx386ULjcf62VYaW8zSt.jpg",
		"original_language": "en",
		"original_title": "Ant-Man and the Wasp",
		"genre_ids": [28, 12, 14, 35, 878],
		"backdrop_path": "/6P3c80EOm7BodndGBUAJHHsHKrp.jpg",
		"adult": false,
		"overview": "As Scott Lang awaits expiration of his term of house detention, Hope van Dyne and Dr. Hank Pym involve him in a scheme to rescue Mrs. van Dyne from the micro-universe into which she has fallen, while two groups of schemers converge on them with intentions of stealing Dr. Pym's inventions.",
		"release_date": "2018-07-04"
	}, {
		"vote_count": 2499,
		"id": 351286,
		"video": false,
		"vote_average": 6.6,
		"title": "Jurassic World: Fallen Kingdom",
		"popularity": 108.617,
		"poster_path": "/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
		"original_language": "en",
		"original_title": "Jurassic World: Fallen Kingdom",
		"genre_ids": [28, 12, 878],
		"backdrop_path": "/3s9O5af2xWKWR5JzP2iJZpZeQQg.jpg",
		"adult": false,
		"overview": "Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.",
		"release_date": "2018-06-06"
	}, {
		"vote_count": 15,
		"id": 493006,
		"video": false,
		"vote_average": 4,
		"title": "Detective Conan: Zero the Enforcer",
		"popularity": 98.631,
		"poster_path": "/mMWV5MXn2pkDnnI4vWpy3dRWdNC.jpg",
		"original_language": "ja",
		"original_title": "åæŽ¢åµã‚³ãƒŠãƒ³ ã‚¼ãƒ­ã®åŸ·è¡Œäºº",
		"genre_ids": [16, 80, 9648, 28, 18],
		"backdrop_path": "/kEqeponciiz6TyuKWtnKSzXzbGa.jpg",
		"adult": false,
		"overview": "There is a sudden explosion at Tokyo Summit's giant Edge of Ocean facility. The shadow of TÅru Amuro, who works for the National Police Agency Security Bureau as Zero, appears at the site. In addition, the \"triple-face\" character is known as Rei Furuya as a detective and KogorÅ MÅri's apprentice, and he is also known as Bourbon as a Black Organization member. KogorÅ is arrested as a suspect in the case of the explosion. Conan conducts an investigation to prove KogorÅ's innocence, but Amuro gets in his way.",
		"release_date": "2018-04-13"
	}, {
		"vote_count": 7670,
		"id": 284053,
		"video": false,
		"vote_average": 7.5,
		"title": "Thor: Ragnarok",
		"popularity": 90.112,
		"poster_path": "/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
		"original_language": "en",
		"original_title": "Thor: Ragnarok",
		"genre_ids": [28, 12],
		"backdrop_path": "/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg",
		"adult": false,
		"overview": "Thor is on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the prophecy of destruction to his homeworld and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless Hela.",
		"release_date": "2017-10-25"
	}, {
		"vote_count": 3717,
		"id": 954,
		"video": false,
		"vote_average": 6.8,
		"title": "Mission: Impossible",
		"popularity": 87.674,
		"poster_path": "/vmj2PzTLC6xJvshpq8SlaYE3gbd.jpg",
		"original_language": "en",
		"original_title": "Mission: Impossible",
		"genre_ids": [12, 28, 53],
		"backdrop_path": "/tjQHn6xW5BiB1RJ3OZIPDzIOSkF.jpg",
		"adult": false,
		"overview": "When Ethan Hunt, the leader of a crack espionage team whose perilous operation has gone awry with no explanation, discovers that a mole has penetrated the CIA, he's surprised to learn that he's the No. 1 suspect. To clear his name, Hunt now must ferret out the real double agent and, in the process, even the score.",
		"release_date": "1996-05-22"
	}, {
		"vote_count": 3456,
		"id": 333339,
		"video": false,
		"vote_average": 7.7,
		"title": "Ready Player One",
		"popularity": 80.114,
		"poster_path": "/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
		"original_language": "en",
		"original_title": "Ready Player One",
		"genre_ids": [12, 878, 14],
		"backdrop_path": "/5a7lMDn3nAj2ByO0X1fg6BhUphR.jpg",
		"adult": false,
		"overview": "When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.",
		"release_date": "2018-03-28"
	}, {
		"vote_count": 477,
		"id": 442249,
		"video": false,
		"vote_average": 6,
		"title": "The First Purge",
		"popularity": 78.632,
		"poster_path": "/2slvblTroiT1lY9bYLK7Amigo1k.jpg",
		"original_language": "en",
		"original_title": "The First Purge",
		"genre_ids": [28, 27, 878, 53],
		"backdrop_path": "/dnaitaoCh8MftfYEVnprcuYExZp.jpg",
		"adult": false,
		"overview": "To push the crime rate below one percent for the rest of the year, the New Founding Fathers of America test a sociological theory that vents aggression for one night in one isolated community. But when the violence of oppressors meets the rage of the others, the contagion will explode from the trial-city borders and spread across the nation.",
		"release_date": "2018-07-04"
	}, {
		"vote_count": 1669,
		"id": 260513,
		"video": false,
		"vote_average": 7.7,
		"title": "Incredibles 2",
		"popularity": 76.128,
		"poster_path": "/x1txcDXkcM65gl7w20PwYSxAYah.jpg",
		"original_language": "en",
		"original_title": "Incredibles 2",
		"genre_ids": [28, 12, 16, 10751],
		"backdrop_path": "/mabuNsGJgRuCTuGqjFkWe1xdu19.jpg",
		"adult": false,
		"overview": "Elastigirl springs into action to save the day, while Mr. Incredible faces his greatest challenge yet â€“ taking care of the problems of his three children.",
		"release_date": "2018-06-14"
	}, {
		"vote_count": 4262,
		"id": 177677,
		"video": false,
		"vote_average": 7.1,
		"title": "Mission: Impossible - Rogue Nation",
		"popularity": 73.968,
		"poster_path": "/z2sJd1OvAGZLxgjBdSnQoLCfn3M.jpg",
		"original_language": "en",
		"original_title": "Mission: Impossible - Rogue Nation",
		"genre_ids": [28, 12, 53],
		"backdrop_path": "/8XeLfNQrDmFQmPTqxapfWUnKiLf.jpg",
		"adult": false,
		"overview": "Ethan and team take on their most impossible mission yet, eradicating the Syndicate - an International rogue organization as highly skilled as they are, committed to destroying the IMF.",
		"release_date": "2015-07-23"
	}, {
		"vote_count": 14122,
		"id": 118340,
		"video": false,
		"vote_average": 7.9,
		"title": "Guardians of the Galaxy",
		"popularity": 73.898,
		"poster_path": "/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg",
		"original_language": "en",
		"original_title": "Guardians of the Galaxy",
		"genre_ids": [28, 878, 12],
		"backdrop_path": "/bHarw8xrmQeqf3t8HpuMY7zoK4x.jpg",
		"adult": false,
		"overview": "Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser.",
		"release_date": "2014-07-30"
	}, {
		"vote_count": 1558,
		"id": 427641,
		"video": false,
		"vote_average": 6.2,
		"title": "Rampage",
		"popularity": 69.73,
		"poster_path": "/3gIO6mCd4Q4PF1tuwcyI3sjFrtI.jpg",
		"original_language": "en",
		"original_title": "Rampage",
		"genre_ids": [28, 12, 878, 14],
		"backdrop_path": "/wrqUiMXttHE4UBFMhLHlN601MZh.jpg",
		"adult": false,
		"overview": "Primatologist Davis Okoye shares an unshakable bond with George, the extraordinarily intelligent, silverback gorilla who has been in his care since birth.  But a rogue genetic experiment gone awry mutates this gentle ape into a raging creature of enormous size.  To make matters worse, itâ€™s soon discovered there are other similarly altered animals.  As these newly created alpha predators tear across North America, destroying everything in their path, Okoye teams with a discredited genetic engineer to secure an antidote, fighting his way through an ever-changing battlefield, not only to halt a global catastrophe but to save the fearsome creature that was once his friend.",
		"release_date": "2018-04-12"
	}, {
		"vote_count": 21,
		"id": 345940,
		"video": false,
		"vote_average": 7.4,
		"title": "The Meg",
		"popularity": 65.122,
		"poster_path": "/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg",
		"original_language": "en",
		"original_title": "The Meg",
		"genre_ids": [28, 878, 53, 27],
		"backdrop_path": "/ibKeXahq4JD63z6uWQphqoJLvNw.jpg",
		"adult": false,
		"overview": "A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.",
		"release_date": "2018-08-09"
	}, {
		"vote_count": 7255,
		"id": 284054,
		"video": false,
		"vote_average": 7.3,
		"title": "Black Panther",
		"popularity": 64.453,
		"poster_path": "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
		"original_language": "en",
		"original_title": "Black Panther",
		"genre_ids": [28, 12, 14, 878],
		"backdrop_path": "/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg",
		"adult": false,
		"overview": "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without. Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister, members of the Dora Milaje (the Wakandan 'special forces') and an American secret agent, to prevent Wakanda from being dragged into a world war.",
		"release_date": "2018-02-13"
	}, {
		"vote_count": 7,
		"id": 476292,
		"video": false,
		"vote_average": 5.7,
		"title": "Maquia: When the Promised Flower Blooms",
		"popularity": 63.193,
		"poster_path": "/vOrK1n6VgVCFBwgcq5tMoPCqa47.jpg",
		"original_language": "ja",
		"original_title": "ã•ã‚ˆãªã‚‰ã®æœã«ç´„æŸã®èŠ±ã‚’ã‹ã–ã‚ã†",
		"genre_ids": [16],
		"backdrop_path": "/cfbjFQ14hSTgXChBEvaEjFiUaKb.jpg",
		"adult": false,
		"overview": "A story of encounters and partings interwoven between people; this is a human drama with feelings that touch one's heart gradually, which everyone has experienced at least once.",
		"release_date": "2018-02-24"
	}, {
		"vote_count": 5042,
		"id": 56292,
		"video": false,
		"vote_average": 6.9,
		"title": "Mission: Impossible - Ghost Protocol",
		"popularity": 62.713,
		"poster_path": "/s58mMsgIVOFfoXPtwPWJ3hDYpXf.jpg",
		"original_language": "en",
		"original_title": "Mission: Impossible - Ghost Protocol",
		"genre_ids": [28, 53, 12],
		"backdrop_path": "/pc7a2qrIkIxzqWGqcexd3mHzIxy.jpg",
		"adult": false,
		"overview": "Ethan Hunt and his team are racing against time to track down a dangerous terrorist named Hendricks, who has gained access to Russian nuclear launch codes and is planning a strike on the United States. An attempt to stop him ends in an explosion causing severe destruction to the Kremlin and the IMF to be implicated in the bombing, forcing the President to disavow them. No longer being aided by the government, Ethan and his team chase Hendricks around the globe, although they might still be too late to stop a disaster.",
		"release_date": "2011-12-07"
	}, {
		"vote_count": 8762,
		"id": 102899,
		"video": false,
		"vote_average": 7,
		"title": "Ant-Man",
		"popularity": 61.829,
		"poster_path": "/D6e8RJf2qUstnfkTslTXNTUAlT.jpg",
		"original_language": "en",
		"original_title": "Ant-Man",
		"genre_ids": [878, 28, 12],
		"backdrop_path": "/kvXLZqY0Ngl1XSw7EaMQO0C1CCj.jpg",
		"adult": false,
		"overview": "Armed with the astonishing ability to shrink in scale but increase in strength, master thief Scott Lang must embrace his inner-hero and help his mentor, Doctor Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats. Against seemingly insurmountable obstacles, Pym and Lang must plan and pull off a heist that will save the world.",
		"release_date": "2015-07-14"
	}, {
		"vote_count": 1,
		"id": 523873,
		"video": false,
		"vote_average": 0,
		"title": "Kung Fu League",
		"popularity": 61.162,
		"poster_path": "/rW0A73hjzPWVwADlCTLnjLhAFLX.jpg",
		"original_language": "zh",
		"original_title": "åŠŸå¤«è”ç›Ÿ",
		"genre_ids": [28, 35],
		"backdrop_path": null,
		"adult": false,
		"overview": "Martial arts comedy following a group of kung fu legends banding together to take on the bad guys. The legends includes VINCENT ZHAO reprising his role as â€˜Wong Fei Hungâ€™ with DENNIS TO once again portraying â€˜Wing Chunâ€™ master â€˜Ip Manâ€™, DANNY CHAN KWOK KWAN as â€˜Chen Zhenâ€™ and ANDY ON as master â€˜Huo Yuan Jiaâ€™.",
		"release_date": "2018-10-19"
	}]
}
document.addEventListener('DOMContentLoaded', start);

function start() {
	//open the sign_in form
	document.getElementById("sign_in").onclick = displaySignIn;
	
	//check the login information
	document.getElementById("login_username").onblur = checkUserName;
	document.getElementById("login_pwd").onblur = checkPwd;
	
	document.getElementById("submit").onclick = displayAnotherPage;
	document.getElementById("setting").onclick = openNewPage;
	
}    	

function displaySignIn() {
	document.getElementById("sign_in_form_id").style.display = "block";
}

function checkUserName() {
	var name = document.getElementById("login_username").value;
	var rule = /^\D{1,8}$/;
	var span = document.getElementById("user_msg");
//	if (name == null) {
//		span.className = "error";
//		return false;
//	}
	if (rule.test(name)) {
		
		span.style.display = "none";
		return true;
	}
		span.style.display = "block";
		return false;
}

function checkPwd() {
	var pwd = document.getElementById("login_pwd").value;
	var rule_pwd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8}$/;
	var span2 = document.getElementById("pwd_msg");
	if (!rule_pwd.test(pwd)) {
		document.getElementById("pwd_msg").style.display= "block";
//		span2.className = "error";
		return false;
	}
		document.getElementById("pwd_msg").style.display = "none";
//		span2.className = "ok";
		
		return true;
}

function displayAnotherPage() {
//	AccountImage.src = "../images/user.png";
//	settingImage.src = "../images/setting.png";
//	var result = checkUserName() && checkPwd();
//	console.log(result);
//	if (result) {

		var current = document.getElementById("sign_in");
		console.log(current);
	    current.innerHTML = "<img src='images/user.png'>";
	   
	    var settingImage = document.getElementById("setting");
	    settingImage.src = "images/settings.png";
//	    settingImage.style.id = "setting";
	    settingImage.style.padding = "10px";
	    settingImage.style.cursor = "pointer";
//	    document.getElementsByClassName("right-bar")[0].insertBefore(settingImage, current);
	    document.getElementById("sign_in_form_id").style.display = "none";
//	    return true;
//	}	
//		return false;
	
}

function openNewPage() {
	localStorage.userName = document.getElementById("login_username").value;
	console.log(localStorage.userName);
	window.location.href="function_like.html";	
}

