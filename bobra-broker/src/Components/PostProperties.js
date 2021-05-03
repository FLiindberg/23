import react, {useState, useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';

function PostProperties(){

    const propertyUrl = `https://localhost:44392/api/properties`

    const [address, setAdress] = useState('');
    const [ByggnadsÅr, setByggnadsÅr] = useState();
    const [AntalRum, setRum] = useState();
    const [BoArea, setboArea] = useState('');
    const [HusTyp, sethustyp] = useState('');
    const [TomtArea, setTomtArea] = useState('');
    const [BiArea, setBiArea] = useState('');
    const [VisningsDatum, setVisningsDatum] = useState(null);
    
    let viewingDateRef = useRef(null);

    let history = useHistory();

      // Add Property method
    const addProperty = async (property) => {
    const res = await fetch(propertyUrl, {
      method: 'POST',
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
    addProperty({ adress: address, buildYear: ByggnadsÅr, rooms: AntalRum, livingArea: BoArea, houseType: HusTyp, plotArea: TomtArea, biArea: BiArea, viewingDate: viewingDateRef.current.value })
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
        <form className={classes.root} noValidate autoComplete="off"  onSubmit={onSubmit}>
        <div>
        <label>Adress</label>
        <TextField id="outlined-basic" type='text' label="Adress" value={address} onChange={(e) => setAdress(e.target.value)} variant="outlined" />
        <label>Bygg år</label>
        <TextField id="outlined-basic" type='number' label="Byggår" value={ByggnadsÅr} onChange={(e) => setByggnadsÅr(e.target.value)} variant="outlined" />
        <label>Antal Rum</label>
        <TextField id="outlined-basic" type='number' label="Antal rum" value={AntalRum} onChange={(e) => setRum(e.target.value)} variant="outlined" />
        <label>Boarea</label>
        <TextField id="outlined-basic" type='text' label="Boarea" value={BoArea} onChange={(e) => setboArea(e.target.value)} variant="outlined" />
        <label>Hustyp</label>
        <TextField id="outlined-basic" type='text' label="Hustyp" value={HusTyp} onChange={(e) => sethustyp(e.target.value)} variant="outlined" />
        <label>Tomtarea</label>
        <TextField id="outlined-basic" type='text' label="Tomtarea" value={TomtArea} onChange={(e) => setTomtArea(e.target.value)} variant="outlined" />
        <label>Biarea</label>
        <TextField id="outlined-basic" type='text'label="Biarea" value={BiArea} onChange={(e) => setBiArea(e.target.value)} variant="outlined" />
          <label>Visningsdatum</label>
          <Datetime placeholder='Lägg till Visningdatum' value={VisningsDatum} ref={viewingDateRef} />
        </div>
        <br></br>
        <input type='submit' value='Spara Bostad' className='btn btn-block' />
      </form>
      </Container>
      )

}
export default PostProperties;