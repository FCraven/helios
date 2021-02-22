window.onload =()=> {

    const testHeader = document.createElement('h1')
    const root = document.getElementById('root')

    testHeader.textContent = ' Hello World '
    testHeader.classList.add('test-header')
    root.appendChild(testHeader)
}
