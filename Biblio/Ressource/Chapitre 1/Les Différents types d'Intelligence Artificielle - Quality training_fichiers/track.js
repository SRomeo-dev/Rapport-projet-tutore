function treenation_track(user_id){var url='https://tree-nation.com/track/web/'+user_id;var xhr=createCORSRequest('GET',url);xhr.send()}
function createCORSRequest(method,url){var xhr=new XMLHttpRequest();if("withCredentials" in xhr){xhr.open(method,url,!0)}else if(typeof XDomainRequest!="undefined"){xhr=new XDomainRequest();xhr.open(method,url)}else{xhr=new XMLHttpRequest()}
return xhr}