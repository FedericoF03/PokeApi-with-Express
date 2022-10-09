const $TEMPLATECONTENT = document.getElementById('template').content;
    $DOCUMENTFRAGMENT = document.createDocumentFragment();

const getAllPoke = async () => {
    let data = await fetch('http://localhost:3000/getPokes')
    let res = await data.json()
    console.log(res)
}

getAllPoke()