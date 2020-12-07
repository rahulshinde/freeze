var count,
	spin_container,
	video1,
	video2,
	document_height,
	current_section,
	time_interval;

var storage = window.localStorage;
var positions = {};

document.addEventListener('DOMContentLoaded', init, false);

function init(){
	var device = getDeviceType();

	document.getElementById('meta_info_wrapper').innerHTML = 'Viewing on ' + device;

	window.addEventListener('scroll', checkScrollPosition);
	window.addEventListener('resize', setPositions);

	spin_container = document.getElementById('spin_count');

	count = parseInt(storage.getItem('count')) || 0;
	time = 0;

	spin_container.innerHTML = count;

	video1 = document.getElementById('video120');
	video2 = document.getElementById('video60');

	video2.addEventListener('loadeddata', startCount);

	video1.addEventListener('ended', function () {
		count = count + 4;
		spin_container.innerHTML = count;
	 	this.play();
	 	storage.setItem('count', count);
	});

	video2.addEventListener('ended', function () {
	 	this.play();
	});
}

function setPositions(){
	var total_position = 0;
	var body = document.body,
    	html = document.documentElement;
	document_height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.innerHeight * 1.5;
	for (var i = 1; i <= 7; i++) {
		if (i == 1){
			total_position = total_position + window.innerHeight;
			positions['chapter1'] = total_position;
		}else{
			var position = document.getElementById('chapter' + (i - 1)).offsetHeight;
			console.log('chapter_height');
			total_position = total_position + position
			positions['chapter' + i] = total_position;
		}
	}
	positions['stats'] = document.getElementById('stats').getBoundingClientRect().top + document.documentElement.scrollTop;
	console.log(positions);
}

function checkScrollPosition(e){
	var scroll = window.scrollY;
	setSelected(scroll);
}

function setSelected(scroll){
	var section_set = false;
	if (scroll <= window.innerHeight){
		clearJumpLinkSelections();
		clearInterval(time_interval);
		current_section = 0;
		document.getElementById('section_info').innerHTML = "";
		return;
	}
	if (scroll >= document_height){
		clearJumpLinkSelections();
		clearInterval(time_interval);
		current_section = 8;
		document.getElementById('link_stats').classList.add('selected');
		setData();
		return;
	}
	for (var i = 7; i >= 1; i--) {
		if (scroll >= positions['chapter' + i] && !section_set){
			clearJumpLinkSelections();
			document.getElementById('link_' + i).classList.add('selected');
			section_set = true;
			if (current_section != i){
				setSectionAsCurrent(i);
			}
		}
	}
}

function clearJumpLinkSelections(){
	document.querySelectorAll('.jump_link').forEach(function(e){
		e.classList.remove('selected');
	});	
}

function startCount(){
	var check = checkIfFirstLoaded();
	if (check){
		document.body.classList.add('loaded');
		video1.play();
		video2.play();
		setPositions();
	} else{
		setTimeout(function(){
			startCount();
		}, 500);
	}
};

function setSectionAsCurrent(section){
	current_section = section;
	clearInterval(time_interval);
	time_interval = setInterval(function(){
		var time = parseInt(storage.getItem('time' + section)) + 1 || 1;
		console.log(time);
		storage.setItem('time' + section, time);
		document.getElementById('section_info').innerHTML = "You've been reading chapter " + section + " for " + time + "s";
	}, 1000);
};

function checkIfFirstLoaded(){
	return video1.buffered.length > 0;
}

function setData(){

}

function getDeviceType(){
  var ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return ua;
};