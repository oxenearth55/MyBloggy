import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { getBlogs } from '../actions/blog';
//NOTE use api from React Table
import { useTable, useSortBy } from 'react-table'
import Spinner from '../components/Spinner';
import Moment from 'react-moment';


const Blogs = ({blog: {blogs, loading}, getBlogs}) => {

    useEffect(() => {
        getBlogs();
    },[getBlogs])


    //NOTE Define column 
    const columns = React.useMemo(
        () => [
            {
                Header: 'Topic',
                accessor: 'topic'
            },
            {
                Header: 'Type',
                accessor: 'type'
            },
           
            {
                Header: 'Name',
                accessor: 'user.firstName'
            },
           
        ],
        []

    )

    //NOTE grab data from reducer
const data = blogs;

const Table = ({ columns, data }) => { 

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable(
        {
          columns,
          data,
        },
        useSortBy
      )

    return(
<>
<table className='table table-hover' {...getTableProps()}>
  <thead>
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          // Add the sorting props to control sorting. For this example
          // we can add them into the header props
          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render('Header')}
            {/* Add a sort direction indicator */}
            <span>
              {column.isSorted
                ? column.isSortedDesc
                  ? ' 🔽'
                  : ' 🔼'
                : ''}
            </span>
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
</table>
<br />
<div>Showing the first 20 results of {rows.length} rows</div>
</>

    )}
    return (
        <div>
            <Header section='blogs' text='Blogs'/>
            {blogs !== null && !loading ?  <Table columns={columns} data={data} /> 
            : <Spinner/> }

            Test
            {blogs.map(blog => blog.user.firstName)}
           

            
        </div>
    )
}

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, { getBlogs })(Blogs);
