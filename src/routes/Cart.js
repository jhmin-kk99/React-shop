import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName , changeAge} from '../store/userSlice.js';
import { changeCount, deleteItem} from '../store.js';

function Cart() {

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
    return (
        <div>

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