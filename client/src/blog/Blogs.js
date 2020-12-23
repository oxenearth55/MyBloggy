import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { getBlogs } from '../actions/blog';
import { Link, Redirect } from 'react-router-dom';
//NOTE use api from React Table
import { useTable, useSortBy } from 'react-table'
import Spinner from '../components/Spinner';
import Moment from 'react-moment';
import { MDBDataTable } from 'mdbreact';
import blog from '../reducers/blog';



const Blogs = ({blog: {blogs, loading}, getBlogs}) => {

    useEffect(() => {
        getBlogs();
        
    },[getBlogs])
  

    //SECTION Table 

    //NOTE Access Button
    const seeBlog = (id) => (
      <Link  className="btn btn-warning btn-sm mx-3 text-white" to ={`/blog/${id}`}>
        Click
      </Link>

    )


    var rows = []; 

    blogs.map(blog => {
      rows.push({topic:blog.topic,date: <Moment startOf={'hour'} fromNow>{blog.date}</Moment>,firstName:blog.user.firstName,type:blog.type,click:seeBlog(blog._id)
      })})
      console.log('row is' +rows.map(row=>row))

    
    

    const dataColum ={columns:[
          {
              label: 'Topic',
              field: 'topic',
              sort: 'asc',
              width: 150

          },
          {
            label: 'type',
            field: 'type',
            sort: 'asc',
            width: 150

        },
        {
          label: 'date',
            field: 'date',
            sort: 'asc',
            width: 150
        },
          
        {
          label: 'name',
          field: 'firstName',
          sort: 'asc',
          width: 150

      },
      {
        label: 'Read Blog',
          field: 'click',
          sort: 'asc',
          width: 150
        
      }
  
  ]}

  dataColum.rows =rows


  return(
    <div>
      <Header section='blogs' text='Blogs'/>
      {blogs !== null && !loading ?     <MDBDataTable striped bordered small order={['age', 'asc' ]} data={dataColum} /> 
      : <Spinner/>}
     
    </div>
  )

  


    }
    
    


const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, { getBlogs })(Blogs);