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
                // width={"40vw"}
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
                    <p>Avatar: </p>
                    <div style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>
                    <div>
                        <label htmlFor='btnUpload' style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload Avatar
                        </label>
                        <input type='file' hidden id='btnUpload' />
                    </div>

                    {/* <Button type='primary'>Upload Avatar</Button> */}
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