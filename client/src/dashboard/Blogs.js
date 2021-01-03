import React, { Fragment } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'; 





const Blogs = ({blogs}) => {
  //NOTE Access Button
  const seeBlog = (id) => (
    <Link  className="btn btn-warning btn-sm mx-3 text-white" to ={`/blog/${id}`}>
      Click
    </Link>

  )


  var rows = []; 

  blogs.map(blog => {
    rows.push({topic:blog.topic,date: <Moment startOf={'hour'} fromNow>{blog.date}</Moment>,type:blog.type,click:seeBlog(blog._id)
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
      label: 'Read Blog',
        field: 'click',
        sort: 'asc',
        width: 150
      
    }

]}

dataColum.rows =rows


return(
  <Fragment>
    {blogs !== null && <MDBDataTable striped bordered small order={['age', 'asc' ]} data={dataColum} /> 
    }
  </Fragment>
)

  }

export default Blogs;
