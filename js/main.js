var count_interval,
	slow_count_interval,
	count,
	full_speed_count,
	slow_speed_count,
	spin_container,
	video1,
	video2;

var storage = window.localStorage;

document.addEventListener('DOMContentLoaded', init, false);

function init(){
	var device = getDeviceType();

	document.getElementById('meta_info_wrapper').innerHTML = 'Viewing on ' + device;

	spin_container = document.getElementById('spin');

	count = 0;
	full_speed_count = 1;
	slow_speed_count = 1;

	video1 = document.getElementById('video120');
	video2 = document.getElementById('video60');

	video2.addEventListener('loadeddata', startCount);

}

function startCount(){
	if (checkIfFirstLoaded){
		document.body.classList.add('loaded');
		video1.play();
		video2.play();
		fullSpeedCount();
	} else{
		setTimeOut(function(){
			startCount();
		}, 500);
	}
};

function checkIfFirstLoaded(){
	return video1.buffered.length > 0;
}

function fullSpeedCount(){
	count_interval = setInterval(function(){
		if (full_speed_count > 2){
			clearInterval(count_interval);
			full_speed_count = 0;
			slowSpeedCount();
		}
		count ++;
		spin.innerHTML = count;
		full_speed_count ++;
	}, 1000);
};

function slowSpeedCount(){
	slow_count_interval = setInterval(function(){
		if (slow_speed_count >= 1){
			clearInterval(slow_count_interval);
			slow_speed_count = 1;
			fullSpeedCount();
		}
		count ++;
		spin.innerHTML = count;
		slow_speed_count ++;
	}, 5000);
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