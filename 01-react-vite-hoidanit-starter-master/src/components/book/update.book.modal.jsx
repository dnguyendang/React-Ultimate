import { useEffect, useState } from "react";
import { updateBookAPI } from "../../services/api.service";
import { Input, Modal, notification, InputNumber, Select } from "antd";


const UpdateBookModal = (props) => {
    const {
        isModalUpdateBookOpen, setIsModalUpdateBookOpen,
        dataUpdateBook, setDataUpdateBook,
        loadBook,
    } = props

    const [id, setId] = useState("")
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (dataUpdateBook) {
            setId(dataUpdateBook._id)
            setMainText(dataUpdateBook.mainText)
            setAuthor(dataUpdateBook.author)
            setPrice(dataUpdateBook.price)
            setQuantity(dataUpdateBook.quantity)
            setCategory(dataUpdateBook.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdateBook.thumbnail}`)
        }
    }, [dataUpdateBook])

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

        // không có ảnh preview + không có file => return 
        if(!selectedFile && !preview){
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }
        let newThumbnail = "";
        // có ảnh preview và không có file => không upload file
        if (!selectedFile && preview){
            newThumbnail= dataUpdateBook.thumbnail
        } else {
            // có ảnh preview và có file => upload file
            const resUpload = await handleUploadFile(selectedFile, "book")
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded
            } else {
                //failed
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        } 
        
        const res = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category)
        if (res?.data) {
            notification.success({
                message: "update book",
                description: "Cập nhật book thành công"
            })
            resetAndCloseModal();
            await loadBook();
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateBookOpen(false)
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setDataUpdateBook(null)
        setId("")
        setSelectedFile(null)
        setPreview(null)
    }

    return (
        <Modal
            title="Update book"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateBookOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Update"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>ID</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
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
                        <span>Giá tiền</span>
                        <InputNumber
                            style={{width: "100%"}}
                            addonAfter={' đ'}
                            value={price}
                            onChange={(event) => {setPrice(event)}}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <InputNumber
                            style={{width: "100%"}}
                            value={quantity}
                            onChange={(event) => {
                                setQuantity(event)
                            }}
                        />
                    </div>
                    <div>
                        <span>Thể loại</span>
                        <Select
                            style={{width: "100%"}}
                            value={category}
                            onChange={(value) => { setCategory(value) }}
                            options={[
                                {value: 'Arts', label: 'Arts'},
                                {value: 'Business', label: 'Business'},
                                {value: 'Comics', label: 'Comics'},
                                {value: 'Cooking', label: 'Cooking'},
                                {value: 'Entertainment', label: 'Entertainment'},
                                {value: 'History', label: 'History'},
                                {value: 'Music', label: 'Music'},
                                {value: 'Sports', label: 'Sports'},
                                {value: 'Teen', label: 'Teen'},
                                {value: 'Travel', label: 'Travel'},
                            ]}
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
                            onClick={(event) => event.target.value = null}
                            type='file' hidden id='btnUpload' />
                    </div>
            </div>
        </Modal>
    )
}

export default UpdateBookModal;