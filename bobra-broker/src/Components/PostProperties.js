import react, {useState, useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

function PostProperties(){

  const propertyUrl = process.env.REACT_APP_API_URL + `Properties`

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
        <label>Byggår</label>
        <TextField id="outlined-basic" type='number' label="Byggår" value={ByggnadsÅr} onChange={(e) => setByggnadsÅr(e.target.value)} variant="outlined" />
        <label>Antal rum</label>
        <TextField id="outlined-basic" type='number' label="Antal rum" value={AntalRum} onChange={(e) => setRum(e.target.value)} variant="outlined" />
        <label>Boarea</label>
        <TextField id="outlined-basic" type='text' label="Boarea" value={BoArea} onChange={(e) => setboArea(e.target.value)} variant="outlined" />
        <label>Hustyp</label>
        <TextField id="outlined-basic" type='text' label="Hustyp" value={HusTyp} onChange={(e) => sethustyp(e.target.value)} variant="outlined" />
        <label>Tomtarea</label>
        <TextField id="outlined-basic" type='text' label="Tomtarea" value={TomtArea} onChange={(e) => setTomtArea(e.target.value)} variant="outlined" />
        <label>Biarea</label>
        <TextField id="outlined-basic" type='text'label="Biarea" value={BiArea} onChange={(e) => setBiArea(e.target.value)} variant="outlined" />
          <label>Lägg till Visningdatum</label>
          <Datetime placeholder='Lägg till Visningdatum' value={VisningsDatum} ref={viewingDateRef} />
        </div>
        <br></br>
        <input type='submit' value='Spara Bostad' className='btn btn-block' />
        <Button onClick={()=>GoBack()}>Gå tillbaka</Button>
      </form>
      </Container>
      )

}
export default PostProperties;