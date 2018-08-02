import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

class TimeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: '' };
    }

    componentDidMount() {
        this.tick();
        this.timerID = setInterval(() => this.tick(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const date = new Date();
        this.setState({ time: `Hello! The time is ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()} Date: ${date.getDay()} ${monthNames[date.getMonth()]}` });
        // TODO: get the weather https://www.metaweather.com/api/location/2487956/
    }

    render() {
        return (
            <Card style={{ marginTop: 10, background: '#482880' }} key="item">
                <CardContent>
                    <Typography variant="display2" component="h2">
                        {this.state.time}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default TimeComponent;
