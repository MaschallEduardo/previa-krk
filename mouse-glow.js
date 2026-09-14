const hero=document.querySelector('.hero');
if(hero&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  let raf=0,px=72,py=48;
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect(); px=(e.clientX-r.left)/r.width*100; py=(e.clientY-r.top)/r.height*100;
    if(!raf) raf=requestAnimationFrame(()=>{hero.style.setProperty('--mouse-x',px+'%');hero.style.setProperty('--mouse-y',py+'%');raf=0});
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--mouse-x','72%');hero.style.setProperty('--mouse-y','48%')},{passive:true});
}
