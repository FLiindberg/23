import react, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';
import './style.css';

function DeleteProperties(){

    const{id} = useParams(); 

    let history = useHistory();
    const propertyUrl = `https://localhost:44317/api/properties/${id}`
    const [properties, setProperties] = useState([]);
    function GoBack(id) {
        history.push(`/`);
    }
    const Delete = () => {
        fetch(`https://localhost:44317/api/properties/${id}`, {
            method: 'DELETE'
        }).then(() => {
            history.push(`/`)
        })
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

    useEffect(() => {
        if(properties.length === 0) {
            fetch(propertyUrl).then(res => res.json().then(data => setProperties(data)))
        }
    })
    return(
    <Container>
        <form className={classes.root} noValidate autoComplete="off">
        <div>
        <label>Adress</label>
        <TextField disabled id="outlined-basic" label={properties.adress} defaultValue={properties.adress} variant="outlined" />
        <label>Bygg år</label>
        <TextField disabled id="outlined-basic" label={properties.buildYear} variant="outlined" />
        <label>Antal Rum</label>
        <TextField disabled id="outlined-basic" label={properties.rooms} variant="outlined" />
        <label>Boarea</label>
        <TextField disabled id="outlined-basic" label={properties.livingArea} variant="outlined" />
        <label>Hustyp</label>
        <TextField disabled id="outlined-basic" label={properties.houseType} variant="outlined" />
        <label>Tomtarea</label>
        <TextField disabled id="outlined-basic" label={properties.plotArea} variant="outlined" />
        <label>Biarea</label>
        <TextField disabled id="outlined-basic" label={properties.biArea} variant="outlined" />
        </div>
        <br></br>
        <Breadcrumb class="knappar">
        <Breadcrumb.Item onClick={()=>Delete()}>Ta bort</Breadcrumb.Item>
        <Breadcrumb.Item onClick={()=>GoBack()}>Gå tillbaka</Breadcrumb.Item>
        </Breadcrumb>
        </form>
    </Container>
    )
}

export default DeleteProperties;