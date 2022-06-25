async function DupCheck() {
    const usernameInput = document.getElementById('usernameInput')
    const userId = document.getElementById('usernameInput').value
    const dupButton = document.getElementById('dupcheckButton')
    if(!userId) {
        console.log('none')
        alert('사용자 ID를 입력해주십시오.')
        usernameInput.focus()
    }
    else {
        let { status } = await axios.get(`dupcheck?userId=${userId}`)
        console.log(status)
        if(status === 200) { 
            dupButton.innerText='확인완료'
            dupButton.setAttribute('class', 'disable')
            dupButton.disabled = true
            usernameInput.readOnly = true
        }
        else alert('다른 아이디를 입력해주세요.')
    }
}

function checkAll() {
    const dupButton = document.getElementById('dupcheckButton')
    const usernameInput = document.getElementById('usernameInput')
    const passwordInput = document.getElementById('passwordInput')
    const passwordReInput = document.getElementById('passwordReInput')
    if(dupButton.innerText !== '확인완료') {
        alert('ID 중복확인해주십시오.')
        usernameInput.focus()
        return false
    }
    if(!passwordInput.value) {
        alert('비밀번호를 입력해주세요.')
        passwordInput.focus()
        return false
    }
    if(!passwordReInput.value) {
        alert('비밀번호 확인칸을 입력해주세요.')
        passwordReInput.focus()
        return false
    }
    if(passwordInput.value !== passwordReInput.value) {
        alert('비밀번호가 틀립니다.')
        passwordReInput.focus()
        return false
    }
    return true
}

function loginCheck() {
    const usernameInput = document.getElementById('usernameInput')
    const passwordInput = document.getElementById('passwordInput')
    if(!usernameInput) {
        alert('username을 입력해주세요.')
        usernameInput.focus()
        return false
    }
    if(!passwordInput.value) {
        alert('비밀번호를 입력해주세요.')
        passwordInput.focus()
        return false
    }
    return true
}