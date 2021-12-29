function diff_minutes(t2, t1) 
 {

  var diff =(t2 - t1) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }

export {diff_minutes}