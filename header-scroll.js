const header=document.querySelector('.site-header');
if(header){const update=()=>header.classList.toggle('scrolled',window.scrollY>24);addEventListener('scroll',update,{passive:true});update()}
