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

function Interests(){

    let history = useHistory();
    const interestUrl = process.env.REACT_APP_API_URL + `Properties/1/Interest_Reg`
    const [interest_reg, setInterest_Reg] = useState([]);
    console.log(interest_reg);

    useEffect(() => {
        if(interest_reg.length === 0) {
            fetch(interestUrl).then(res => res.json().then(data => setInterest_Reg(data)))
        }
    },[])
    
    function GoBack() {
        history.push(`/`);
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
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {interest_reg.map( item => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                {item.accountEmail}
                </TableCell>
                <TableCell align="right">
                    <ThemeProvider theme={theme}>
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained secondary button group">
                        <Button onClick={()=>GoBack()}>Gå tillbaka</Button>
                    </ButtonGroup>
                    </ThemeProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

export default Interests;