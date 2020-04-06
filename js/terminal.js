// Taken from: https://gist.github.com/robhob/0bac6182f54fe2f4b5e646828b62b806
window.onload = function() {
	consoleText('Avi Yeger.','text','white', 'console', function() {
	consoleText('Developer.', 'text2', 'white', 'console2', null);});
}

function consoleText(txt,id,color,conid, done) {
	var visible=true;
	var waiting=true;
	var con= null;
	var func=null;
	var target=document.getElementById(id)
	var i=0
	
	con = document.getElementById(conid);
	func = window.setInterval( function() {
		if (visible===true) {
			if (waiting) {
				con.className = 'console-underscore hidden'
				visible=false;
			}
		} else {
			con.className = 'console-underscore'
			visible = true;
		}
	}, 400)
	
	target.setAttribute('style','color:'+color)
	function typeWriter() { 
		if (i<txt.length) {
			waiting=false;
			target.innerHTML += txt.charAt(i);
			i++;
			setTimeout(typeWriter,215);
			waiting=true;
		} else {
			if (null != done) {
				window.clearInterval(func);
				con.className = 'console-underscore hidden'
				done();
			}
		}
	}

	setTimeout(function() {
		typeWriter();
	},2600)
}
