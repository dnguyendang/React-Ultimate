import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import { deleteBookAPI } from "../../services/api.service";
import ViewBookDetail from "./view.book.detail";
import UpdateBookModal from "./update.book.modal";
import UpdateBookModalUncontrol from "./update.book.modal.uncontrolled.component";

const BookTable = (props) => {
    const { dataBooks, loadBook, current, pageSize, total, setCurrent, setPageSize, setTotal } = props

    const [isModalUpdateBookOpen, setIsModalUpdateBookOpen] = useState(false)
    const [dataUpdateBook, setDataUpdateBook] = useState(null)

    const [isDetailBookOpen, setIsDetailBookOpen] = useState(false)
    const [dataDetailBook, setDataDetailBook] = useState(null)

    const handleDeleteBook = async (id) => {
        const res = await deleteBookAPI(id);
        if (res.data) {
            notification.success({
                message: "delete book",
                description: "Xóa book thành công"
            })
            await loadBook();
            // Nếu sau khi xóa mà current page không còn record nào thì lùi về trang trước
            if ((total - 1) <= (current - 1) * pageSize) {
                setCurrent(current - 1 > 0 ? current - 1 : 1);
            }

            setTotal(total - 1); // cập nhật lại total
        } else {
            notification.error({
                message: "Error delete book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {

        // nếu thay đổi trang : current
        if (pagination && pagination.current) {
            if (+pagination.current !== current)
                setCurrent(+pagination.current) // "3" => 3
        }

        // nếu thay đổi số phần tử mỗi trang: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize)
                setPageSize(+pagination.pageSize) // "3" => 3
        }
    }

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            setIsDetailBookOpen(true);
                            setDataDetailBook(record);
                        }}
                        href='#'>
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(text)
            }

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity'
        },
        {
            title: 'Tác giả',
            dataIndex: 'author'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setIsModalUpdateBookOpen(true);
                            setDataUpdateBook(record);
                        }}
                    />
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn xóa người dùng này?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined
                            style={{ cursor: "pointer", color: "red" }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {
                            return (
                                <div>{range[0]}-{range[1]} trên {total} rows</div>
                            )
                        }
                    }
                }
                onChange={onChange}
            />
            <ViewBookDetail
                isDetailBookOpen={isDetailBookOpen}
                setIsDetailBookOpen={setIsDetailBookOpen}
                dataDetailBook={dataDetailBook}
                setDataDetailBook={dataDetailBook}
                loadBook={loadBook}
            />
            {/* <UpdateBookModal
                isModalUpdateBookOpen={isModalUpdateBookOpen}
                setIsModalUpdateBookOpen={setIsModalUpdateBookOpen}
                dataUpdateBook={dataUpdateBook}
                setDataUpdateBook={setDataUpdateBook}
                loadBook={loadBook}
            /> */}
            <UpdateBookModalUncontrol
                isModalUpdateBookOpen={isModalUpdateBookOpen}
                setIsModalUpdateBookOpen={setIsModalUpdateBookOpen}
                dataUpdateBook={dataUpdateBook}
                setDataUpdateBook={setDataUpdateBook}
                loadBook={loadBook}
            />

        </>
    )
}

export default BookTable;