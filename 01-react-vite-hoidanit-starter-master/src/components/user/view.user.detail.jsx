import React, { useState } from 'react';
import { Button, Drawer, notification } from 'antd';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';

const ViewUserDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataDetail, loadUser } = props

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const showDrawer = () => {
        setIsDetailOpen(true);
    };
    const onClose = () => {
        setIsDetailOpen(false);
    };

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length == 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar")

        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false)
                setSelectedFile(null);
                setPreview(null);
                loadUser();

                notification.success({
                    message: "update user avatar",
                    description: "Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }


    }

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
                {dataDetail ?
                    <>
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
                            <input
                                onChange={(event) => handleOnChangeFile(event)}
                                type='file' hidden id='btnUpload' />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "15px",
                                    height: "100px", width: "150px",

                                }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview} />
                                </div>
                                <Button
                                    onClick={() => handleUpdateUserAvatar()}
                                    type='primary'
                                >Lưu</Button>
                            </>
                        }
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