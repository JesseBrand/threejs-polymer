function createPointerLockController(controls, blocker, instructions) {
	return {
		init: function() {
			document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
			document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

			// Hook pointer lock state change events
			document.addEventListener( 'pointerlockchange', this.changeHandler, false );
			document.addEventListener( 'mozpointerlockchange', this.changeHandler, false );
			document.addEventListener( 'webkitpointerlockchange', this.changeHandler, false );

			document.addEventListener( 'pointerlockerror', this.errorHandler, false );
			document.addEventListener( 'mozpointerlockerror', this.errorHandler, false );
			document.addEventListener( 'webkitpointerlockerror', this.errorHandler, false );

			instructions.addEventListener( 'click', this.grabFocus, false );
		},

		changeHandler: function(event) {
			if ( document.pointerLockElement === document.body || document.mozPointerLockElement === document.body || document.webkitPointerLockElement === document.body ) {
				controls.enabled = true;
				blocker.style.display = 'none';
			} else if (!controls.cursorFree) {
				controls.enabled = false;
				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';
				instructions.style.display = '-webkit-box';
				instructions.style.display = '-moz-box';
				instructions.style.display = 'box';
				instructions.addEventListener('click', this.grabFocus, false);
			}
		},

		errorHandler: function (event ) {
			console.log('error', event);
		},

		grabFocus: function(event) {
			instructions.style.display = 'none';

			if (/Firefox/i.test(navigator.userAgent)) {

				var fullscreenchange = function ( event ) {

					if (document.fullscreenElement === document.body || document.mozFullscreenElement === document.body || document.mozFullScreenElement === document.body ) {
						document.removeEventListener('fullscreenchange', fullscreenchange);
						document.removeEventListener('mozfullscreenchange', fullscreenchange);
						document.body.requestPointerLock();
					}

				};
				document.addEventListener('fullscreenchange', fullscreenchange, false);
				document.addEventListener('mozfullscreenchange', fullscreenchange, false);
				document.body.requestFullscreen = document.body.requestFullscreen || document.body.mozRequestFullscreen || document.body.mozRequestFullScreen || document.body.webkitRequestFullscreen;
				document.body.requestFullscreen();
			} else {
				document.body.requestPointerLock();
			}
		},
		releaseFocus: function() {
			document.exitPointerLock();
		}
	};
}

