import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom'

function Cache() {
let watched = localStorage.getItem('watched')
let k = JSON.parse(watched)
let navigate = useNavigate();

//console.log(k[0])
    return (
        
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                {
                    k === null ? null :
                    k.map(function (a, i) {
                        //console.log(i)
                        console.log(k[i].id)
                        console.log(k[i].name)
                        return (
                            <tr>
                                <td>{k[i].id}</td>
                                <td onClick={()=>{
                                    {
                                        navigate("/detail/"+k[i].id)
                                    }
                                }}>{k[i].name}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table>
        
    );
}

export default Cache
