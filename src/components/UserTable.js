import React, { Component } from 'react';

class UserTable extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8082/user/page?pageNum=1")
            .then(response => response.json())
            .then(response => {

                console.log(response);

                this.setState({
                    users: response.data.records
                })
            })
    }

    render() {

        return <div className="userTable">
        <table>
            {
                this.state.users.map(user => {

                    return (<tr>
                        <td>{user.id}</td>
                        <td>{user.username} </td>
                        <td>{user.birthday}</td>
                        <td>{user.sex} </td>
                        <td>{user.address}</td>
                    </tr>);
                })
            }
        </table>
    </div>;
    }
}

export default UserTable;