import {useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './style.css';
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

function UpdateProperties(){

    const{id} = useParams(); 

    const [address, setAdress] = useState('');
    const [ByggnadsÅr, setByggnadsÅr] = useState();
    const [AntalRum, setRum] = useState();
    const [BoArea, setboArea] = useState('');
    const [HusTyp, sethustyp] = useState('');
    const [TomtArea, setTomtArea] = useState('');
    const [BiArea, setBiArea] = useState('');
    const [properties, setProperties] = useState([]);
  

    let history = useHistory();

    
    const propertyUrl = process.env.REACT_APP_API_URL + `Properties/${id}`
   
    useEffect(() => {
        if(properties.length === 0) {
            fetch(propertyUrl).then(res => res.json().then(data => setProperties(data)))
        }
    })

      const [VisningsDatum, setVisningsDatum] = useState(null);
      let viewingDateRef = useRef(null);

      // Add Property method
    const updateProperty = async (property) => {
    const res = await fetch(propertyUrl, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(property),
    })
}
    

  function GoBack() {
    history.push(`/`);
}

    const onSubmit = (e) => {
    e.preventDefault()
    updateProperty({ adress: address, buildYear: ByggnadsÅr, rooms: AntalRum, livingArea: BoArea, houseType: HusTyp, plotArea: TomtArea, biArea: BiArea, viewingDate: viewingDateRef.current.value })
    GoBack()
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const classes = useStyles();

    return(
      <Container>
        {/* <form className='add-form' onSubmit={onSubmit}> */}
        <form className={classes.root} noValidate autoComplete="off"  onSubmit={onSubmit}>
        <div>
        <label>Adress</label>
        <TextField id="outlined-basic" type='text' label={properties.adress} value={address} onChange={(e) => setAdress(e.target.value)} variant="outlined" />
        <label>Bygg år</label>
        <TextField id="outlined-basic" type='number' label= {properties.buildYear} value={ByggnadsÅr} onChange={(e) => setByggnadsÅr(e.target.value)} variant="outlined" />
        <label>Antal Rum</label>
        <TextField id="outlined-basic" type='number' label={properties.rooms} value={AntalRum} onChange={(e) => setRum(e.target.value)} variant="outlined" />
        <label>Boarea</label>
        <TextField id="outlined-basic" type='text' label={properties.livingArea} value={BoArea} onChange={(e) => setboArea(e.target.value)} variant="outlined" />
        <label>Hustyp</label>
        <TextField id="outlined-basic" type='text' label={properties.houseType} value={HusTyp} onChange={(e) => sethustyp(e.target.value)} variant="outlined" />
        <label>Tomtarea</label>
        <TextField id="outlined-basic" type='text' label={properties.plotArea} value={TomtArea} onChange={(e) => setTomtArea(e.target.value)} variant="outlined" />
        <label>Biarea</label>
        <TextField id="outlined-basic" type='text'label={properties.biArea} value={BiArea} onChange={(e) => setBiArea(e.target.value)} variant="outlined" />
          <label>Visningsdatum</label>
          <Datetime placeholder='Ändra Visningdatum' value={VisningsDatum} ref={viewingDateRef} />
        </div>
        <br></br>
        <input type='submit' value='Spara Ändringar' className='btn btn-block' />
        <Button onClick={()=>GoBack()}>Gå tillbaka</Button>
        </form>
      </Container>
    )

}
export default UpdateProperties;