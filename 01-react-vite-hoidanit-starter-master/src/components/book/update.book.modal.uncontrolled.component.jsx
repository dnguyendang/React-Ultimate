import { useEffect, useState } from "react";
import { updateBookAPI } from "../../services/api.service";
import { Input, Modal, notification, InputNumber, Select, Form } from "antd";


const UpdateBookModalUncontrol = (props) => {
    const {
        isModalUpdateBookOpen, setIsModalUpdateBookOpen,
        dataUpdateBook, setDataUpdateBook, loadBook,
    } = props

    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (dataUpdateBook && dataUpdateBook._id) {
            form.setFieldsValue({
                id: dataUpdateBook._id,
                mainText: dataUpdateBook.mainText ,
                author: dataUpdateBook.author,
                price: dataUpdateBook.price,
                quantity: dataUpdateBook.quantity,
                category: dataUpdateBook.category,
            })
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

    const handleSubmitBtn = async (values) => {

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
        
        // update book
        const {id, mainText, author, price, quantity, category} = values;
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
        form.resetFields();
        setIsModalUpdateBookOpen(false)
        setDataUpdateBook(null)
        setSelectedFile(null)
        setPreview(null)
    }

    return (
        <Modal
            title="Update book (uncontrolled component)"
            open={isModalUpdateBookOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Update"}
        >
            <Form
                form={form}
                onFinish={handleSubmitBtn}
                layout="vertical"
            >
                <div>
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input disabled/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[
                            {
                                required:true,
                                message:'Tiêu đề không được đề trống!',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required:true,
                                message:'Tác giả không được đề trống!',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required:true,
                                message:'Giá tiền không được đề trống!',
                            }
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                            addonAfter={' đ'}
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required:true,
                                message:'Số lượng không được đề trống!',
                            }
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[
                            {
                                required:true,
                                message:'Thể loại không được đề trống!',
                            }
                        ]}
                    >
                        <Select
                            style={{width:"100%"}}
                            name="category"
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
                    </Form.Item>
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
                        type='file' hidden id='btnUpload' 
                        style={{display:"none"}}/>
                </div>
            </Form>
        </Modal>
    )
}

export default UpdateBookModalUncontrol;