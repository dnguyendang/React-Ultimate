import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookFormUnControl = (props) => {
    const {loadBook} = props;
    const [isModalBookOpen, setIsModalBookOpen] = useState(false)
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async(values) => {
        if (!selectedFile){
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }
        
        const resUpload = await handleUploadFile(selectedFile, "book");
        if(resUpload.data){
            const newThumbnail = resUpload.data.fileUploaded;
            const {mainText, author, price, quantity, category} = values;
            const resBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category)

            if(resBook.data){
                resetAndCloseModal()
                await loadBook();
                notification.success({
                    message: "Create book",
                    description: "Tạo mới book thành công"
                })
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file"
            })
        }
    }

    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsModalBookOpen(false);
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
            title="Create Book (uncontrolled component)"
            open={isModalBookOpen}
            onOk={()=>form.submit()}
            onCancel={()=>resetAndCloseModal()}
            maskClosable={false}
            okText={"CREATE"}
        >
            <Form
                form={form}
                onFinish={handleSubmitBtn}
                layout="vertical"
            >
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
    </div>
    )
}

export default BookFormUnControl;