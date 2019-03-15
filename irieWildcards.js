const WILDCARD = '@@';

function translateRegex(string){
	
  	function removeCharacter(str, char_pos) {
            var part1 = str.substring(0, char_pos);
            var part2 = str.substring(char_pos + 1, str.length);
            return (part1 + part2);
        }
	
	function escapeRegExp(text) {
	   for (var i = text.length - 1; i >= 0; i--){
                if(text.charAt(i) == '\\'){
                    text = removeCharacter(text, i);
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
