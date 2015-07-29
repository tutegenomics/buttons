# Tute buttons (a.k.a Tuttons)
####(pronounced: "tootins")

##Loading button

A button that handles the state changing logic of replacing the button text and toggling a loading class. Example usage:

```html
	<tute-loading-button 
		class="btn btn-pri"
		btn-type="submit"
		ng-click="getPokemon()"
		loading="requestPending" 
		loading-text="'Catching...'" 
		text="'Gotta catch em all'"
	>
	</tute-loading-button >
```

API:

```javascript
btnType: '@',      //string, valid values: submit|button. Changes if <button> or <input type="submit" /> element
loadingClass: '@', //string, CSS class that gets added when the button is loading. Default: 'btn-is-loading'
loading: '=',      //bool, toggles loading/normal state
loadingText: '=',  //string, text to change button when in loading state
text: '=',         //string, default button text
```

##Radio group buttons

Based on bootstrap's radio button group: [http://getbootstrap.com/javascript/#buttons](http://getbootstrap.com/javascript/#buttons). Uses bootstrap's classes.

API:

```javascript
/*
buttons should look like: 
[
	{
		label: 'Option 1',
		value: 1,
		preselected: true //makes this one selected initially
	},
	{
		label: 'Option 2',
		value: 2,
		classes: 'btn-primary'
	}
]
 */
buttons: '='
```


## Install
```
bower install tute-buttons
```

Include in your app:

```javascript
angular.module('my-app', [
	'tute-buttons', //this requires you to include all the JS (dist/tute-buttons-all.js)

	//OR you may individually pick and choose what you want and add individual modules:
	'tute-buttons.loadingButton' //include only the dist/loadingButton.js script
]);
```

## Developing

Run `./dev-server.sh` to serve it locally. 

Run `gulp` to watch and re-build it. 