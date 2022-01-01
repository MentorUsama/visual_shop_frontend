function diff_minutes(t2, t1) 
 {

  var diff =(t2 - t1) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }
 function ValidateEmail(mail) 
 {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
   {
     return (true)
   }
    return (false)
 }
export {diff_minutes,ValidateEmail}