import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName , changeAge} from '../store/userSlice.js';
import { changeCount, deleteItem} from '../store.js';
import { useState, memo } from 'react';


// function Child(){
//     return <div>자식임</div>
// }

let Child = memo(function(){
    return <div>자식임</div>
})
//꼭 필요할 때만 재렌더링 해주세요
//memo의 원리 : Child로 전송되는 props가 변할 때만 재렌더링해줌
//기존props == 신규props 계속 비교해볼듯 
//props가 길고 복잡하면 손해일 수도 ..
//꼭필요한 무거운 컴포넌트에 붙이셈 (참고로 알고있으셈)

// function 함수(){
//     return 반복문10억번돌린결과
// }


function Cart() {

    // let result = 함수(); //이렇게하면 카트가 재렌더링되면 매번 반복문을 10억번 돌림
    // useMemo(()=>{
    //     return 함수() //컴포넌트 렌더링시 1회만 실행해줌 
    // },[dependency])
    //useEffect랑 거의 똑같음 
    //useEffect는 랜더링이 다 끝나면 실행해주고
    //useMemo는 랜더링 될 때 실행해줌 실행시점의 차이

    //Redux store 가져와줌               state.user 이렇게 쓸 수도 있음
    //중괄호와 return은 한번에 없앨 수 있음
    //모든 state들을 보관할 필요 없음 공유필요없으면 굳이 넣을필요없음
    let state = useSelector((state) => state)
    //console.log(state.stock)

    let dispatch = useDispatch()
    //store.js에 요청을 보내주는 함수


    // 장바구니 데이터를 state에 보관해두고 데이터바인딩 하고 싶음
    // Q. 장바구니 state가 App, Detail, Cart에 필요하면 어디 만들어야함?
    // 최상위 App에 만들어야함 .. props전송하기 귀찮음
    // Redux 사용하면 컴포넌트들이 props 없이 state 공유가능
    // Redux 설치하면, js파일 하나에 다 state를 넣을 수 있음 
    // package.json에서 react, react dom이 18.1버전 이상이어야 함
    // npm install @reduxjs/toolkit react-redux
    // 셋팅1. store.js 파일 생성
    // 셋팅2. index.js 가서 <Provider store={store}> 쓰기
    
    let [count,setcount] = useState(0)
    return (
        <div>

        <Child></Child>
        <button onClick={()=>{
            setcount(count+1)
        }}>+</button>
        {/* 버튼 누르면 재렌더링 될듯 
        자식 컴포넌트들도 다 재렌더링될듯 ..
        Child가 렌더링시간 오래걸리는 친구라면?
        Child를 꼭 필요할 때만 재렌더링 해라.. memo*/}

            {state.user.name} {state.user.age}의 장바구니
            <button onClick={()=>{
                dispatch(changeAge(5))
            }}>버튼</button>

            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>상품명</th>
                        <th>개수</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map(function (a, i) {
                            return (
                                <tr key={i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td>
                                        <button onClick={()=>{
                                            dispatch(changeCount(state.cart[i].id))
                                            //changeCount실행해달라고 store.js에 부탁
                                        }}>+</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>{
                                            dispatch(deleteItem(state.cart[i].id))
                                        }}>x</button>
                                    </td>
                                </tr>
                            )
                        })

                    }
                    {/* <tr>
                        <td>{state.cart[0].id}</td>
                        <td>{state.cart[0].name}</td>
                        <td>{state.cart[0].count}</td>

                    </tr>
                    <tr>
                        <td>{state.cart[1].id}</td>
                        <td>{state.cart[1].name}</td>
                        <td>{state.cart[1].count}</td>
                    </tr> */}

                </tbody>
            </Table>

        </div>
    );
}

export default Cart; 