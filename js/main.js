var count_interval,
	slow_count_interval,
	count,
	full_speed_count,
	slow_speed_count,
	spin_container;

document.addEventListener('DOMContentLoaded', init, false);

function init(){
	var device = getDeviceType();
	if (device == 'desktop'){
		document.getElementById('meta_info_wrapper').innerHTML = "Ty for viewing on ur desktop";
	}

	spin_container = document.getElementById('spin');

	count = 0;
	full_speed_count = 1;
	slow_speed_count = 1;
	startCount();
}

function startCount(){
	fullSpeedCount();
};

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
  return "desktop";
};