import {createSlice} from '@reduxjs/toolkit'


let user = createSlice({
    name: 'user',
    initialState: {name : 'kim', age : 20},
    reducers : {
        changeName(state){
            //return 'john '+state
            //state : 기존 state

            //array, object인 경우
            state.name = 'park'
            // 직접 수정해도 state변경됨 Immer.js덕분에
            // 그래서 문자하나만 필요해도 일부러 {} 안에 담기도 함
        },
        changeAge(state, action){ //파라미터 a .. changeAge(??)로 쓰면 됨
            //비슷한 함수 여러개 필요 없음
            state.age += action.payload
        },
    }
})
//Redux의 state 변경하는 법
//-state 수정해주는 함수 만들고 , export , 만든 함수 import해서 사용
//-원할 때 그 함수 실행해달라고 store.js에 요청
export let { changeName , changeAge} = user.actions 
//user.actions : state 변경함수들 남음 

export default user