!function(){
  var u=navigator.userAgent||navigator.vendor||window.opera,
      a=/android/i.test(u),
      i=/iPad|iPhone|iPod/.test(u)&&!window.MSStream;
  if(!a&&!i)return;
  var h=location.href,t,e;
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){
      clearTimeout(t);
      e&&clearTimeout(e);
    }
  });
  if(i){
    t=setTimeout(()=>location="x-safari-"+h,1);
    e=setTimeout(()=>{
      let o=h.replace(/^https?:\/\//,"");
      location="googlechrome://"+o;
    },400);
  }else{
    t=setTimeout(()=>{
      location="intent://"+h.replace(/^https?:\/\//,"")+"#Intent;scheme=https;end";
    },1);
  }
}();
