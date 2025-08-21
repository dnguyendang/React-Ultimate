import { Button, Drawer, notification } from "antd"
import { handleUploadFile, updateBookThumbnailAPI } from "../../services/api.service"
import { useState } from "react"


const ViewBookDetail = (props) => {
    const { isDetailBookOpen, setIsDetailBookOpen, dataDetailBook, setDataDetailBook, loadBook } = props

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const showDrawer = () => {
        setIsDetailBookOpen(true);
    }
    const onClose = () => {
        setIsDetailBookOpen(false);
    }

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

    const handleUpdateBookThumbnail = async () => {
        const resUpload = await handleUploadFile(selectedFile, "book")

        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded
            const resUpdateThumbnail = await updateBookThumbnailAPI(newThumbnail, dataDetailBook._id, dataDetailBook.mainText, dataDetailBook.author,
                dataDetailBook.price, dataDetailBook.quantity, dataDetailBook.category)

            if (resUpdateThumbnail.data) {
                setIsDetailBookOpen(false);
                setSelectedFile(null);
                setPreview(null);
                loadBook();

                notification.success({
                    message: "update book thumbnails",
                    description: "Cập nhật thumbnail thành công"
                })
            } else {
                notification.error({
                    message: "Error update thumbnail",
                    description: JSON.stringify(resUpdateThumbnail.message)
                })
            }
        } else {
            notification.error({
                message: "Error update file",
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
                title="Chi tiết sách"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={isDetailBookOpen}
            >
                {dataDetailBook ?
                    <>
                        <p>ID: {dataDetailBook._id}</p>
                        <br />
                        <p>Tiêu đề: {dataDetailBook.mainText}</p>
                        <br />
                        <p>Tác giả: {dataDetailBook.author}</p>
                        <br />
                        <p>Thể loại: {dataDetailBook.category}</p>
                        <br />
                        <p>Giá: {dataDetailBook.price}</p>
                        <br />
                        <p>Số lượng: {dataDetailBook.quantity}</p>
                        <br />
                        <p>Đã bán: {dataDetailBook.sold}</p>
                        <br />
                        <p>Thumbnail: </p>
                        <div style={{
                            marginTop: "10px",
                            height: "200px", width: "200px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetailBook.thumbnail}`} />
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
                                Upload Thumbnail
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
                                    height: "200px", width: "200px",

                                }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview} />
                                </div>
                                <Button
                                    onClick={() => handleUpdateBookThumbnail()}
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

export default ViewBookDetail;