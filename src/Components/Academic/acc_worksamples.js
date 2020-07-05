import React from 'react'


// dependencies
import { Table } from 'antd';

// styles
import SideLeftPage from '../langingpage/sideleftpage';

export default function AccWorksamples() {
    const columns = [
        {
          title: 'Title',
          dataIndex: 'name',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          sorter: {
            compare: (a, b) => a.category - b.category,
            multiple: 3,
          },
        },
        {
          title: 'Format',
          dataIndex: 'format',
          sorter: {
            compare: (a, b) => a.format - b.format,
            multiple: 2,
          },
        },
        {
          title: 'Description',
          dataIndex: 'english',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
            
          },
        },
        {
            title: 'Action',
            dataIndex: 'action',
        }
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          category: 'Research',
          format: 'APA',
          english: 'A river between two sources',
          action: 'Download'
        },
        {
          key: '2',
          name: 'Jim Green',
          category: 98,
          format: 66,
          english: 89,
        },
        {
          key: '3',
          name: 'Joe Black',
          category: 98,
          format: 90,
          english: 70,
        },
        {
          key: '4',
          name: 'Jim Red',
          category: 88,
          format: 99,
          english: 89,
        },
      ];

      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }

    return (
        <React.Fragment>
            <div className="Xcontainer">

                <div  className="row">
                        <div className="col s3">
                            <SideLeftPage />
                        </div>
                        <div className="col s9">

                          <div className="row card" style={{ margin: '1rem' }}>                  
                              
                          
                              <div className="col s12">

                                  <h4 style={{padding: '2rem 0'}}> Work Samples</h4> <hr/>

                                  <div className="row">


                                      <Table columns={columns} dataSource={data} onChange={onChange} />

                                  </div>

                              </div>
                          </div>
                      
                        </div>
                </div>
            </div>
        </React.Fragment>
    )
}
