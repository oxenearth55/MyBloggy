import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const Dashboard = ({auth: { user }}) => {
    return (
        <Fragment>
            <Header section='dashboard' text='Dashboard'/>
            <div className=" container my-4">
                <table class="table table-striped table-hover my-5">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
      
    )
}
const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps) (Dashboard);
