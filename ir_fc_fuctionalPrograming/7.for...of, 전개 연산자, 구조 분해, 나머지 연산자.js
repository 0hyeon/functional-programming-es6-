  function *infinity(i = 0) {
    //무한히생성됨
    while (true) yield i++;
  }
  
  function *limit(l, iter) {
    for ( const a of iter) {
      yield a;
      if (a == l) return;
    }
  }
  function *odds(l) {
    for (const a of limit(l, infinity(1))) {
      //compared  for (i of infinity(1)) {
      if (a % 2) yield a;
    }
  }
  console.log(...odds(10));//전개 연산자 
  console.log([...odds(10),...odds(20)]);//구조분해

  const [ a ,b , ...rest] = odds(10);
  console.log(a);
  console.log(b);
  console.log(rest);