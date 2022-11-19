const $arrow = document.getElementById('arrow'),
$conteiner = document.getElementById('conteiner'),
viewArrowBlock = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
viewArrowNone = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
document.addEventListener('click', (e) => {
    if (e.target === $arrow) $conteiner.scrollTop = 0;
})
$conteiner.addEventListener('scroll', () => $conteiner.scrollTop > 500 ? $arrow.style.clipPath = viewArrowBlock : $arrow.style.clipPath = viewArrowNone);

export default './arrow.js'