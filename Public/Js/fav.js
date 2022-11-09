let $TEMPLATE = document.getElementById('template').content,
    $BACK = document.getElementById('backPoke'),
    $FRAGMENT = document.createDocumentFragment(),
    $fava = document.getElementById('LinkFav'),
    $icon = document.getElementById('iconFav')


const fav = () => {

    $BACK.innerHTML = ""
    let test = localStorage.getItem('fav')
    test = JSON.parse(test)
    test.forEach(element => {
        $TEMPLATE.getElementById('namePoke').textContent = `${element.name}/N°${element.id}`
        $TEMPLATE.getElementById('imgPoke').src = element.img
        $TEMPLATE.getElementById('imgPoke').alt = element.name
        $TEMPLATE.getElementById('linkPoke').href = `/pokemon/${element.name}`
        let clone = document.importNode($TEMPLATE, true)
        $FRAGMENT.appendChild(clone)
    });
    $BACK.appendChild($FRAGMENT)
}
fav()
if(location.pathname === '/Fav') {
    $fava.href = '/Pokedex'
    $icon.src = '/Public/Assets/iconHome.png'
}

document.addEventListener('click', (e)=> {
    if(e.target.id === $icon.id) {
        
        let cut = e.target.previousSibling.textContent.split('/')
        let poke = JSON.parse(localStorage.getItem('fav'));
        if (poke.filter(element => element.name === cut[0] ).length > 0) poke = poke.filter(element => element.name !== cut[0]) 
        poke = JSON.stringify(poke)
        localStorage.setItem('fav', poke )
        fav()
    }
})

