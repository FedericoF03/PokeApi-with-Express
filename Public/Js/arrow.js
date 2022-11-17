const $ARROW = document.getElementById('arrow'),
$CONT = document.getElementById('conteiner')
document.addEventListener('click', (e) => {
    if (e.target === $ARROW) $CONT.scrollTop = 0;
})
$CONT.addEventListener('scroll', () => $CONT.scrollTop > 500 ? $ARROW.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : $ARROW.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)');

export default './arrow.js'