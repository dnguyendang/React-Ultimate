import { useEffect, useState } from "react";
import { getfetchAllBookAPI } from "../services/api.service";
import BookTable from "../components/book/book.table";
import BookForm from "../components/book/book.form";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        loadBook();
    }, [current, pageSize]);

    const loadBook = async () => {
        const res = await getfetchAllBookAPI(current, pageSize);
        if(res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <div style={{padding:"20px"}}>
            <BookForm loadBook={loadBook}/>
            <BookTable
                dataBooks={dataBooks}
                loadBook={loadBook}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                setTotal={setTotal}
            />
        </div>
    )
}

export default BookPage;