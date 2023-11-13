//값의부재를 막기위해 option사용
//Options <A> = None | Some<A>

//trycatch의타입
//Try<E, A> = Failed<E> | Success<A>


//ret은 return 타입을 대신할수있다고 한다.
//함수g,h를 커링하면 이의미를 더 알수있다고함.

//ret이 우리가 찾던 async타입

type Async<A> = (ret:( x : A ) => void) => void
//Async의 타입은 함수를 리턴

//타입을 계속사용하기위해 falstMap필요 
const flatMap = <A,B>(a:Async<A>,f:(a:A)=>Async<B>):Async<B> => {
    //Async<B>타입에 맞춰서 ret함수를 인자로받는 함수를 리턴하도록 코드를 추가
    return (ret)=>{
        a((a_) => {
           const b = f(a_)
           b((b_)=> ret(b_)) 
        })
    };
}

const f = (str: string):Async<number> => (ret) => {
    setTimeout(() => {
      console.log("비동기로 출력 :" + str);
    }, 500); //비동기가 독립적으로 실행될때는 문제x
    ret(str.length * 2)
};
const g = (n: number):Async<number> => (ret) => {
setTimeout(() => {
    console.log("g 호출", + n)  
    ret(n + 1)
},500)
};
const h = (x: number ):Async<boolean> => (ret) => {
setTimeout(()=>{
    console.log("n 호출", + x)  
    ret(x % 3 === 0)
},500)
};

const greeting = (name: string) => {
console.log("Hello, " + name);
};
const program = (s:boolean) => {
console.log(s);
}
export const main = () => {
f("test",(a)=>{
    g(a,(b)=>{
    h(b,(c)=>{
        program(c)
    })

    })
})
greeting("world"); //io작업
console.log("프로그램이 종료되었습니다.")
};