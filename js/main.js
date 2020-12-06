var count,
	spin_container,
	video1,
	video2;

var storage = window.localStorage;

document.addEventListener('DOMContentLoaded', init, false);

function init(){
	var device = getDeviceType();

	document.getElementById('meta_info_wrapper').innerHTML = 'Viewing on ' + device;

	spin_container = document.getElementById('spin_count');

	count = parseInt(storage.getItem('count')) || 0;

	spin_container.innerHTML = count;

	video1 = document.getElementById('video120');
	video2 = document.getElementById('video60');

	video2.addEventListener('loadeddata', startCount);

	video1.addEventListener('ended', function () {
		count = count + 4;
		spin_container.innerHTML = count;
	 	this.play();
	 	storage.setItem('count', count);
	})
	video2.addEventListener('ended', function () {
	 	this.play();
	})
}

function startCount(){
	var check = checkIfFirstLoaded();
	if (check){
		document.body.classList.add('loaded');
		video1.play();
		video2.play();
	} else{
		setTimeout(function(){
			startCount();
		}, 500);
	}
};

function checkIfFirstLoaded(){
	return video1.buffered.length > 0;
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