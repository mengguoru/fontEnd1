import React, { Component } from 'react';



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
            <h3>{this.state.banner}</h3>
        </div>;
    }

}

export default Banner;