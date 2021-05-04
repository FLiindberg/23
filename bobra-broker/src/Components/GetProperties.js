import react, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb } from 'react-bootstrap';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

function GetProperties(){
    
    let history = useHistory();
    const propertyUrl = process.env.REACT_APP_API_URL + `Properties`
    // const propertyUrl = `https://localhost:44317/api/Properties`
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if(properties.length === 0) {
            fetch(propertyUrl).then(res => res.json().then(data => setProperties(data)))
        }
    })

    function Change(id) {
        history.push(`/UpdateProperties/${id}`);
    }

    function Delete(id) {
        history.push(`/DeleteProperties/${id}`);
    }

    function Interest(id) {
        history.push(`/Interests`);
    }

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

      const classes = useStyles();

      const theme = createMuiTheme({
        palette: {
          primary: {
            // Purple and green play nicely together.
            main: purple[500],
          },
          secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
        },
      });

return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Adress</TableCell>
              <TableCell align="right">Bygg år</TableCell>
              <TableCell align="right">Antal Rum</TableCell>
              <TableCell align="right">Boarea</TableCell>
              <TableCell align="right">Hustyp</TableCell>
              <TableCell align="right">Tomtarea</TableCell>
              <TableCell align="right">Biarea</TableCell>
              <TableCell align="right">Visningdatum</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {properties.map( item => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.adress}
                </TableCell>
                <TableCell align="right">{item.buildYear}</TableCell>
                <TableCell align="right">{item.rooms}</TableCell>
                <TableCell align="right">{item.livingArea}</TableCell>
                <TableCell align="right">{item.houseType}</TableCell>
                <TableCell align="right">{item.plotArea}</TableCell>
                <TableCell align="right">{item.biArea}</TableCell>
                <TableCell align="right">{item.viewingDate}</TableCell>
                <TableCell align="right">
                    <ThemeProvider theme={theme}>
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained secondary button group">
                        <Button onClick={()=>Change(item.propertyID)}>Ändra</Button>
                        <Button onClick={()=>Delete(item.propertyID)}>Ta bort</Button>
                        <Button onClick={()=>Interest(item.propertyID)}>Intresseanmälningar</Button>
                    </ButtonGroup>
                    </ThemeProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

export default GetProperties;