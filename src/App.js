import { useEffect, useState } from 'react';
import './App.css';
import {Container, Nav, Navbar, Col, Row} from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './routes/detail.js';
import axios from 'axios';

function App() {


  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  //1. 페이지 이동도와주는 useNavigate()

  let [count,setCount] = useState(2)
  let [loading,setLoading] = useState(false)
  const max = 4
  return (
    <div className="App">


      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{
              navigate('/')
            }}>홈</Nav.Link>
            <Nav.Link onClick={()=>{
              navigate('/detail')
            }}>상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    {/* 페이지 이동버튼은 <Link> -> 꼴보기 싫음 , useNavigate() 
    let navigate = useNavigate() , navigate(1) : 앞으로 한 페이지 이동해주세요
    navigate(-1) : 뒤로 한 페이지 이동해주세요 */}

    {/* Route : 페이지라고 생각하면 됨 */}
      <Routes> 
        <Route path="/" element={
          <>
          <div className="main-bg" src></div>
          <Container>
          <button onClick={()=>{
            let copy = [...shoes]
            copy.sort((a,b)=>
              a.title.localeCompare(b.title)
            );
            setShoes(copy);
          }}>정렬하기</button>

            <Row>
            {
                shoes.map(function(a,i){
                return(  
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
                count<max ? <Btn count={count} setCount={setCount} 
                shoes={shoes} setShoes={setShoes} setLoading={setLoading} />:null
              }
              

          </Container>
          </>
          
        }></Route>
        <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>
        {/* 페이지 여러개 만들고 싶으면 : URL */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치정보임</div>}/>
        </Route> {/* 장점 : nested route 접속시엔 element 2개나 보임 ,
          내부 어디에 보여줄지 작성해야함*/}
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>

        <Route path="*" element={<div>404 없는 페이지</div>}/>
        
        {/* Nested Routes 
        - 여러 페이지 필요할 때
        - 여러 유사한 페이지 필요할 때
        */}
      </Routes>
    
    </div>
  );
}

function Card(props) {
  let id = props.id;
  let 찾은상품 = props.shoes.find(
    (x) => x.id==id
  )
  return(
    
    <Col onClick={()=>{
      props.navigate("/detail/"+props.id)
    }}>
        
        <img src= {"https://codingapple1.github.io/shop/shoes" + (props.id+1) + ".jpg"} alt='#' width="100%"></img>
        <h4>{찾은상품.title}</h4>
        <p>{찾은상품.price}</p>
    </Col>
    

  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
      {/* nested route를 어디에 보여줄지 */}
    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Btn(props){
  return(
<button onClick={()=>{
              props.setLoading(true)
              axios.get('https://codingapple1.github.io/shop/data'+props.count+'.json')
              .then((결과)=>{ 
                let copy = [...props.shoes, ...결과.data];
                // (결과.data).map(function(a,i){
                //   copy.push(a);
                // })
                props.setShoes(copy);
                props.setCount(props.count+1)
                //setCount가 비동기로 이루어져 좀 느림 , Batch작업을 해서 업데이트하기 때문
                props.setLoading(false)
              })
              .catch(()=>{
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
