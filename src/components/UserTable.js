import React, {Component} from 'react';

class UserTable extends Component {

    emptyUser = {
        username: '',
        birthday: '',
        sex: '',
        address: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            users: [],

            showAddNewUserDialog: true,
            newUser: this.emptyUser
        };

        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let newUser = {...this.state.newUser};
        newUser[name] = value

        this.setState({newUser});
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

    changeShowAddNewUserDialoge = () => {
        this.setState({
            showAddNewUserDialog: !this.state.showAddNewUserDialog
        })
    }

    //提交新建用户的表单
    createUser(event) {

        event.preventDefault();


        const {newUser} = this.state;

        // gradle = "男"

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        };

        fetch("http://localhost:8082/user/insert", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response));
    }


    render() {

        const renderAddNewUserDialog = () => {

            if (this.state.showAddNewUserDialog) {
                return (
                    <div>

                        <form onSubmit={this.createUser}>
                            姓名: <input type="text" name="userName" onChange={this.handleChange}/><br/>
                            性别：
                            <input type="radio" value="Male" name="gender" onChange={this.handleChange}/> 男
                            <input type="radio" value="Female" name="gender" onChange={this.handleChange}/> 女

                            <br/>
                            <input type="date" name="birthday" onChange={this.handleChange}/> <br/>


                            地址: <input type="text" name="address" onChange={this.handleChange}/><br/>

                            <button type="submit">保存</button>
                            &nbsp;
                            <button type="button" onClick={this.changeShowAddNewUserDialoge}>取消</button>
                        </form>

                        <br></br>


                    </div>

                );
            }
        }

        return <div className="userTable">
            <button onClick={this.changeShowAddNewUserDialoge}>
                新增
            </button>

            {renderAddNewUserDialog()}

            <table>
                {
                    this.state.users.map(user => {

                        return (<tr key={user.id}>
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