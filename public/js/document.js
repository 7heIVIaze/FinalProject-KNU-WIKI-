window.addEventListener("DOMContentLoaded", function() {
    var body = document.getElementById('Docbody')  
    
    if(body) {
        var parsedbody = document.getElementById('parsedbody')
        parsedbody.innerHTML = body.innerText
    }
})