const limits = document.querySelectorAll('#click'),
    hiddenLimit = document.getElementById('hiddenLimit'),
    hiddenMode = document.getElementById('hiddenMode'),
    hiddenOrder = document.getElementById('hiddenOrder'),
    selectMode = document.getElementById('selectMode'),
    hiddenOffset = document.getElementById('hiddenOffset'),
    pag = document.querySelectorAll('#pag'),
    form = document.getElementById('createForm')

document.addEventListener('click', (e) => {
    if(e.target.id === 'click') {
        hiddenLimit.value = e.target.textContent
        form.submit()
    }
    if(e.target.id === 'pag') {
        hiddenOffset.value = e.target.value 
        form.submit()
    }
})

document.addEventListener('change', (e) => {

    if(e.target.id === 'selectMode') {
        location.href = e.target.value

    } 
    
    if (e.target.id === 'selectOrder') {
        hiddenOrder.value = e.target.value
        form.submit()
    }
    
        
    
    
})
