const $ARROW = document.getElementById('arrow'),
$CONT = document.getElementById('conteiner')
document.addEventListener('click', (e) => {
    if (e.target === $ARROW) $CONT.scrollTop = 0;
})
$CONT.addEventListener('scroll', () => $CONT.scrollTop > 500 ? $ARROW.style.display = 'block' : $ARROW.style.display = 'none');

export default './arrow.js'