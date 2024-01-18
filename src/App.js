import { useState } from 'react';
import './App.css';
import {Container, Nav, Navbar, Col, Row} from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './routes/detail.js';


function App() {


  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  //1. 페이지 이동도와주는 useNavigate()

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
            copy.sort((a,b)=>{
              if(a.title > b.title) return 1;
              if(a.title < b.title) return -1;
              return 0;
            })
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
            </Row>
          </Container>
          </>
          
        }></Route>
        <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>
        {/* 페이지 여러개 만들고 싶으면 : URL */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치정보임</div>}/>
          {/* 장점 : nested route 접속시엔 element 2개나 보임 ,
          내부 어디에 보여줄지 작성해야함*/}
        </Route>
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
  return(
    
    <Col onClick={()=>{
      props.navigate("/detail/"+props.id)
    }}>
        <img src= {"https://codingapple1.github.io/shop/shoes" + (props.id+1) + ".jpg"} alt='#' width="80%"></img>
        <h4>{props.shoes[props.id].title}</h4>
        <p>{props.shoes[props.id].price}</p>
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
