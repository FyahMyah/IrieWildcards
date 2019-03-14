const WILDCARD = '@@';

function translateRegex(string){
	function escapeRegExp(text) {

		var last;
		for (var i = 0; i < text.length; i++) {

			if(text.charAt(i) == '\\'){
				console.log(text.charAt(i))
				last = text.charAt(i);

			}
		}

		return text;
	}
	var wildcard = '';
	var wildcards = string.split('.*')
	wildcards.forEach(function(element, index){
		if(element.length > 0){
			element = element.slice(1,-1);
		}
		element = escapeRegExp(element);
		if(index + 1 !== wildcards.length){
			element += WILDCARD;
		}
		wildcard += element;
	});
	return wildcard;
}

function translateWildcard(string){
	function escapeRegExp(text) {
		return text.replace(/[^\w\s]/gi, '\\$&');
	}
	var regex = '';
	var wildcards = string.split(WILDCARD);
	wildcards.forEach(function(element, index){
		if(element.length === 0){
			regex += escapeRegExp(element);
		}
		else{
			regex += '(' + escapeRegExp(element) + ')';
		}
		if(index + 1 !== wildcards.length){
			regex += '.*';
		}
	});
	return regex;
}

setInterval(function() { 
	var regex = translateWildcard(document.getElementById('wildcard').value)
	document.getElementById("regexShow").innerHTML = regex;
	document.getElementById("wildcardShow").innerHTML = translateRegex(regex);
}, 3000);