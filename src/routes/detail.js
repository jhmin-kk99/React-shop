//Detail 안에 shoes라는 state 더 만들면 편할 듯?
//나중에 수정사항 생기면 곤란해짐

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style, { styled } from 'styled-components'
//이쁜 버튼만들고 싶으면? css 파일 가야함 -> js파일에서 전부해결가능
//스타일이 다른 js파일로 오염되지 않음
//다른 방법으로 App.css 대신에 App.module.css를 하면 App.js에 종속되는 css 파일이 됨
//페이지 로딩시간 단축

const YellowBtn = styled.button`
    background : ${ props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
    padding : 10px;
`;
//props를 통해 비슷하면 간단하게 바꿀 수 있음
//간단한 프로그래밍도 가능

//let NewBtn = styled.button(YellowBtn)``
//기존스타일 복사가능

//단점1. JS파일 매우 복잡해짐
//단점2, 중복스타일은 컴포넌트간 import 할텐데 CSS와 다를 바가 없음
//단점3, 협업시 CSS담당의 숙련도 이슈
//도입여부 잘 판단해야함


//컴포넌트의 Lifecycle
//페이지에 장착되기도 하고 (mount)
//가끔 업데이트도 되고 (update)
//필요없으면 제거되고 (unmount)

//옛날 컴포넌트 - 컴포넌트에 갈고리 다는 법

// class Detail2 extends React.Component{
//     componentDidMount(){
//         //컴포넌트 mount시 여기 코드 실행됨
//     }
//     componentDidUpdate(){
//         //컴포넌트 update시 여기 코드 실행됨
//     }
//     componentWillUnmount(){
//         //컴포넌트 unmount시 여기 코드 실행됨
//     }
// }

// 요즘 컴포넌트
// useEffect(()=>{
//     ~~~ MouseEvent, update시 여기 코드 실행됨
// })
//쓰는 이유 : html 랜더링이 다 되고 나서 실행이 됨
//js 는 위에서부터 읽기 때문에 복잡한연산이 위에 있으면 오래걸려서 다 하고 html이 
//나중에 보여짐
//useEffect 안에 넣으면, 로딩먼저 해서 html을 보여주고 안의 코드를 실행함
//오래걸리는거 안에 넣어서 로직짜는게 좋은 관습
//1. 어려운 연산, 2. 서버에서 데이터가져오는 작업, 3.타이머 장착하는거 등
//왜 이름이 Effect어쩌구인지 -> side Effect : 함수의 핵심기능과 상관없는 부가기능
//side effect코드들 보관함임 


//setTiemout() 내가 몇초 후에 이 코드를 실행하고 싶다
//setTimeout(()=>{실행할코드},1000) (밀리초)

let Box = styled.div`
    background : grey;
    padding : 20px;
`

function Detail(props){
    
    let [count, setCount] = useState(0);
    let {id} = useParams();
    let 찾은상품 = props.shoes.find(
        (x) => x.id==id
    )
    let [alert, setAlert] = useState(false);
    let [입력값, 입력값변경] = useState("");
    let [isNum, setIsNum] = useState(true);
    useEffect(()=>{
        //console.log('안녕')
        //원래 디버깅용으로 두번 실행됨, product에서는 한번 실행될 거임
        //싫으면 index.js에서 <React.StrictMode> 지우셈
        //update : 재렌더링이라 생각하면됨

        let a = setTimeout(()=>{
            setAlert(true);
        }, 2000)
        //useEffect 실행조건 넣을 수 있는 곳은 []
        //맨날 업데이트 될 때마다 실행되는게 아니라 조건에 따라 실행함
        //즉 마운트 될 때, []안의 state가 변할 때
        // 빈 [] 만 넣을 때 -> 마운트시에만 1회 실행됨
        console.log(2)
        return ()=>{
            console.log(1)
            clearTimeout(a)
        }
        //useEffect 동작 전에 실행되는 return()=>{}
        //(별명 : clean up function)
        //리액트 특성상 재렌더링이 많아, 타이머같은게 엄청많이 생길 수 있음
        //ex) 기존 타이머는 제거해주세요~ 이렇게할 수도 있음 (비효율방지)
        //타이머를 변수에 넣으면 장점 : 제거할 수 있음

        //만약에 서버로 데이터 요청하는 코드(2초소요) 이때, 2초 사이에 재렌더링 되어버리면?
        //버그가 생길 수 있음 .. 이럴 때, clean up function으로 기존 데이터 요청은
        //제거해달라고 적을 수도 있음 
        //clean up function은 mount시 실행안됨, unmount시 실행됨
    }, [count])

    // useEffect(()=>{}) 1. 재렌더링마다 코드실행하고 싶으면
    // useEffect(()=>{}, []) 2. mount시 1회 코드 실행하고 싶으면
    // useEffect(()=>{
    //     return ()=>{
    //         3. unmount시 1회 코드실행하고 싶으면
    //     }
    // })
    // 4. useEffect 실행 전에 뭔가 실행하려면 언제나 return()=>{}
    // 5. dependency 넣어주려면(특정 state 변경시에만 실행) []안에 state명

    useEffect(()=>{
        //isNaN() : Not a number
        isNaN(입력값) ? setIsNum(false) : setIsNum(true);
    },[입력값])

    return(
        <div className="container">
            
            {
                alert ? 
                null : <div className="alert alert-warning" >
                2초이내 구매시 할인
                </div>
            }
            
             {count}
             <button onClick={()=>{ setCount(count+1)} }>버튼</button>
                <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (찾은상품.id+1) +".jpg"} alt='#' width="100%" />
                </div>
                {
                    isNum ? null :  <div className="alert alert-warning" >
                    그러지마세요
                    </div>
                }
               
                <input type="text" style={{height : '40px', width : '500px'}} onChange={(e)=>{
                    입력값변경(e.target.value)
                }}/>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}



export default Detail;