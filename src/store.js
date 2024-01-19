import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
//useState 역할
// createSlice({
//     name : 'state이름~~',
//     initialState : '실제 값'
// })



//이런 것도 너무 길면 파일 분할 하면 됨.. import, export 

let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12],


})

let cart = createSlice({
    
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers : {
        changeCount(state, action){
            //console.log(action.payload)
            let 번호 = state.findIndex((a)=>{return a.id === action.payload})
            state[번호].count += 1
        },
        addCart(state, action){
            let dup = state.findIndex(i => i.id === action.payload.id)
            if(dup == -1){
                state.push({id : action.payload.id, name : action.payload.title, count : 1})
                //console.log("등록성공")
                //console.log(state)
            }else{
                //console.log("추가")
                state[dup].count += 1
                //console.log(state[dup])
            }
        },
        deleteItem(state, action){
            let dup = state.findIndex(i => i.id === action.payload)
            console.log(dup)
            state.splice(dup,1)
            
        }
    }
})

export let {changeCount, addCart, deleteItem} = cart.actions



export default configureStore({
    //(중요) 여기에 등록해야 사용가능
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer
    }
})