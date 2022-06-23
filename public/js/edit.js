const preshowbtn = document.getElementById('preshow')

function prepareDiv() {
    document.getElementById("create").value = document.getElementById("create_div").innerText
}

function make_editor() {
    $('#create_div').removeClass('hidden')
    $('#show_div').addClass('hidden')
}

function pre_show() {
    const body = document.getElementById("create_div").innerText
    document.getElementById("show_div").innerHTML = marked.parse(body)
    $('#create_div').addClass('hidden')
    $('#show_div').removeClass('hidden')
}

function textBold() {
    var sel = window.getSelection()
    var range = sel.getRangeAt(0)
    var insertNode = document.createElement('span')
    var inputNode = document.createElement('span')

    insertNode.innerHTML = '**'
    inputNode.innerHTML = '**'

    range.insertNode(insertNode);
    range.setStartAfter(insertNode)
    
    document.getElementById("create_div").focus();
    range.insertNode(inputNode)
    sel = window.getSelection()
    range.setStartBefore(inputNode)
    sel.collapseToStart()
}
function textItalic() {
    var sel = window.getSelection()
    var range = sel.getRangeAt(0)
    var insertNode = document.createElement('span')
    var inputNode = document.createElement('span')

    insertNode.innerHTML = '*'
    inputNode.innerHTML = '*'

    range.insertNode(insertNode);
    range.setStartAfter(insertNode)
    
    document.getElementById("create_div").focus();
    range.insertNode(inputNode)
    sel = window.getSelection()
    range.setStartBefore(inputNode)
    sel.collapseToStart()
}

function textLineThrough() {
    var sel = window.getSelection()
    var range = sel.getRangeAt(0)
    var insertNode = document.createElement('span')
    var inputNode = document.createElement('span')

    insertNode.innerHTML = '~~'
    inputNode.innerHTML = '~~'

    range.insertNode(insertNode);
    range.setStartAfter(insertNode)
    
    document.getElementById("create_div").focus();
    range.insertNode(inputNode)
    sel = window.getSelection()
    range.setStartBefore(inputNode)
    sel.collapseToStart()
}

function textLink() {
    var sel = window.getSelection()
    var range = sel.getRangeAt(0)
    var insertNode = document.createElement('span')
    var inputNode = document.createElement('span')

    insertNode.innerHTML = '['
    inputNode.innerHTML = ']()'

    range.insertNode(insertNode);
    range.setStartAfter(insertNode)
    
    document.getElementById("create_div").focus();
    range.insertNode(inputNode)
    sel = window.getSelection()
    range.setStartBefore(inputNode)
    sel.collapseToStart()
}

function fileLink() {
    var sel = window.getSelection()
    var range = sel.getRangeAt(0)
    var insertNode = document.createElement('span')
    var inputNode = document.createElement('span')

    insertNode.innerHTML = '!['
    inputNode.innerHTML = ']()'

    range.insertNode(insertNode);
    range.setStartAfter(insertNode)
    
    document.getElementById("create_div").focus();
    range.insertNode(inputNode)
    sel = window.getSelection()
    range.setStartBefore(inputNode)
    sel.collapseToStart()
}