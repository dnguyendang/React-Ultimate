import { Button, Input, Modal, notification } from "antd"
import { useState } from "react"
import { createBookAPI, handleUploadFile } from "../../services/api.service"


const BookForm = (props) => {
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")
    const [isModalBookOpen, setIsModalBookOpen] = useState(false)
    const { loadBook } = props
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

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

    const handleSubmitBtn = async () => {
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded
            const res = await createBookAPI(thumbnail, mainText, author, price, quantity, category)
            if (res?.data) {
                notification.success({
                    message: "create book",
                    description: "Tạo book thành công"
                })
                resetAndCloseModal()
                await loadBook();
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(res.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file"
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalBookOpen(false)
        setMainText("")
        setAuthor("")
        setPrice(0)
        setQuantity(0)
        setCategory("")
        setSelectedFile(null);
        setPreview(null);
    }

    return (
        <div className="book-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table books</h3>
                <Button
                    onClick={() => setIsModalBookOpen(true)}
                    type="primary"
                >Create Book</Button>
            </div>

            <Modal
                title="Create Book"
                closable={{ 'arial-label': 'Custom Close Button' }}
                open={isModalBookOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Giá</span>
                        <Input
                            value={price}
                            onChange={(event) => {
                                setPrice(+event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <Input
                            value={quantity}
                            onChange={(event) => {
                                setQuantity(+event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <span>Thể loại</span>
                        <Input
                            value={category}
                            onChange={(event) => { setCategory(event.target.value) }}
                        />
                    </div>
                    {preview &&
                        <div>
                            <span>Ảnh bìa</span>
                            <div style={{
                                height: "200px", width: "200px",
                                border: "1px solid #ccc",
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                        </div>
                    }
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
                            Upload Ảnh bìa
                        </label>
                        <input
                            onChange={(event) => handleOnChangeFile(event)}
                            type='file' hidden id='btnUpload' />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BookForm;