import { Button, Input, Modal, notification } from "antd"
import { useState } from "react"
import { createBookAPI } from "../../services/api.service"


const BookForm = (props) => {
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [isModalBookOpen, setIsModalBookOpen] = useState(false)
    const {loadBook} = props

    const handleSubmitBtn = async () => {
        const res = await createBookAPI(mainText, author, price, quantity, category)
        if (res?.data){
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
    }

    const resetAndCloseModal = ()=>{
        setIsModalBookOpen(false)
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
    }

    return (
        <div className="book-form" style={{margin: "10px 0"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3>Table books</h3>
                <Button
                    onClick={()=> setIsModalBookOpen(true)}
                    type="primary"
                >Create Book</Button>
            </div>

            <Modal
                title="Create Book"
                closable={{'arial-label': 'Custom Close Button'}}
                open={isModalBookOpen}
                onOk={()=>handleSubmitBtn()}
                onCancel={()=>resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{display:"flex", gap:"15px", flexDirection:"column"}}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event)=>{setMainText(event.target.value)}}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event)=>{setAuthor(event.target.value)}}
                        />
                    </div>
                    <div>
                        <span>Giá</span>
                        <Input
                            value={price}
                            onChange={(event)=>{setPrice(event.target.value)}}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <Input
                            value={quantity}
                            onChange={(event)=>{setQuantity(event.target.value)}}
                        />
                    </div>
                    <div>
                        <span>Thể loại</span>
                        <Input
                            value={category}
                            onChange={(event)=>{setCategory(event.target.value)}}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BookForm;