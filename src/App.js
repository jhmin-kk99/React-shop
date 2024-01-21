import { createContext, useEffect, useState, lazy, Suspense, useTransition } from 'react';
import './App.css';
import { Container, Nav, Navbar, Col, Row } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
//import Detail from './routes/detail.js';
//import Cart from './routes/Cart.js';
//이런 것들은 메인페이지에서 로딩할 필요 없음 -> lazy import를 쓰자
import axios from 'axios';
import Cache from './routes/Cache.js';
import { useQuery } from '@tanstack/react-query';
//single page application 단점 : 컴포넌트간 state 공유 어려움
//사이트 발행할 때도 별도의 js 파일로 분리됨 

//context를 만들어줌 (state 보관함)
//셋팅1. context 만들기
//셋팅2. <Context>로 원하는 컴포넌트 감싸기
export let Context1 = createContext()

const Detail = lazy(() => import('./routes/detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'))
//단점 : Cart,Detail 컴포넌트 로딩시간 발생

function App() {

  // ajax 요청하다보면 이런 기능들이 가끔 필요해집니다. 
  // - 몇초마다 자동으로 데이터 다시 가져오게 하려면?
  // - 요청실패시 몇초 간격으로 재시도?
  // - 다음 페이지 미리가져오기?
  // - ajax 성공/실패시 각각 다른 html을 보여주려면?



  // 직접 개발해도 되겠지만 귀찮으면 react-query 라는 라이브러리 설치해서 써도 됩니다.
  // SNS, 코인거래소같은 실시간 데이터를 보여줘야하는 사이트들이 쓰면 유용하고
  // 나머지 사이트들은 딱히 쓸데는 없습니다.


  let [name, setName] = useState('')
  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])

  useEffect(() => {
    let a = localStorage.getItem('watched')
    if (a === null)
      localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  //localstorage .. 1. key:value 형태로 저장가능
  //2. 최대 5MB까지 문자만 저장가능
  //3. 사이트 재접속해도 남아있음 (브라우저 청소하면 삭제됨)
  //(서버, db가 없으면 임시로 저장할 수 있음)
  //array/object  저장하려면.. JSON으로 바꾸면 됨
  //sessionstorage : 브라우저끄면 날아감. 
  //let obj = {name : 'kim'}
  //localStorage.setItem('data', JSON.stringify(obj))
  //let 꺼낸거 = localStorage.getItem('data')
  //JSON형태

  //JSON.parse(꺼낸거) .. JSON->array/object 변환


  let navigate = useNavigate();
  //1. 페이지 이동도와주는 useNavigate()

  let [count, setCount] = useState(2)
  let [loading, setLoading] = useState(false)
  const max = 4


  // axios.get('https://codingapple1.github.io/userdata.json')
  // .then((a)=>{
  //   a.data
  // })

  let result = useQuery(['작명'], () => {
    return axios.get('https://codingapple1.github.io/userdata.json')
      .then((a) => {
        return a.data
      })
    //{staleTime : 2000} //2초안에는 refetch 안함~
    //refetch 끌수도있음
  })
  //장점1. 성공/실패/로딩중 쉽게 파악가능
  // result.data
  // result.isLoading
  // result.error
  // Q. 로딩중일 때 '로딩중입니다' 보여주고 싶으면?
  // kim 자리에 { result.isLoading ? '로딩중' : result.data.name }
  //장점2. 틈만나면 자동으로 재요청해줌 (refetch)
  //장점3. 실패시 retry 알아서 해줌
  //장점4. state 공유 안해도됨 -> ajax요청해서 데이터 가져오는 코드 여러번써도됨
  //비효율적이지않나? react query는 똑똑해서 똑같은 곳으로 두번 요청하지 않음
  //장점5. ajax결과 캐싱가능(5분동안)
  //(12:10분, 12:13분 두번 GET요청 -> 12시10분결과를 우선 보여주고 GET요청함)

  //redux-toolkit 설치하면 RTK Query도 자동설치됨 -> react query와 유사 
  //react query 가 더 쉬움

  return (
    <div className="App">


      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {
              navigate('/')
            }}>home</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/cart')
            }}>cart</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/cache')
            }}>최근본상품</Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{ color: "white" }}>
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      {/* 페이지 이동버튼은 <Link> -> 꼴보기 싫음 , useNavigate() 
    let navigate = useNavigate() , navigate(1) : 앞으로 한 페이지 이동해주세요
    navigate(-1) : 뒤로 한 페이지 이동해주세요 */}

      {/* Route : 페이지라고 생각하면 됨 */}
      {/* 그냥 Suspense로 <Routes>전체 감싸도 될듯 */}
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" src></div>
            <Container>
              <button onClick={() => {
                let copy = [...shoes]
                copy.sort((a, b) =>
                  a.title.localeCompare(b.title)
                );
                setShoes(copy);
              }}>정렬하기</button>

              <Row>
                {
                  shoes.map(function (a, i) {
                    return (
                      <Card shoes={shoes} id={shoes[i].id} navigate={navigate} key={i}></Card>
                    )
                  })
                }
              </Row> {/* ajax쓰려면 옵션 3개 중 택1
              1. XMLHttpRequest, 2. fetch(), 3. axios 같은거
              */}

              {
                loading ? <div>loading</div> : null
              }
              {
                count < max ? <Btn count={count} setCount={setCount}
                  shoes={shoes} setShoes={setShoes} setLoading={setLoading} /> : null
              }


            </Container>
          </>

        }></Route>
        <Route path="/detail/:id" element={
          <Suspense fallback={<div>로딩중</div>}>
            <Context1.Provider value={{ 재고 }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          </Suspense>
        } />
        {/* 페이지 여러개 만들고 싶으면 : URL */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route> {/* 장점 : nested route 접속시엔 element 2개나 보임 ,
          내부 어디에 보여줄지 작성해야함*/}
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>

        <Route path="*" element={<div>404 없는 페이지</div>} />

        {/* Nested Routes 
        - 여러 페이지 필요할 때
        - 여러 유사한 페이지 필요할 때
        */}
        <Route path="/cart" element={
          <Suspense fallback={<div>로딩중</div>}>
            <Cart />
          </Suspense>
          //<Suspense>로 감싸면 로딩중 UI 넣기 가능
        }></Route>
        <Route path="/cache" element={<Cache />}></Route>
      </Routes>


      {/* 
      // 1.batch기능 
// state1변경()
// state2변경()
// state3변경() <- 여기서만 재렌더링 1회
//(리액트17) ajax, setTimeout 내부라면 
// batching이 일어나지 않음
// 리액트 18이후 , batching 일어남


// 2.useTransition으로 느린 컴포넌트 성능향상가능
// 카드 빚 돌려막기 식으로 동작함 */}
      <div className='App'>
        <input onChange={(e) => { setName(e.target.value) }}></input>

        {/* {
          let a = new Array(10000).fill(0)

          function App() { ...
          let [name, setName] = useState('')
          ??.map(()=>{
            <div>{name}</div>
          })
          10000번 작동한다고 가정 -> 성능저하 
          //타이핑하면 name이 변경되고, name 변경되면 이것도 렌더링해야함

          솔루션1. html 10000개 지우쇼
          let [isPending, startTransition] = useTransition()
          startTransition으로 문제의 state변경 감싸기

          <startTransition(()=>{
            input의 setName(e.target.value)
          })
          동작원리 - 브라우저는 동시작업을 못함. single threaded
          브라우저가 할 일 : 
          1. a를 input에 보여주기
          2. div 10000개 만들기
          startTransition으로 감싸면, 감싼 것의 코드시작을 뒤로 늦춰줌

          isPending은 startTransition이 처리중일 때 true로 변함

          isPending ? '로딩중' : 
          ???.map(()=> ~~)

          3. useDeferredValue 써도 느린 컴포넌트 성능향상가능
          let state = useDeferredValue(name)
          여기에 넣은 state는 변동사항이 생기면 늦게처리해줌

        } */}

      </div>
      {/* 타이핑을 할때마다 state가 바뀜 */}

    </div>
  );
}

function Card(props) {
  let id = props.id;
  let 찾은상품 = props.shoes.find(
    (x) => x.id == id
  )

  return (

    <Col onClick={() => {
      props.navigate("/detail/" + props.id)

      let a = localStorage.getItem('watched')
      //console.log(a)
      let b = JSON.parse(a)
      b.push({ id: props.id, name: 찾은상품.title, url: "/detail/" + props.id })
      //중복제거
      let uniqueWatched = Array.from(new Set(b.map(JSON.stringify)), JSON.parse)
      console.log(uniqueWatched)

      //Set은 기본적으로 값의 유일성을 검사하기 위해 "일치" 연산자(===)를 사용합니다. 
      //그러나 객체는 참조에 의해 비교되기 때문에, 객체의 속성이 같더라도 참조가 다르면 
      //Set에서는 중복으로 취급됩니다.

      // 따라서 { id: 1, name: "Red Knit", url: "/detail/1" } 객체는 두 번 포함되지만,
      // 객체의 참조가 다르기 때문에 Set에서는 중복이 아니라고 간주됩니다.

      // 중복된 객체를 제거하려면 다른 방법을 사용해야 합니다.예를 들면, 객체의 특정 속성을 기준으로 중복을 
      // 제거하고 싶다면 다음과 같이 할 수 있습니다:

      // 이 코드에서는 JSON.stringify를 사용하여 각 객체를 문자열로 변환한 후 Set을 이용하여 
      // 중복을 제거하고, 마지막으로 JSON.parse를 사용하여 다시 객체로 변환합니다. 이 방법은 객체의 
      // 속성 값이 동일한 경우 중복을 제거할 수 있습니다.


      localStorage.setItem('watched', JSON.stringify(uniqueWatched))
      //let copy = []
      //copy.unshift({id : props.id , name : 찾은상품.title , url : "/detail/"+props.id})
      //setCa(copy)
      //console.log(ca)
      //console.log(copy)
      // localStorage.setItem('data',JSON.stringify(ca))
    }}>

      <img src={"https://codingapple1.github.io/shop/shoes" + (props.id + 1) + ".jpg"} alt='#' width="100%"></img>
      <h4>{찾은상품.title}</h4>
      <p>{찾은상품.price}</p>
    </Col>


  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
      {/* nested route를 어디에 보여줄지 */}
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Btn(props) {
  return (
    <button onClick={() => {
      props.setLoading(true)
      axios.get('https://codingapple1.github.io/shop/data' + props.count + '.json')
        .then((결과) => {
          let copy = [...props.shoes, ...결과.data];
          // (결과.data).map(function(a,i){
          //   copy.push(a);
          // })
          props.setShoes(copy);
          props.setCount(props.count + 1)
          //setCount가 비동기로 이루어져 좀 느림 , Batch작업을 해서 업데이트하기 때문
          props.setLoading(false)
        })
        .catch(() => {
          console.log('실패함 ㅅㄱ')
          props.setLoading(false)
        })
      //ajax 요청 실패할 경우 (예외처리)

      //axios.post('/~~', {name : 'kim'}) 

      //동시에 ajax 요청 여러개 하려면
      // Promise.all([ axios.get('/url1'), axios.get('/url2')])
      // .then(()=>{

      // })
      //원래는 서버와 문자만 주고받을 수 있음
      //따옴표 쳐놓으면 array, object도 주고받기 가능
      //{"name" : "kim"} : JSON

      //fetch('https:~~)
      //로 받아오는 경우에, .then(결과=>결과.json()).then(data=>{})
      //추가해야함.. JSON->array/object 변환과정 필요함
      //axios가 편리하긴함

    }}>더보기</button>




  )
}

//페이지 나누는 법 (리액트 미사용)
//html파일 만들어서 상세페이지내용 채움
//누가 /detail로 접속하면 html파일 보내줌

//페이지 나누는 법 (리액트 사용)
//index.html만 사용
//1. 컴포넌트 만들어서 상세페이지내용 채움
//2. 누가 /detail 접속하면 그 컴포넌트 보여줌
//react-router-dom 라이브러리 쓰면 쉽게 만들 수 있음
//외부라이브러리는 필요할 때 검색해서 씀

//페이지도 컴포넌트로 만들면 좋음






export default App;
