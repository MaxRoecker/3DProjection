var j = 0;
lacoExterno:
for(var i = 0; i < 100; i += 10){
  j = 0;
  while(true){
    if(j < 10){
      console.log(j+i);
      j++;
    }else {
      continue lacoExterno;
    }
  }
}
