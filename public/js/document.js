

window.addEventListener("DOMContentLoaded", function() {
    var body = document.getElementById('Docbody')  
    var isAnybodyWrite = document.getElementById('marked')
    
    if(isAnybodyWrite) {
        isAnybodyWrite.innerHTML=marked.parse('##### 로그인한 사용자만 편집할 수 있습니다.\n ---')
    }

    if(body) {
        var parsedbody = document.getElementById('parsedbody')
        parsedbody.innerHTML = body.innerText
    }
})