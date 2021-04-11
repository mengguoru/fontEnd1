import React, {Component} from 'react';
import {Button, Table, Modal} from 'antd';

class UserTable extends Component {

    emptyUser = {
        username: '',
        birthday: '',
        sex: '',
        address: ''
    };

    columns = [
        {
            title: '姓名',
            dataIndex: 'userName'
        },
        {
            title: '生日',
            dataIndex: 'birthday'
        },
        {
            title: '性别',
            dataIndex: 'sex'
        },
        {
            title: '住址',
            dataIndex: 'address'
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            users: [],

            showAddNewUserDialog: false,
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

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        };

        fetch("http://localhost:8082/user/insert", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response));

        this.changeShowAddNewUserDialoge();
    }


    render() {

        return <div className="userTable">
            <br/>

            <Button type="primary" onClick={this.changeShowAddNewUserDialoge}>
                新增
            </Button>

            {/*新增用户对话框*/}
            <Modal title="新增用户" visible={this.state.showAddNewUserDialog}

                   footer={[
                       <Button key="back" onClick={this.changeShowAddNewUserDialoge}>
                           返回
                       </Button>,
                       <Button key="submit" type="primary" onClick={this.createUser}>
                           保存
                       </Button>
                   ]}>


                <div>

                    <form onSubmit={this.createUser}>
                        姓名: <input type="text" name="userName" onChange={this.handleChange}/><br/>
                        性别：
                        <input type="radio" value="Male" name="gender" onChange={this.handleChange}/> 男
                        <input type="radio" value="Female" name="gender" onChange={this.handleChange}/> 女

                        <br/>
                        <input type="date" name="birthday" onChange={this.handleChange}/> <br/>


                        地址: <input type="text" name="address" onChange={this.handleChange}/><br/>
                    </form>

                    <br></br>


                </div>
            </Modal>


            <Table columns={this.columns} dataSource={this.state.users}/>

        </div>;
    }
}

export default UserTable;