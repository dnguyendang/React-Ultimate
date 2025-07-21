import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const ViewUserDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataDetail } = props

    console.log(">>>> check dataDetail", dataDetail)

    const showDrawer = () => {
        setIsDetailOpen(true);
    };
    const onClose = () => {
        setIsDetailOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer
                title="Chi tiết người dùng"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={isDetailOpen}
            >
                {dataDetail ? <>
                    <p>ID: {dataDetail._id}</p>
                    <br />
                    <p>Full Name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone Number: {dataDetail.phone}</p>
                    <br />
                </>
                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                }

            </Drawer>
        </>

    )
}


export default ViewUserDetail;