import React, { Component } from 'react';
import  {Row} from 'antd';


class Banner extends Component {

    constructor() {
        super();
        this.state = {
            banner: null
        }
    }

    componentDidMount() {
        fetch("http://localhost:8082/redis/find?key=announcement")
            .then(response => response.json())
            .then(response => {
                
                console.log(response.data.msg);

                this.setState({
                    banner: response.data.msg
                })
            });
    }


    render() {

        return <div className = "banner">
            <Row  type="flex" justify="center" align="middle">{this.state.banner}</Row>
        </div>;
    }

}

export default Banner;