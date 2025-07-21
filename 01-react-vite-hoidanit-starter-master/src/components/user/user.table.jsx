
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';

const UserTable = (props) => {

    const { dataUsers, loadUser } = props

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            setIsDetailOpen(true);
                            setDataDetail(record);
                        }}
                        href='#' > {record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setIsModalUpdateOpen(true);
                            setDataUpdate(record);
                        }}
                    />
                    <DeleteOutlined
                        style={{ cursor: "pointer", color: "red" }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
        </>

    )
}

export default UserTable;


