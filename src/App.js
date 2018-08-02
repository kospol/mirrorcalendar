import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TimeComponent from './TimeComponent';

class App extends Component {
    constructor(props) {
        super(props);
        // example data for development
        // const testItems = [{'title':'Today test','tstart':'18:00','tend':'19:00','location':'Home','allday':false,'date':'Sat 28'},{'title':'Today test2','tstart':'19:00','tend':'21:00','location':'Home','allday':false,'date':'Sat 28'},{'title':'Today test3','tstart':'22:00','tend':'23:00','location':'Home','allday':true,'date':'Sat 28'},{'title':'Call Christina','tstart':'11:00','tend':'12:00','location':'','allday':false,'date':'Sun 29'},{'title':'Dentist','tstart':'18:00','tend':'19:00','location':'','allday':false,'date':'Mon 30'}];
        this.state = {
            calendarItems: [], // this.normalizeItems(testItems),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.fetchNewData(), 1000 * 60);
        this.fetchNewData();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    fetchNewData() {
        fetch(process.env.REACT_APP_KOSTAS_CAL_URL)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    calendarItems: this.normalizeItems(responseJson),
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    normalizeItems(items) {
        let lastDate  = '';
        const newItems = [];
        items.forEach(item => {
            if (lastDate !== item.date) {
                lastDate = item.date;
                newItems.push({date: item.date, isDate: true});
            }
            newItems.push(item);
        });

        return newItems;
    }

    getCardForItem(item) {
        return (
            <React.Fragment>
                <Typography variant="display1" component="h2">
                    {item.title}
                </Typography>
                {!item.allday && 
                    <Typography variant="display1" component="h2" align="right">
                        {item.tstart} to {item.tend}
                    </Typography>
                }
                {item.allday && 
                     <Typography color="textSecondary" variant="headline">
                        All day
                     </Typography>
                }
            </React.Fragment>
        );
    }

    getUIforItem(item) {
        if (item.isDate) {
            return (
                <Card style={{ marginTop: 10, background: '#673ab7' }} key={item.date}>
                    <CardContent>
                        <Typography variant="display2" component="h2">{item.date}</Typography>
                    </CardContent>
                </Card>
            );
        } else {
            return (
                <Card style={{ marginTop: 0, marginLeft: 20, background: '#8561c5' }} key={item.title}>
                    <CardContent>
                        {this.getCardForItem(item)}
                    </CardContent>
                </Card>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <TimeComponent />
                <Grid container spacing={24} style={{ marginLeft: 10 }}>
                    <Grid item xs={6}>
                        <Paper style={{ background: '#000000' }}>
                            <Card style={{ marginTop: 5, background: '#482880' }} key='KostasCal'>
                                <CardContent>
                                    <Typography variant="display2" component="h2">Kosta's Calendar</Typography>
                                </CardContent>
                            </Card>
                            {
                                this.state.calendarItems.map(item => this.getUIforItem(item))
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <Card style={{ marginTop: 5, marginRight: 5, background: '#482880' }} key='ChristinasCal'>
                                <CardContent>
                                    <Typography variant="display2" component="h2">Christina's Calendar</Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default App;
