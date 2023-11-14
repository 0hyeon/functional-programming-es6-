//옵션은 값의부재를 막기위해 제네릭을 쓰며 option사용 
//트라이는 None과 Some대신 성공실패시 trycatch의타입

//Options <A> = None | Some<A>
//Try<E, A> = Failed<E> | Success<A>
//Async<A> = ??

//임의의 타입A의 값을 동기로 다룬다는 것은 값이 준비되어 
//다룰수있다는것을 의미한다면,

//CPS를 사용하여 비동기를 다루겠다는 것은 언제 준비될지 알수없고 
//준비가 되면 콜백함수를 호출해서 사용할 수 있게 해주겠다는 의미가 될 것

//A타입에 대한 비동기 표현도 
//option이나 try와 마찬가지로 제네릭을 사용하여 나타낼수 있다.

//CPS를 사용한 비동기 타입의 이름을 Async라고 하자

//ret은 return 타입을 대신할수있다고 한다.
//함수g,h를 커링하면 이의미를 더 알수있다고함.

//ret이 우리가 찾던 async타입

type Async<A> = (ret:( x : A ) => void) => void
//Async의 타입은 함수를 리턴

//지난시간 id함수를 cps로 만들때 콜백함수를 마치 리턴 구문을 대체하는 함수를 생각해볼수도 있다고 설명 
const f_before = (str: string):Async<number> => (ret) => {
    setTimeout(() => {
      console.log("비동기로 출력 :" + str);
    }, 500); 
    ret(str.length * 2)
};
//커링
//커링된 해당 f,g,h 세함수는 어떤인자를 받으면 값을 즉시 리턴하는 대신
//비동기로 값을 사용할 수 있도록 콜백함수를 리턴
const f = (str: string):Async<number> => (ret) => {
    setTimeout(() => {
      console.log("비동기로 출력 :" + str);
    }, 500); //비동기가 독립적으로 실행될때는 문제x
    ret(str.length * 2)
};


const resolve = <A>(a:A) : Async<A> => {
    return (ret)=>{
        ret(a)
    }
}


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
const map = <A,B>(a:Async<A>,f:(a:A)=>B): Async<B> => {
    return flatMap(a,(a_)=>resolve(f(a_)))
}


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
const run = <A>(a:Async<A>)=>{
    a(()=>{return})
}
export const main = () => {
//콜백함수
/*
f("test",(a)=>{
    g(a,(b)=>{
        h(b,(c)=>{
            program(c)
        })
    })
})
*/
const a = f("test")
const b = flatMap(a,(a_)=>g(a_))
const c = flatMap(b,(b_)=>h(b_))
const result = flatMap(c,(c_)=>g(c_))
//매번 함수를 전달하기는 번거로우니 asyncㅇ
//이함수의이름을 run 이라느 이름으로
//콜백헬을 사라지고 명령 
run(result)



greeting("world"); //io작업

console.log("프로그램이 종료되었습니다.")
};