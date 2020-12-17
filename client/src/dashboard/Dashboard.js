import React from 'react';
import { connect } from 'react-redux';

const Dashboard = ({auth: { user }}) => {
    return (
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
    )
}
const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps) (Dashboard);
