# Angular loader button

A button that handles the state changing logic of replacing the button text and toggling a loading class. Example usage:

```html
	<tute-button 
		class="btn btn-pri"
		btn-type="submit"
		ng-click="getPokemon()"
		loading="requestPending" 
		loading-text="'Catching...'" 
		text="'Gotta catch em all'"
	>
	</tute-button>
```

Here's the API:

```javascript
btnType: '@',      //string, valid values: submit|button. Changes if <button> or <input type="submit" /> element
loadingClass: '@', //string, CSS class that gets added when the button is loading. Default: 'btn-is-loading'
loading: '=',      //bool, toggles loading/normal state
loadingText: '=',  //string, text to change button when in loading state
text: '=',         //string, default button text
```

Maybe more buttons to come in this repo, hence the vague, all encompassing name.

## Developing

Run `./dev-server.sh` to serve it locally. 