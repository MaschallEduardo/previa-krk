const headerEl=document.querySelector('.site-header');
if(headerEl){
  const lightNames=new Set(['problem','growth','metodo','faq']);
  let frame=0;
  const updateHeaderTheme=()=>{
    frame=0;
    const headerBottom=headerEl.getBoundingClientRect().bottom;
    const probeY=Math.min(innerHeight-20,headerBottom+24);
    const section=[...document.querySelectorAll('main section')].find((el)=>{
      const r=el.getBoundingClientRect();
      return r.top<=probeY && r.bottom>probeY;
    });
    if(section) headerEl.classList.toggle('light',lightNames.has(section.id||section.className.split(' ')[0]));
  };
  addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(updateHeaderTheme)},{passive:true});
  addEventListener('resize',updateHeaderTheme,{passive:true});
  updateHeaderTheme();
}
