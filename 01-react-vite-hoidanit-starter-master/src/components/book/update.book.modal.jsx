import { useEffect, useState } from "react";
import { updateBookAPI } from "../../services/api.service";
import { Input, Modal, notification } from "antd";


const UpdateBookModal = (props) => {
    const {
        isModalUpdateBookOpen,
        setIsModalUpdateBookOpen,
        dataUpdateBook,
        setDataUpdateBook,
        loadBook,
    } = props

    const [id, setId] = useState("")
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")

    useEffect(() => {
        if (dataUpdateBook) {
            setId(dataUpdateBook.id)
            setMainText(dataUpdateBook.mainText)
            setAuthor(dataUpdateBook.author)
            setPrice(dataUpdateBook.price)
            setQuantity(dataUpdateBook.quantity)
            setCategory(dataUpdateBook.category)
        }
    }, [dataUpdateBook])

    const handleSubmitBtn = async () => {
        const res = await updateBookAPI(id, mainText, author, price, quantity, category)
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
    }

    return (
        <Modal
            title="Update book"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateBookOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
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
                    <span>Giá</span>
                    <Input
                        value={price}
                        onChange={(event) => { setPrice(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Số lượng</span>
                    <Input
                        value={quantity}
                        onChange={(event) => { setQuantity(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Thể loại</span>
                    <Input
                        value={category}
                        onChange={(event) => { setCategory(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateBookModal;