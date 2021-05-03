import react, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb } from 'react-bootstrap';
import './style.css';

function Interests(){

    let history = useHistory();
    const interestUrl = `https://localhost:44392/api/Properties/1/Interest_Reg`
    const [interest_reg, setInterest_Reg] = useState([]);
    console.log(interest_reg);

    useEffect(() => {
        console.log("nånting");
        if(interest_reg.length === 0) {
            fetch(interestUrl).then(res => res.json().then(data => setInterest_Reg(data)))
        }
    },[])
    console.log(interest_reg);
    function GoBack() {
        history.push(`/`);
    }

    return (
        <>
            <h1 className="rubrik">Intresseanmälningar</h1>
            <table>
            <div className="head">
                <th>
                    Förnamn
                </th>
                <th>
                    Efternamn
                </th>
                <th>
                    Email
                </th>
                <th>
                    Telefonnummer
                </th>
            </div>
            <div>
            {interest_reg.map( item => (
                <div>
                <td>
                    {item.Fname}
                </td>
                <td>
                    {item.Lname}
                </td>
                <td>
                    {item.accountEmail}
                </td>
                <td>
                    {item.number}
                </td>
                <td>
                    <Breadcrumb className="knappar">
                    <Breadcrumb.Item onClick={()=>GoBack()}>Gå tillbaka</Breadcrumb.Item>
                    </Breadcrumb>
                </td>
                </div>
            ))}
            </div>
            </table>
        </>
    )}

export default Interests;