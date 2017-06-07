var l0List = document.querySelectorAll('.l0');


/*
	{ el: <DOMNode>, callback: <function> }
*/
var onScrollSubs = [];


l0List.forEach(function(el, i) {
	if (hasClass(el, '_video')) {
		var video = el.children[0].children[0];

		onScrollSubs.push(watch(
			el,
			function() {
				// console.log('h,t,st,sh OUT', top, bottom, document.body.scrollTop, document.body.scrollHeight);
				return document.body.scrollTop >= el.offsetTop - el.offsetHeight 
					&& document.body.scrollTop < el.offsetTop + el.offsetHeight;
			},
			function() { video.play(); },
			function() { video.pause(); }
		));

		onScrollSubs.push(watch(
			el,
			function() {
				// console.log('h,t,st,sh OUT', top, bottom, document.body.scrollTop, document.body.scrollHeight);
				return document.body.scrollTop >= el.offsetTop
					&& document.body.scrollTop < el.offsetTop + el.offsetHeight;
			},
			function() { addClass(video, '_fixed'); },
			function() { removeClass(video, '_fixed'); }
		));
	}
});


function watch(el, insideCondition, onEnter, onLeft) {
	var inside = false;
	function check() {
		if (inside) {
			if (!insideCondition()) {
				inside = false;
				onLeft();
			}
		} else {
			if (insideCondition()) {
				inside = true;
				onEnter();
			}
		}
	}
	return check;
}


document.addEventListener('scroll', function() {
	onScrollSubs.forEach(function(check) {
		check();
	});
});


// --- STATE


var appWidth = window.innerWidth || document.documentElement.clientWidth;
var appHeigth = window.innerHeight || document.documentElement.clientHeight;


window.onresize = function() {
	appWidth = window.innerWidth || document.documentElement.clientWidth;
	appHeigth = window.innerHeight || document.documentElement.clientHeight;
};


// --- DOM


function hasClass(el, className) {
	var classes = el.className.split(' ');
	for (var i = 0; i < classes.length; i++) {
		if (classes[i] === className) {
			return true;
		}
	}
	return false;
}


function addClass(el, className) {
	var classes = el.className.split(' ');
	for (var i = 0; i < classes.length; i++) {
		if (classes[i] === className) {
			return;
		}
	}
	classes.push(className);
	el.className = classes.join(' ');
}


function removeClass(el, className) {
	// assume using our addClass, which excludes duplicate classes
	var classes = el.className.split(' ');
	for (var i = 0; i < classes.length; i++) {
		if (classes[i] === className) {
			break;
		}
	}
	classes.splice(i, 1);
	el.className = classes.join(' ');
}

